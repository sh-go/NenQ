import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
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
import useIsMobile from '../hooks/useIsMobile';
import CategoryListBox from './CategoryListBox';

type Props = {
	createOpen: boolean;
	setCreateOpen: Dispatch<SetStateAction<boolean>>;
	cancelButtonRef: MutableRefObject<any>;
};

type InputData = {
	date: number;
	hour: number;
	text: string;
	update: { startDate: Date; endDate: Date };
};
export default function CreateModal({
	createOpen,
	setCreateOpen,
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
			date: null,
			hour: null,
			text: null,
			update: { startDate: new Date(), endDate: new Date() },
		} as FieldValues,
		reValidateMode: 'onSubmit',
	});

	const [currentUpdate, currentCategory] = watch(['update', 'text']);

	const currentDateRange = differenceInDays(
		currentUpdate.endDate,
		currentUpdate.startDate
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
			setValue('hour', 0);
		} else {
			if (currentCategory === '休暇') {
				setValue('date', 1);
				setValue('hour', 0);
			} else {
				setValue('date', 0);
				setValue('hour', null);
			}
		}
	}, [currentUpdate, currentCategory, setValue]);

	const isRangeMode = currentDateRange !== 0;

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

		const convertUpdate =
			diffDays == 0 ? format(update.startDate, 'yyyy-MM-dd') : '';

		const postData = { date, hour, text, update: convertUpdate, user: uuid };

		await clientSideAxios
			.post('/api/create', postData)
			.then(() => {
				router.push('/');
				reset();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<Transition show={createOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={() => setCreateOpen(false)}
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
									<div className="mx-auto flex flex-col items-center justify-center">
										<div className="w-full rounded-xl bg-white p-1 shadow dark:border dark:border-gray-700 dark:bg-slate-800 sm:p-6">
											<form
												onSubmit={handleSubmit(onSubmit)}
												className="w-full space-y-4 pl-3 sm:p-0"
											>
												<div className="flex h-10 flex-row">
													<Controller
														control={control}
														name="update"
														render={({ field: { onChange, value, name } }) => {
															const startYear =
																currentUpdate.startDate?.getFullYear();

															const endYear =
																currentUpdate.endDate?.getFullYear();

															const useRangeMode =
																startYear !== thisYear || endYear !== thisYear;

															const widthClass = useRangeMode ? 'w-72' : 'w-52';

															const toggleRightPosition = useRangeMode
																? 'right-3'
																: 'right-24';
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
																	containerClassName="relative min-w-[300px] text-gray-700"
																	inputClassName={`${widthClass} h-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm placeholder:text-sm dark:border-gray-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
																	toggleClassName={`absolute ${toggleRightPosition} h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed`}
																/>
															);
														}}
													/>
												</div>
												<div className="flex h-10 flex-row">
													{CREATE_FORM_ITEMS.map((item) => (
														<div key={item.name} className="w-1/3">
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
																<div className="flex h-full flex-row items-center">
																	<input
																		id={item.name}
																		name={item.name}
																		type={item.type}
																		placeholder={item.label}
																		inputMode="numeric"
																		disabled={currentCategory === '休暇'}
																		min="0"
																		{...register(item.name, {
																			required: item.error_message,
																		})}
																		className="min-w-0 basis-1/2 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm dark:border-gray-700 dark:bg-slate-800 dark:focus:border-blue-500 dark:focus:ring-blue-500"
																	/>
																	{
																		<ErrorMessage
																			errors={errors}
																			name={item.name}
																			render={({ message }) => (
																				<p className="text-sm text-rose-400">
																					{message}
																				</p>
																			)}
																		/>
																	}
																</div>
															) : (
																<></>
															)}
														</div>
													))}
												</div>
												<div className="flex justify-end">
													<div className="flex gap-2">
														<Button
															size="sm"
															rounded
															color="gray"
															onClick={() => setCreateOpen(false)}
															className="px-4 py-2.5"
														>
															キャンセル
														</Button>
														<Button
															size="sm"
															submit
															rounded
															color="blue"
															onClick={() => setCreateOpen(false)}
															disabled={!isDirty || !isValid}
															className="px-4 py-2.5"
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
