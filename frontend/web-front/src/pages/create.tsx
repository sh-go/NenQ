import axios from 'axios';
import { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';

import { Section } from '../components/layouts/Section';
import { InputForm } from '../components/elements/InputForm';
import { InputRadioForm } from '../components/elements/InputRadioForm';
import { FORM_ITEMS } from '../const/FORM_ITEMS';
import useRequireLogin from '../features/hooks/useRequireLogin';
import Button from '../components/elements/Button';

export default function Create() {
	const { currentUser } = useRequireLogin();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
	} = useForm({
		defaultValues: {
			date: 0,
			hour: 0,
		} as FieldValues,
		reValidateMode: 'onSubmit',
	});

	const onSubmit = async (data) => {
		const uuid = await axios
			.get('http://localhost:8080/api/user', {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				withCredentials: true,
			})
			.then((userdata) => {
				return userdata.data.uuid;
			})
			.catch((e) => alert(`error: ${e}`));

		const postData = { ...data, user: uuid };

		await axios
			.post('http://localhost:8080/api/create', postData, {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				withCredentials: true,
			})
			.then(() => router.push('/'))
			.catch((e) => alert(`error: ${e}`));
	};

	return (
		currentUser != undefined &&
		currentUser.isLogin && (
			<Section>
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a
						href="#"
						className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						NenQ
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								登録
							</h1>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="space-y-4 md:space-y-6"
							>
								{FORM_ITEMS.map((item) =>
									item.type != 'radio' ? (
										<InputForm
											key={item.name}
											label={item.label}
											type={item.type}
											name={item.name}
											register={register}
											errors={errors}
											error_message={item.error_message}
										/>
									) : (
										<InputRadioForm
											key={item.name}
											label={item.label}
											name={item.name}
											register={register}
											errors={errors}
											error_message={item.error_message}
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
