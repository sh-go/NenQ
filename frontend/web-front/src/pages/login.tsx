import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoAlertFill } from 'react-icons/go';
import Button from '../components/elements/Button';
import { InputForm } from '../components/elements/InputForm';
import { Section } from '../components/layouts/Section';
import { CurrentUserContext } from './_app';

export default function Login() {
	const router = useRouter();
	const [loginError, setLoginError] = useState(null);
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	const formItems: {
		label: string;
		type: string;
		name: 'email' | 'password';
		error_message: string;
	}[] = [
		{
			label: 'メールアドレス',
			type: 'email',
			name: 'email',
			error_message: 'メールアドレスを入力してください',
		},
		{
			label: 'パスワード',
			type: 'password',
			name: 'password',
			error_message: 'パスワードを入力してください',
		},
	];

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({ reValidateMode: 'onSubmit' });

	const onSubmit = async (data) => {
		setLoginError(null);
		await axios
			.post('http://localhost:8080/api/token', data, {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				withCredentials: true,
			})
			.then((res) => {
				setCurrentUser({
					isLogin: true,
					// username: user.username,
				});
				router.push('/');
			})
			.catch((e) => {
				if (e.response.status === 401)
					setLoginError('メールアドレスまたはパスワードが間違っています。');
			});
	};

	return (
		<Section>
			<div className="relative mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
				{loginError && (
					<div className="flex items-center rounded-lg bg-red-50 p-4 text-red-800 dark:bg-gray-800 dark:text-red-400">
						<GoAlertFill className="size-6 shrink-0" aria-hidden="true" />
						<span className="sr-only">Info</span>
						<div className="ms-3 text-sm">{loginError}</div>
					</div>
				)}
				<a
					className="mb-6 flex items-center text-2xl font-semibold"
					onClick={() => router.push('/')}
				>
					NenQ
				</a>
				<div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
							ログイン
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
							{formItems.map((item) => (
								<InputForm
									key={item.name}
									label={item.label}
									type={item.type}
									name={item.name}
									register={register}
									errors={errors}
									errorMessage={item.error_message}
									showErrorMessage={false}
								/>
							))}
							<div className="text-right text-sm text-gray-500 dark:text-gray-400">
								<span
									onClick={() => {
										router.push('/forgot_password');
									}}
									className="font-medium underline hover:cursor-pointer hover:text-sky-800"
								>
									パスワードを忘れた場合
								</span>
							</div>
							<Button
								submit
								block
								rounded
								color="blue"
								disabled={!isDirty}
								className="px-5 py-2.5"
							>
								ログイン
							</Button>
							<p className="text-right text-sm font-light text-gray-500 dark:text-gray-400">
								アカウント作成は
								<span
									onClick={() => router.push('/create_user')}
									className="font-medium underline hover:cursor-pointer hover:text-sky-800"
								>
									こちら
								</span>
							</p>
						</form>
					</div>
				</div>
			</div>
		</Section>
	);
}
