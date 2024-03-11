import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Section } from '../components/layouts/Section';
import { InputForm } from '../components/elements/InputForm';

export default function Login() {
	const router = useRouter();

	const formItems: {
		label: string;
		type: string;
		name: string;
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
		formState: { errors },
	} = useForm({ reValidateMode: 'onSubmit' });

	const onSubmit = async (data) => {
		await axios
			.post('http://localhost:8080/api/token', data, {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				withCredentials: true,
			})
			.then(() => router.push('/'))
			.catch((e) => console.log(`error: ${e}`));
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
									error_message={item.error_message}
								/>
							))}
							<div className="text-right">
								<a
									href="#"
									className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									パスワードを忘れた場合
								</a>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-sky-800 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								ログイン
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								アカウント作成は
								<span
									onClick={() => router.push('/create_user')}
									className="font-medium text-primary-600 underline hover:cursor-pointer hover:text-sky-800 dark:text-primary-500"
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
