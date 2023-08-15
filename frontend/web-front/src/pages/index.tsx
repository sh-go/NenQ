import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import getApi from '../features/api/getApi';
import { Section } from '../components/layouts/Section';

export async function getServerSideProps() {
	const res = await getApi();

	return { props: { posts: res } };
}

export default function Home({ posts }) {
	console.log(posts);
	return (
		<div>
			<Section>
				<div className="text-3xl">
					NenQ <span className="text-sm">ー年休管理アプリー</span>
				</div>
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
