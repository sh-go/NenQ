import axios from 'axios';
import { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';

import Button from '../components/elements/Button';
import { InputForm } from '../components/elements/InputForm';
import { Section } from '../components/layouts/Section';
import { CARRY_OVER_FORM_ITEMS } from '../const/CARRY_OVER_FORM_ITEMS';
import useRequireLogin from '../features/hooks/useRequireLogin';

export default function UpdateCarryOver() {
	const { currentUser } = useRequireLogin();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
	} = useForm({
		defaultValues: {
			date: parseInt(router.query.date as string, 10),
			hour: parseInt(router.query.hour as string, 10),
			min: parseInt(router.query.min as string, 10),
		} as FieldValues,
		reValidateMode: 'onSubmit',
	});

	const onSubmit = async (data) => {
		await axios
			.patch('/api/carryover/update', data)
			.then(() => router.push('/'))
			.catch((e) => console.log(e));
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
							<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
								更新
							</h1>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="space-y-4 md:space-y-6"
							>
								{CARRY_OVER_FORM_ITEMS.map((item) => (
									<InputForm
										key={item.name}
										label={item.label}
										type={item.type}
										name={item.name}
										register={register}
										errors={errors}
										errorMessage={item.error_message}
									/>
								))}
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
