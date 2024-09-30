import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiLogIn } from 'react-icons/fi';
import Button from '../components/elements/Button';
import { Section } from '../components/layouts/Section';

export default function Home() {
	const router = useRouter();

	return (
		<div className="bg-orange-50">
			<div className="flex min-h-14 justify-center bg-white">
				<div className="flex w-full items-center justify-between sm:w-content-width">
					<div className="ml-2 text-2xl sm:text-3xl">
						NenQ <span className="text-xs">ー年休管理アプリー</span>
					</div>
					<div className="flex h-full w-48 sm:w-64">
						<Button
							children={'登録する'}
							block
							className="items-center bg-orange-400 p-2 font-semibold transition hover:bg-orange-500"
							onClick={() => {
								router.push('/create_user');
							}}
						/>
						<Button
							children={
								<>
									<FiLogIn />
									<span className="ml-2">ログイン</span>
								</>
							}
							block
							onClick={() => {
								router.push('/login');
							}}
							className="items-center bg-gray-500 p-2 font-semibold transition hover:bg-gray-600"
						/>
					</div>
				</div>
			</div>
			<Section>
				<div className="mt-10 space-y-10">
					<div className="mx-auto flex-row overflow-hidden sm:flex sm:h-[35rem]">
						<div className="basis-1/2 content-center p-8 text-center">
							<div className="mt-1 text-[7vw] font-semibold leading-tight text-black sm:text-3xl">
								自分の休暇を視える化
							</div>
							<p className="mt-4 text-slate-500 sm:text-lg">
								取得した休暇や残っている休暇を一覧にして把握できます。
							</p>
						</div>
						<div className="relative min-h-[30rem] basis-1/2">
							<Image
								src={'/home/sample.png'}
								alt="sample picture"
								fill={true}
								style={{
									objectFit: 'contain',
								}}
							/>
						</div>
					</div>
					<div className="mx-auto flex flex-col-reverse overflow-hidden sm:h-[25rem] sm:flex-row">
						<div className="relative flex min-h-80 basis-1/2 items-center justify-center">
							<Image
								src={'/home/inspiration_simple.png'}
								alt="inspiration"
								width={230}
								height={230}
								style={{
									objectFit: 'contain',
								}}
							/>
						</div>
						<div className="basis-1/2 content-center p-8 text-center">
							<div className="mt-1 text-[7vw] font-semibold leading-tight text-black sm:text-3xl">
								<p>繰り越した休暇も</p>
								<p>忘れない</p>
							</div>
							<p className="mt-4 text-slate-500 sm:text-lg">
								前年度からの繰り越し分も登録できるので、忘れずに利用可能です。
							</p>
						</div>
					</div>
					<div className="flex h-14 justify-center gap-10">
						<Button
							children={'登録する'}
							size="xl"
							block
							rounded
							onClick={() => {
								router.push('/create_user');
							}}
							className="items-center bg-orange-400 p-2 font-semibold shadow-lg transition hover:bg-orange-500 sm:basis-1/4"
						/>
						<Button
							children={
								<>
									<FiLogIn size={25} />
									<span className="ml-2">ログイン</span>
								</>
							}
							size="xl"
							block
							rounded
							onClick={() => {
								router.push('/login');
							}}
							className="items-center bg-gray-500 p-2 font-semibold shadow-lg transition hover:bg-gray-600 sm:basis-1/4"
						/>
					</div>
				</div>
			</Section>
			<div className="h-[10vw]"></div>
		</div>
	);
}
