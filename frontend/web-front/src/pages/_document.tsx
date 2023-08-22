import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="ja">
			<Head>
				<link href="../../dist/output.css" rel="stylesheet" />
			</Head>
			<body className="dark:bg-gray-800">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
