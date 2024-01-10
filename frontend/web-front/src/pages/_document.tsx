import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="ja">
			<Head></Head>
			<body className="dark:bg-gray-800">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
