import axios from 'axios';
import { useRouter } from 'next-nprogress-bar';
import { useForm } from 'react-hook-form';
import Button from '../components/elements/Button';
import { Section } from '../components/layouts/Section';
import { useState } from 'react';
import { GoAlertFill } from 'react-icons/go';

export default function forgotPassword() {
	const router = useRouter();
	const [emailError, setEmailError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { isDirty },
	} = useForm({ reValidateMode: 'onSubmit' });

	const onSubmit = async (data) => {
		await axios
			.post('http://localhost:8080/api/password_reset/', data, {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				withCredentials: true,
			})
			.then(() => {
				alert('メールを送信しました！');
				router.push('/');
			})
			.catch((e) => {
				if (e.response.status === 400)
					setEmailError('登録されているメールアドレスではありません。');
			});
	};

	return (
		<Section>
			<div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				{emailError && (
					<div className="absolute top-9 left-72 z-10 flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
						<GoAlertFill className="flex-shrink-0 w-6 h-6" aria-hidden="true" />
						<span className="sr-only">Info</span>
						<div className="ms-3 text-sm font-medium">{emailError}</div>
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
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							パスワードリセット
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								登録しているメールアドレスを入力してください
							</label>
							<input
								type="email"
								{...register('email', {})}
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
