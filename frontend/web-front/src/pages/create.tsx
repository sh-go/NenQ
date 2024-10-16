import { useRouter } from 'next/router';
import { Controller, FieldValues, useForm } from 'react-hook-form';

import { differenceInDays, format } from 'date-fns';
import Datepicker from 'react-tailwindcss-datepicker';
import Button from '../components/elements/Button';
import { InputForm } from '../components/elements/InputForm';
import { InputRadioForm } from '../components/elements/InputRadioForm';
import { Section } from '../components/layouts/Section';
import { clientSideAxios } from '../config/axiosConfig';
import { CREATE_FORM_ITEMS } from '../const/CREATE_FORM_ITEMS';
import useRequireLogin from '../features/hooks/useRequireLogin';

type InputData = {
	date: number;
	hour: number;
	text: string;
	update: { startDate: Date; endDate: Date };
};

export default function Create() {
	const { currentUser } = useRequireLogin();

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
		control,
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
			diffDays == 0 ? format(update.startDate, 'yyyy-MM-dd') : null;

		const postData = { date, hour, text, update: convertUpdate, user: uuid };

		await clientSideAxios
			.post('/api/create', postData)
			.then(() => router.push('/'))
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		currentUser != undefined &&
		currentUser.isLogin && (
			<Section>
				<div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
					<a href="#" className="mb-6 flex items-center text-2xl font-semibold">
						NenQ
					</a>
					<div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
						<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
							<h1 className="text-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
								登録
							</h1>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="space-y-4 md:space-y-6"
							>
								{CREATE_FORM_ITEMS.map((item) =>
									item.type == 'date' ? (
										<div key={item.name}>
											<label
												htmlFor={item.name}
												className="mb-2 block text-sm font-medium"
											>
												{item.label}
											</label>
											<Controller
												control={control}
												name={item.name}
												render={({ field: { onChange, value, name } }) => (
													<Datepicker
														inputId={name}
														value={value}
														asSingle={true}
														onChange={onChange}
														i18n={'ja'}
														required={true}
														inputClassName="min-w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
													/>
												)}
											/>
										</div>
									) : item.type == 'radio' ? (
										<InputRadioForm
											key={item.name}
											label={item.label}
											name={item.name}
											register={register}
											errors={errors}
											errorMessage={item.error_message}
										/>
									) : (
										<InputForm
											key={item.name}
											label={item.label}
											type={item.type}
											name={item.name}
											register={register}
											errors={errors}
											errorMessage={item.error_message}
										/>
									)
								)}
								<Button
									submit
									block
									rounded
									color="blue"
									disabled={!isDirty || !isValid}
									className="px-5 py-2.5"
								>
									更新
								</Button>
							</form>
						</div>
					</div>
				</div>
			</Section>
		)
	);
}
