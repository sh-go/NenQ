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

export async function getServerSideProps() {
	const res = await getApi();

	return { props: { posts: res } };
}

export default function Home({ posts }) {
	useEffect(() => {
		async function fetchData() {
			await axios
				.get('http://localhost:8080/api/')
				.then((results) => {
					console.log(results);
				})
				.catch((e) => {
					console.log(e);
				});
		}
		fetchData();
	}, []);
	return (
		<div>
			<Section>
				<div className="flex items-center justify-between">
					<div className="text-3xl dark:text-gray-200">
						NenQ <span className="text-sm">ー年休管理アプリー</span>
					</div>
					<ChangeDarkModeButton />
				</div>

				<hr />
				<br />

				<p className="px-2 mb-2 text-gray-500 dark:text-gray-400">取得状況</p>
				<Summary />
				<br />
				<hr />
				<br />

				<p className="px-2 mb-2 text-gray-500 dark:text-gray-400">年休一覧</p>
				<ContentsList data={posts} />
			</Section>
		</div>
	);
}
