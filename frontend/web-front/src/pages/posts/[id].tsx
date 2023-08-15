export const getServerSideProps = async (context) => {
	const id = context.query.id;
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
	const post = await res.json();

	return { props: { post } };
};

export default function post({ post }) {
	return (
		<>
			<h1>投稿ID:{post.id}</h1>
			<h3>タイトル:{post.title}</h3>
			<div>
				<p>本文</p>
				{post.body}
			</div>
		</>
	);
}
