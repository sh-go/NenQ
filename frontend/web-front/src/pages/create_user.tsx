import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from '../components/elements/Button';
import { Section } from '../components/layouts/Section';

export default function CreateUser() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isDirty, errors },
		getValues,
		trigger,
	} = useForm({ reValidateMode: 'onSubmit' });

	const onSubmit = async (data) => {
		await axios
			.post('/api/user/create', data)
			.then(() => router.push('/login'))
			.catch((e) => alert(e));
	};

	return (
		<Section>
			<div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
				<a
					onClick={() => router.push('/')}
					className="mb-6 flex items-center text-2xl font-semibold"
				>
					NenQ
				</a>
				<div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
							ユーザー登録
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
							<label
								htmlFor="username"
								className="mb-2 block text-sm font-medium"
							>
								ユーザー名
							</label>
							<input
								type="username"
								{...register('username', {
									required: 'ユーザー名を入力してください',
									pattern: {
										value: /.{0,20}$/,
										message: '20文字以下で入力してください',
									},
								})}
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
							/>
							<ErrorMessage
								errors={errors}
								name="username"
								render={({ message }) => (
									<p className="text-sm text-rose-500">{message}</p>
								)}
							/>
							<label htmlFor="email" className="mb-2 block text-sm font-medium">
								メールアドレス
							</label>
							<input
								type="email"
								{...register('email', {
									required: 'メールアドレスを入力してください',
									pattern: {
										value:
											/^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
										message: '有効なメールアドレスではありません',
									},
								})}
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
							/>
							<ErrorMessage
								errors={errors}
								name="email"
								render={({ message }) => (
									<p className="text-sm text-rose-500">{message}</p>
								)}
							/>
							<label
								htmlFor="password"
								className="mb-2 block text-sm font-medium"
							>
								パスワード
							</label>
							<input
								type="password"
								{...register('password', {
									required: 'パスワードを入力してください',
									onBlur: () => {
										if (getValues('password')) {
											trigger('password_confirmmation');
										}
									},
									pattern: {
										value: /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/,
										message: '8〜20文字の半角英数字で入力してください',
									},
								})}
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
							/>
							<ErrorMessage
								errors={errors}
								name="password"
								render={({ message }) => (
									<p className="text-sm text-rose-500">{message}</p>
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
								})}
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
							/>
							<ErrorMessage
								errors={errors}
								name="password_confirmmation"
								render={({ message }) => (
									<p className="text-sm text-rose-500">{message}</p>
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
								作成
							</Button>
						</form>
					</div>
				</div>
			</div>
		</Section>
	);
}
