import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { LogOut } from 'iconoir-react';

import getApi from '../features/api/getApi';
import { Section } from '../components/layouts/Section';
import { ChangeDarkModeButton } from '../components/elements/ChangeDarkModeButton';
import { Summary } from '../features/components/Summary';
import { ContentsList } from '../features/components/ContentsList';
import getSummary from '../features/api/getSummary';
import LogoutModal from '../features/components/LogoutModal';

export async function getServerSideProps(context) {
	const apidata = await getApi(context.req.cookies);
	const summarydata = await getSummary(context.req.cookies);
	return { props: { api: apidata, summary: summarydata } };
}

export default function Home({ api, summary }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef(null);
	return (
		<div>
			<Section>
				<div className="flex items-center justify-between">
					<div className="text-3xl dark:text-gray-200">
						NenQ <span className="text-sm">ー年休管理アプリー</span>
					</div>
					<div className="flex gap-3">
						<div className="px-2">
							<ChangeDarkModeButton />
						</div>
						<div>
							<button type="submit" onClick={() => setOpen(true)}>
								<LogOut />
							</button>
						</div>
					</div>
				</div>

				<hr className="border-gray-500" />
				<br />

				<p className="px-2 mb-2 text-gray-500 dark:text-gray-400">取得状況</p>
				<Summary data={summary} />
				<br />
				<hr className="border-gray-500" />
				<br />

				<p className="px-2 mb-2 text-gray-500 dark:text-gray-400">年休一覧</p>
				<ContentsList data={api} />
				<div className="fixed bottom-12 right-16">
					<button
						className="bg-rose-700 hover:bg-rose-800 text-gray-300 font-bold py-2 px-4 rounded-full shadow-lg"
						onClick={() => router.push('/create')}
					>
						＋
					</button>
				</div>
			</Section>
			<LogoutModal
				open={open}
				setOpen={setOpen}
				cancelButtonRef={cancelButtonRef}
			/>
		</div>
	);
}
