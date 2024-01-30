import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useEffect } from 'react';

import getApi from '../features/api/getApi';
import { Section } from '../components/layouts/Section';
import { ChangeDarkModeButton } from '../components/elements/ChangeDarkModeButton';
import { Summary } from '../features/components/Summary';
import { EditPencil, Trash } from 'iconoir-react';
import { ContentsList } from '../features/components/ContentsList';
import axios from 'axios';
import getSummary from '../features/api/getSummary';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
	const apidata = await getApi(context.req.cookies);
	const summarydata = await getSummary(context.req.cookies);
	return { props: { api: apidata, summary: summarydata } };
}

export default function Home({ api, summary }) {
	const router = useRouter();
	return (
		<div>
			<Section>
				<div className="flex items-center justify-between">
					<div className="text-3xl dark:text-gray-200">
						NenQ <span className="text-sm">ー年休管理アプリー</span>
					</div>
					<ChangeDarkModeButton />
				</div>

				<hr className="border-gray-500" />
				<br />

				<p className="px-2 mb-2 text-gray-500 dark:text-gray-400">取得状況</p>
				<Summary data={summary} />
				<br />
				<hr className="border-gray-500" />
				<br />

				<p className="px-2 mb-2 text-gray-500 dark:text-gray-400">年休一覧</p>
				<button type="submit" onClick={() => router.push('/create')}>
					create
				</button>
				<ContentsList data={api} />
			</Section>
		</div>
	);
}
