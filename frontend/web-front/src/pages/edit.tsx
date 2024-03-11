import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Section } from '../components/layouts/Section';
import { InputForm } from '../components/elements/InputForm';
import { InputRadioForm } from '../components/elements/InputRadioForm';
import { FORM_ITEMS } from '../const/FORM_ITEMS';
import Button from '../components/elements/Button';

export default function Edit() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
	} = useForm({
		defaultValues: {
			update: router.query.update,
			date: parseInt(router.query.date as string, 10),
			hour: parseInt(router.query.hour as string, 10),
			text: router.query.text,
		},
		reValidateMode: 'onSubmit',
	});

	const onSubmit = async (data) => {
		await axios
			.patch(`http://localhost:8080/api/update/${router.query.id}`, data, {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				withCredentials: true,
			})
			.then(() => router.push('/'))
			.catch((e) => alert(`error: ${e}`));
	};

	return (
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
							更新
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
	);
}
