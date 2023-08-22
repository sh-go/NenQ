import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';

import getApi from '../features/api/getApi';
import { Section } from '../components/layouts/Section';
import { ChangeDarkModeButton } from '../components/elements/ChangeDarkModeButton';
import { Summary } from '../features/components/Summary';
import { EditPencil, Trash } from 'iconoir-react';
import { ContentsList } from '../features/components/ContentsList';

export async function getServerSideProps() {
	const res = await getApi();

	return { props: { posts: res } };
}

export default function Home({ posts }) {
	console.log(posts);

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
				<ContentsList {...posts} />
				<ul>
					{posts.map((item) => {
						return (
							<li key={item.id} className="font-sans hover:font-mono">
								<Link href={`/posts/${item.id}`}>{item.title}</Link>
								<p>{item.body}</p>
							</li>
						);
					})}
				</ul>
			</Section>
		</div>
	);
}
