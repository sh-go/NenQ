import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoAlertFill } from 'react-icons/go';
import Button from '../components/elements/Button';
import { Section } from '../components/layouts/Section';
import { clientSideAxios } from '../config/axiosConfig';

export default function forgotPassword() {
	const router = useRouter();
	const [emailError, setEmailError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { isDirty },
	} = useForm({ reValidateMode: 'onSubmit' });

	const onSubmit = async (data) => {
		await clientSideAxios
			.post('/api/password_reset/', data)
			.then(() => {
				alert('メールを送信しました！');
				router.push('/login');
			})
			.catch((e) => {
				if (e.response.status === 400)
					setEmailError('登録されているメールアドレスではありません。');
			});
	};

	return (
		<Section>
			<div className="relative mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
				{emailError && (
					<div className="absolute left-72 top-9 z-10 mb-4 flex items-center rounded-lg bg-red-50 p-4 text-red-800 dark:bg-gray-800 dark:text-red-400">
						<GoAlertFill className="size-6 shrink-0" aria-hidden="true" />
						<span className="sr-only">Info</span>
						<div className="ms-3 text-sm font-medium">{emailError}</div>
					</div>
				)}
				<a
					onClick={() => router.push('/')}
					className="mb-6 flex items-center text-2xl font-semibold"
				>
					NenQ
				</a>
				<div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
							パスワードリセット
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
							<label htmlFor="email" className="mb-2 block text-sm font-medium">
								登録しているメールアドレスを入力してください
							</label>
							<input
								type="email"
								{...register('email', {})}
								className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
