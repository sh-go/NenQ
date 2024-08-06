import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { GoAlertFill } from 'react-icons/go';
import Button from '../components/elements/Button';
import { Section } from '../components/layouts/Section';

export default function ResetPassword() {
	const router = useRouter();
	const [passwordError, setPasswordError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { isDirty, errors },
		getValues,
		trigger,
	} = useForm({ reValidateMode: 'onSubmit' });

	const onSubmit = async (data) => {
		const postData = { password: data.password, token: router.query.token };
		await axios
			.post('/api/password_reset/confirm/', postData)
			.then(() => router.push('/login'))
			.catch((e) => {
				setPasswordError(e.response.data.password[0]);
			});
	};

	return (
		<Section>
			<div className="relative mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
				{passwordError && (
					<div className="absolute left-72 top-14 z-10 mb-4 flex items-center rounded-lg bg-red-50 p-4 text-red-800 dark:bg-gray-800 dark:text-red-400">
						<GoAlertFill className="size-6 shrink-0" aria-hidden="true" />
						<span className="sr-only">Info</span>
						<div className="ms-3 text-sm font-medium">{passwordError}</div>
					</div>
				)}
				<a
					onClick={() => router.push('/')}
					className="mb-6 flex items-center text-2xl font-semibold"
				>
					NenQ
				</a>
				<div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
							パスワードをリセット
						</h1>
						<div className="text-center">{router.query.username}さん</div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
							<label
								htmlFor="password"
								className="mb-2 block text-sm font-medium"
							>
								新しいパスワード
							</label>
							<input
								type="password"
								{...register('password', {
									required: 'パスワードを入力してください',
									pattern: {
										value: /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/,
										message: '8〜20文字の半角英数字で入力してください',
									},
									onBlur: () => {
										if (getValues('password')) {
											trigger('password');
											setPasswordError(null);
										}
									},
								})}
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
							/>
							<ErrorMessage
								errors={errors}
								name="password"
								render={({ message }) => (
									<p className="text-sm text-rose-400">{message}</p>
								)}
							/>
							<label
								htmlFor="password_confirmmation"
								className="mb-2 block text-sm font-medium"
							>
								確認用パスワード
							</label>
							<input
								type="password"
								{...register('password_confirmmation', {
									required: 'パスワードを再入力してください',
									validate: (value) => {
										return (
											value === getValues('password') ||
											'パスワードが一致しません'
										);
									},
									onBlur: () => {
										if (getValues('password')) {
											trigger('password_confirmmation');
										}
									},
								})}
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
							/>
							<ErrorMessage
								errors={errors}
								name="password_confirmmation"
								render={({ message }) => (
									<p className="text-sm text-rose-400">{message}</p>
								)}
							/>
							<Button
								submit
								block
								rounded
								color="blue"
								disabled={!isDirty}
								className="px-5 py-2.5"
							>
								リセット
							</Button>
						</form>
					</div>
				</div>
			</div>
		</Section>
	);
}
