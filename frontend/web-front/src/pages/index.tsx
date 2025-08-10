import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import Button from '../components/elements/Button';
import { ChangeDarkModeButton } from '../components/elements/ChangeDarkModeButton';
import Section from '../components/layouts/Section';
import { clientSideAxios } from '../config/axiosConfig';
import ContentsList from '../features/components/ContentsList';
import ContentsListSkeleton from '../features/components/ContentsListSkeleton';
import CreateModal from '../features/components/CreateModal';
import DeleteAllModal from '../features/components/DeleteAllModal';
import LogoutModal from '../features/components/LogoutModal';
import Summary from '../features/components/Summary';
import SummarySkeleton from '../features/components/SummarySkeleton';

export default function Home(): React.JSX.Element {
	const router = useRouter();
	const [api, setApi] = useState<ListData[]>([]);
	const [summary, setSummary] = useState<SummaryData | null>(null);
	const [carryOver, setCarryOver] = useState<CarryOverData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [logoutOpen, setLogoutOpen] = useState(false);
	const [createOpen, setCreateOpen] = useState(false);
	const [deleteAllOpen, setDeleteAllOpen] = useState(false);
	const cancelButtonRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [apiRes, summaryRes, carryOverRes] = await Promise.all([
					clientSideAxios.get('/api/list'),
					clientSideAxios.get('/api/summary'),
					clientSideAxios.get('/api/carryover'),
				]);
				setApi(apiRes.data as ListData[]);
				setSummary(summaryRes.data as SummaryData);
				setCarryOver(carryOverRes.data as CarryOverData);
			} catch {
				router.push('/login');
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [router]);

	return (
		<>
			<Head>
				<title>ホーム</title>
				<meta name="description" content="トップページ説明" />
			</Head>
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
					{isLoading || !summary || !carryOver ? (
						<SummarySkeleton />
					) : (
						<Summary summaryData={summary} carryOverData={carryOver} />
					)}
					<br />
					<hr className="border-gray-300" />
					<br />
					<div className="flex justify-between">
						<p className="mb-2 px-2">年休一覧</p>
						<div className="flex gap-4">
							<Button
								rounded
								className="hidden bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-lg hover:bg-rose-800 dark:bg-rose-700 dark:hover:bg-rose-800 sm:block"
								onClick={() => setCreateOpen(true)}
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
					{isLoading ? <ContentsListSkeleton /> : <ContentsList data={api} />}
				</Section>
				<LogoutModal
					logoutOpen={logoutOpen}
					setLogoutOpen={setLogoutOpen}
					cancelButtonRef={cancelButtonRef}
				/>
				<CreateModal
					createOpen={createOpen}
					setCreateOpen={setCreateOpen}
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
						onClick={() => setCreateOpen(true)}
					>
						＋
					</Button>
				</div>
			</div>
		</>
	);
}
