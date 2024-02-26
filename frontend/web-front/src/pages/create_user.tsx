import { useForm } from 'react-hook-form';
import { Section } from '../components/layouts/Section';
import { InputForm } from '../components/elements/InputForm';
import { CREATE_USER_FORM_ITEMS } from '../const/CREATE_USER_FORM_ITEMS';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { Router, useRouter } from 'next/router';

export default function CreateUser() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		trigger,
	} = useForm({ reValidateMode: 'onSubmit' });

	const onSubmit = async (data) => {
		await axios
			.post('http://localhost:8080/api/user/create', data, {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				withCredentials: true,
			})
			.then(() => router.push('/login/'))
			.catch((e) => alert(e));
	};

	return (
		<Section>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					onClick={() => router.push('/')}
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					NenQ
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							ユーザー登録
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
							<label
								htmlFor="username"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
							<ErrorMessage
								errors={errors}
								name="username"
								render={({ message }) =>
									message ? <p className="text-rose-500">{message}</p> : null
								}
							/>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
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
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
							<ErrorMessage
								errors={errors}
								name="email"
								render={({ message }) =>
									message ? <p className="text-rose-500">{message}</p> : null
								}
							/>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
							<ErrorMessage
								errors={errors}
								name="password"
								render={({ message }) =>
									message ? <p className="text-rose-500">{message}</p> : null
								}
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
								})}
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
							<ErrorMessage
								errors={errors}
								name="password_confirmmation"
								render={({ message }) =>
									message ? <p className="text-rose-500">{message}</p> : null
								}
							/>
							<button
								type="submit"
								className="w-full text-white bg-sky-800 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								登録
							</button>
						</form>
					</div>
				</div>
			</div>
		</Section>
	);
}
