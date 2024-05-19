import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';

import { ChangeDarkModeButton } from '../components/elements/ChangeDarkModeButton';
import { Section } from '../components/layouts/Section';
import getApi from '../features/api/getApi';
import getCarryOver from '../features/api/getCarryOver';
import getSummary from '../features/api/getSummary';
import { ContentsList } from '../features/components/ContentsList';
import LogoutModal from '../features/components/LogoutModal';
import { Summary } from '../features/components/Summary';

export async function getServerSideProps(context) {
	const apiData = await getApi(context.req.cookies);
	const summaryData = await getSummary(context.req.cookies);
	const carryOverData = await getCarryOver(context.req.cookies);

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
	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef(null);
	return (
		<div>
			<Section>
				<div className="flex items-center justify-between">
					<div className="text-3xl dark:text-gray-200">
						NenQ <span className="text-sm">ー年休管理アプリー</span>
					</div>
					<div className="flex gap-3 px-2">
						<div>
							<ChangeDarkModeButton />
						</div>
						<div>
							<button type="submit" onClick={() => setOpen(true)}>
								<IoIosLogOut size="2em" />
							</button>
						</div>
					</div>
				</div>

				<hr className="border-gray-500" />
				<br />

				<p className="mb-2 px-2 text-gray-500 dark:text-gray-400">取得状況</p>
				<Summary summaryData={summary} carryOverData={carryOver} />
				<br />
				<hr className="border-gray-500" />
				<br />

				<p className="mb-2 px-2 text-gray-500 dark:text-gray-400">年休一覧</p>
				<ContentsList data={api} />
				<div className="fixed bottom-12 right-16">
					<button
						className="rounded-full bg-rose-700 px-4 py-2 font-bold text-gray-300 shadow-lg hover:bg-rose-800"
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
