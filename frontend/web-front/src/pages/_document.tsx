import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="ja">
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
