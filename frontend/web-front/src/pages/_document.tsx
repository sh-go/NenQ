import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="ja">
			<Head></Head>
			<body className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
