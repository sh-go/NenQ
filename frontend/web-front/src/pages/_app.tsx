import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'next-themes';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>NenQ -年休管理アプリ-</title>
			</Head>
			<ThemeProvider attribute="class" defaultTheme="light">
				<Component {...pageProps} />;
			</ThemeProvider>
		</>
	);
}
