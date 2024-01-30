import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Section } from '../components/layouts/Section';

type InputRadioValues = {
	label: string;
	value: string;
};

export default function Create() {
	const router = useRouter();

	const radioOptions: InputRadioValues[] = [
		{
			label: '休暇',
			value: '休暇',
		},
		{
			label: '遅刻',
			value: '遅刻',
		},
		{
			label: '早退',
			value: '早退',
		},
	];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ reValidateMode: 'onSubmit' });

	const onSubmit = async (data) => {
		const uuid = await axios
			.get('http://localhost:8080/api/user', {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				withCredentials: true,
			})
			.then((userdata) => {
				return userdata.data.uuid;
			})
			.catch((e) => alert(`error: ${e}`));

		const postData = { ...data, user: uuid };

		await axios
			.post('http://localhost:8080/api/create/', postData, {
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
							登録
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6"
						>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									取得した日
								</label>
								<input
									type="date"
									name="update"
									id="update"
									{...register('update', {
										required: {
											value: true,
											message: '日付を入力してください',
										},
									})}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
								{errors && (
									<div className="text-rose-500">{errors.email?.message}</div>
								)}
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									日数
								</label>
								<input
									type="number"
									name="date"
									id="date"
									{...register('date', {
										required: {
											value: true,
											message: '数字を入力してください',
										},
									})}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
								{errors && (
									<div className="text-rose-500">
										{errors.password?.message}
									</div>
								)}
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									時間
								</label>
								<input
									type="number"
									name="hour"
									id="hour"
									{...register('hour', {
										required: {
											value: true,
											message: '数字を入力してください',
										},
									})}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
								{errors && (
									<div className="text-rose-500">
										{errors.password?.message}
									</div>
								)}
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									種別
								</label>
								<div className="text-center">
									{radioOptions.map((item) => (
										<label className="sm:text-sm focus:ring-primary-600 focus:border-primary-600 w-full p-5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
											<input
												type="radio"
												name="text"
												id="text"
												value={item.value}
												{...register('text', {
													required: {
														value: true,
														message: '種別を選択してください',
													},
												})}
											/>
											{item.label}
										</label>
									))}
								</div>
								{errors && (
									<div className="text-rose-500">
										{errors.password?.message}
									</div>
								)}
							</div>
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
