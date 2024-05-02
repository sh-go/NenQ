import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Section } from '../components/layouts/Section';
import Button from '../components/elements/Button';
import { GoAlertFill } from 'react-icons/go';

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
			.post('http://localhost:8080/api/password_reset/confirm/', postData, {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			})
			.then(() => router.push('/login'))
			.catch((e) => {
				setPasswordError(e.response.data.password[0]);
			});
	};

	return (
		<Section>
			<div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				{passwordError && (
					<div className="absolute top-14 left-72 z-10 flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
						<GoAlertFill className="flex-shrink-0 w-6 h-6" aria-hidden="true" />
						<span className="sr-only">Info</span>
						<div className="ms-3 text-sm font-medium">{passwordError}</div>
					</div>
				)}
				<a
					onClick={() => router.push('/')}
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					NenQ
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							パスワードをリセット
						</h1>
						<div className="text-center">{router.query.username}さん</div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
