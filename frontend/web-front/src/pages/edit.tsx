import { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';

import Button from '../components/elements/Button';
import { InputForm } from '../components/elements/InputForm';
import { InputRadioForm } from '../components/elements/InputRadioForm';
import Section from '../components/layouts/Section';
import { clientSideAxios } from '../config/axiosConfig';
import { CREATE_FORM_ITEMS } from '../const/CREATE_FORM_ITEMS';
import useRequireLogin from '../features/hooks/useRequireLogin';

export default function Edit() {
	const { currentUser } = useRequireLogin();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
	} = useForm({
		defaultValues: {
			update: router.query.update as string,
			date: parseInt(router.query.date as string, 10),
			hour: parseInt(router.query.hour as string, 10),
			text: router.query.text as string,
		} as FieldValues,
		reValidateMode: 'onSubmit',
	});

	const onSubmit = async (data) => {
		await clientSideAxios
			.patch(`/api/update/${router.query.id}`, data)
			.then(() => router.push('/'))
			.catch((e) => alert(`error: ${e}`));
	};

	return (
		currentUser != undefined &&
		currentUser.isLogin && (
			<Section>
				<div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
					<a href="#" className="mb-6 flex items-center text-2xl font-semibold">
						NenQ
					</a>
					<div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
						<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
							<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
								更新
							</h1>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="space-y-4 md:space-y-6"
							>
								{CREATE_FORM_ITEMS.map((item) =>
									item.type != 'radio' ? (
										<InputForm
											key={item.name}
											label={item.label}
											type={item.type}
											name={item.name}
											register={register}
											errors={errors}
											errorMessage={item.error_message}
										/>
									) : (
										<InputRadioForm
											key={item.name}
											label={item.label}
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
