import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react';
import { differenceInDays, format } from 'date-fns';
import { useRouter } from 'next/router';
import {
	Dispatch,
	Fragment,
	MutableRefObject,
	SetStateAction,
	useEffect,
} from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import Button from '../../components/elements/Button';
import { clientSideAxios } from '../../config/axiosConfig';
import { category } from '../../const/CATEGORY';
import { CREATE_FORM_ITEMS } from '../../const/CREATE_FORM_ITEMS';
import { hours } from '../../const/HOURS';
import useIsMobile from '../hooks/useIsMobile';
import CategoryListBox from './CategoryListBox';
import HourListBox from './HourListBox';

type Props = {
	editOpen: boolean;
	setEditOpen: Dispatch<SetStateAction<boolean>>;
	editValues: {
		id: number;
		update: { startDate: string; endDate: string };
		date: number;
		hour: number;
		text: string;
	};
	cancelButtonRef: MutableRefObject<any>;
};

type InputData = {
	date: number;
	hour: number;
	text: string;
	update: { startDate: Date; endDate: Date };
};
export default function EditModal({
	editOpen,
	setEditOpen,
	editValues,
	cancelButtonRef,
}: Props): JSX.Element {
	const router = useRouter();

	const isMobile = useIsMobile();

	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
		control,
		reset,
		watch,
		setValue,
	} = useForm({
		defaultValues: {
			date: editValues?.date,
			hour: editValues?.hour,
			text: editValues?.text,
			update: {
				startDate: new Date(editValues?.update.startDate),
				endDate: new Date(editValues?.update.endDate),
			},
		} as FieldValues,
		reValidateMode: 'onSubmit',
	});

	// 編集対象が切り替わった際にフォームの値を更新する
	useEffect(() => {
		if (!editValues) return;
		reset({
			date: editValues.date,
			hour: editValues.hour,
			text: editValues.text,
			update: {
				startDate: new Date(editValues.update.startDate),
				endDate: new Date(editValues.update.endDate),
			},
		});
	}, [editValues, reset]);

	const [currentUpdate, currentCategory] = watch(['update', 'text']);

	const currentDateRange = differenceInDays(
		currentUpdate?.endDate,
		currentUpdate?.startDate
	);

	// 期間の長さを監視して、日付と時間の初期値を設定
	useEffect(() => {
		if (!isDirty) {
			// 初回レンダー時はここでだけスキップ
			return;
		}

		if (currentDateRange >= 1) {
			setValue('text', '休暇');
			setValue('date', currentDateRange + 1);
			setValue('hour', null);
		} else {
			if (currentCategory === '休暇') {
				setValue('date', 1);
				setValue('hour', null);
			} else {
				setValue('date', 0);
				setValue('hour', 0);
			}
		}
	}, [currentUpdate, currentCategory, setValue]);

	const isRangeMode = currentDateRange !== 0;

	const isCategoryDayOff = currentCategory === '休暇';

	const thisYear = new Date().getFullYear();

	const onSubmit = async (data: InputData) => {
		const uuid = await clientSideAxios
			.get('/api/user')
			.then((userdata) => {
				return userdata.data.uuid;
			})
			.catch((e) => router.push('/login'));

		const { date, hour, text, update } = data;

		const diffDays = differenceInDays(update.startDate, update.endDate);

		const convertStartDate = format(update.startDate, 'yyyy-MM-dd');

		const convertEndDate = format(update.endDate, 'yyyy-MM-dd');

		const patchData = {
			date,
			hour,
			text,
			startDate: convertStartDate,
			endDate: convertEndDate,
		};

		await clientSideAxios
			.patch(`/api/update/${editValues.id}`, patchData)
			.then(() => {
				router.push('/');
				reset();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<Transition show={editOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={() => setEditOpen(false)}
			>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-800/75 transition-opacity" />
				</TransitionChild>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center text-center sm:items-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className="relative w-full text-left shadow-xl transition-all sm:max-w-lg">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex w-full flex-col items-center justify-center">
										<div className="w-full rounded-xl bg-white shadow dark:border dark:border-gray-700 dark:bg-slate-800 sm:pb-3 sm:pt-6">
											<form
												onSubmit={handleSubmit(onSubmit)}
												className="w-full space-y-4 pl-3 sm:p-0"
											>
												<div className="mx-3 mb-5 flex h-10 flex-row">
													<Controller
														control={control}
														name="update"
														render={({ field: { onChange, value, name } }) => {
															const startYear =
																currentUpdate.startDate?.getFullYear();

															const endYear =
																currentUpdate.endDate?.getFullYear();

															const useRangeMode =
																currentUpdate.startDate &&
																currentUpdate.endDate &&
																(startYear !== thisYear ||
																	endYear !== thisYear);

															const widthClass = useRangeMode ? 'w-72' : 'w-52';

															return (
																<Datepicker
																	i18n={'ja'}
																	inputId={name}
																	value={value}
																	useRange={!isMobile}
																	readOnly={true}
																	separator=" 〜 "
																	displayFormat={
																		useRangeMode ? 'YYYY年M月D日' : 'M月D日'
																	}
																	onChange={onChange}
																	placeholder="日付"
																	required={true}
																	startWeekOn="mon"
																	popoverDirection={isMobile ? 'up' : 'down'}
																	containerClassName="relative text-gray-700"
																	inputClassName={`${widthClass} h-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm placeholder:text-sm dark:border-gray-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
																	toggleClassName={`absolute right-0 h-full px-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed`}
																/>
															);
														}}
													/>
													{CREATE_FORM_ITEMS.map((item) => (
														<div key={item.name} className="ml-2">
															{item.type == 'text' ? (
																<div className="h-full">
																	<Controller
																		control={control}
																		name="text"
																		render={({
																			field: { value, onChange },
																		}) => (
																			<CategoryListBox
																				value={value}
																				onChange={onChange}
																				category={category}
																				isDisabled={isRangeMode}
																				label={item.label}
																			/>
																		)}
																	/>
																</div>
															) : item.type == 'number' ? (
																<div className="h-full">
																	<Controller
																		control={control}
																		name="hour"
																		render={({
																			field: { value, onChange },
																		}) => (
																			<HourListBox
																				value={value}
																				onChange={onChange}
																				hours={hours}
																				isDisabled={isCategoryDayOff}
																				label={item.label}
																			/>
																		)}
																	/>
																</div>
															) : (
																<></>
															)}
														</div>
													))}
												</div>

												<hr className="w-full border-gray-300 dark:border-gray-700" />

												<div className="mx-3 flex justify-end">
													<div className="flex gap-2">
														<Button
															size="sm"
															rounded
															color="gray"
															onClick={() => setEditOpen(false)}
															className="px-4 py-2"
														>
															キャンセル
														</Button>
														<Button
															size="sm"
															submit
															rounded
															color="blue"
															onClick={() => setEditOpen(false)}
															disabled={!isDirty || !isValid}
															className="px-4 py-2"
														>
															↑
														</Button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
