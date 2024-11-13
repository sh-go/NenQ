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
	useState,
} from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import Button from '../../components/elements/Button';
import { clientSideAxios } from '../../config/axiosConfig';
import { category } from '../../const/CATEGORY';
import { CREATE_FORM_ITEMS } from '../../const/CREATE_FORM_ITEMS';
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

	const [selectedCategory, setSelectedCategory] = useState(category[0]);

	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
		control,
		reset,
	} = useForm({
		defaultValues: {
			date: 0,
			hour: 0,
			update: { startDate: new Date(), endDate: new Date() },
		} as FieldValues,
		reValidateMode: 'onSubmit',
	});

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
							<DialogPanel className="relative mb-5 w-full text-left shadow-xl transition-all sm:max-w-lg">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex flex-col items-center justify-center">
										<div className="w-full rounded-xl bg-white p-1 shadow dark:border dark:border-gray-700 dark:bg-slate-800 sm:p-6">
											<form
												onSubmit={handleSubmit(onSubmit)}
												className="w-full space-y-4 pl-3 sm:p-0"
											>
												<div className="flex flex-row">
													{CREATE_FORM_ITEMS.map((item) => (
														<div className="w-1/3">
															{item.type == 'text' ? (
																<div className="h-full">
																	<CategoryListBox
																		category={category}
																		selectedCategory={selectedCategory}
																		setSelectedCategory={setSelectedCategory}
																	/>
																</div>
															) : item.type == 'number' ? (
																<div className="flex flex-row items-center">
																	<input
																		type={item.type}
																		inputMode="numeric"
																		name={item.name}
																		min="0"
																		id={item.name}
																		{...register(item.name, {
																			required: item.error_message,
																		})}
																		className="min-w-0 basis-1/2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-700 dark:bg-slate-800 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
																	/>
																	<label
																		htmlFor={item.name}
																		className="ml-2 text-sm font-medium text-gray-500"
																	>
																		{item.label}
																	</label>
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
												<div className="flex justify-between">
													<div key="update">
														<Controller
															control={control}
															name="update"
															render={({
																field: { onChange, value, name },
															}) => (
																<Datepicker
																	i18n={'ja'}
																	inputId={name}
																	value={value}
																	asSingle={true}
																	useRange={false}
																	readOnly={true}
																	onChange={onChange}
																	placeholder="申請日"
																	required={true}
																	startWeekOn="mon"
																	popoverDirection="up"
																	inputClassName="w-36 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 p-2.5 dark:border-gray-700 dark:text-white dark:bg-slate-800 placeholder:text-sm dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
																	containerClassName=""
																	popupClassName=""
																/>
															)}
														/>
													</div>
													<div className="flex flex-row-reverse">
														<Button
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
