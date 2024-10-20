import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { Suspense, useRef, useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';

import Button from '../components/elements/Button';
import { ChangeDarkModeButton } from '../components/elements/ChangeDarkModeButton';
import { Section } from '../components/layouts/Section';
import getApi from '../features/api/getApi';
import getCarryOver from '../features/api/getCarryOver';
import getSummary from '../features/api/getSummary';
import { ContentsList } from '../features/components/ContentsList';
import DeleteAllModal from '../features/components/DeleteAllModal';
import LogoutModal from '../features/components/LogoutModal';
import { Summary } from '../features/components/Summary';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const access_token = context.req.cookies['access_token'];

	const apiData = await getApi(access_token);
	const summaryData = await getSummary(access_token);
	const carryOverData = await getCarryOver(access_token);

	if (!apiData || !summaryData || !carryOverData) {
		return {
			redirect: {
				permanent: false,
				destination: '/login',
			},
		};
	}
	return {
		props: { api: apiData, summary: summaryData, carryOver: carryOverData },
	};
}

export default function Home({ api, summary, carryOver }) {
	const router = useRouter();
	const [logoutOpen, setLogoutOpen] = useState(false);
	const [deleteAllOpen, setDeleteAllOpen] = useState(false);
	const cancelButtonRef = useRef(null);
	return (
		<div>
			<div className="mb-4 bg-white px-6 py-3 dark:bg-gray-700">
				<div className="flex items-center justify-between">
					<div className="text-3xl">
						NenQ <span className="text-sm">ー年休管理アプリー</span>
					</div>
					<div className="flex gap-3 px-2">
						<div>
							<ChangeDarkModeButton />
						</div>
						<div>
							<button type="submit" onClick={() => setLogoutOpen(true)}>
								<IoIosLogOut size="2em" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<Section>
				<p className="mb-2 px-2">取得状況</p>
				<Suspense fallback="<div>loading...</div>">
					<Summary summaryData={summary} carryOverData={carryOver} />
				</Suspense>
				<br />
				<hr className="border-gray-300" />
				<br />
				<div className="flex justify-between">
					<p className="mb-2 px-2">年休一覧</p>
					<div className="flex gap-4">
						<Button
							rounded
							className="hidden bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-lg hover:bg-rose-800 dark:bg-rose-700 dark:hover:bg-rose-800 sm:block"
							onClick={() => router.push('/create')}
						>
							＋　追加
						</Button>
						<button
							className="px-4 py-2 text-sm text-gray-400 hover:text-gray-500"
							onClick={() => setDeleteAllOpen(true)}
						>
							✗　全削除
						</button>
					</div>
				</div>
				<ContentsList data={api} />
			</Section>
			<LogoutModal
				logoutOpen={logoutOpen}
				setLogoutOpen={setLogoutOpen}
				cancelButtonRef={cancelButtonRef}
			/>
			<DeleteAllModal
				deleteAllOpen={deleteAllOpen}
				setDeleteAllOpen={setDeleteAllOpen}
				cancelButtonRef={cancelButtonRef}
			/>
			<div>
				<Button
					className="fixed bottom-5 right-5 block rounded-full bg-rose-500 px-4 py-2 text-lg font-bold text-white shadow-lg hover:bg-rose-800 dark:bg-rose-700 dark:hover:bg-rose-800 sm:hidden"
					onClick={() => router.push('/create')}
				>
					＋
				</Button>
			</div>
		</div>
	);
}
