import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { createContext, useEffect, useState } from 'react';
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';

import '../styles/global.css';
import fetchCurrentUser from '../features/api/fetchCurrentUser';

export const CurrentUserContext = createContext(undefined);

export default function App({ Component, pageProps, router }: AppProps) {
	const [currentUser, setCurrentUser] = useState<CurrentUserState>(undefined);
	console.log('Appスタート');

	useEffect(() => {
		console.log('useEffect開始');
		(async function () {
			console.log('useEffect内非同期処理開始');
			try {
				const user = await fetchCurrentUser();
				setCurrentUser({
					isLogin: true,
					username: user.username,
				});
				console.log('_app内try節成功');
			} catch {
				setCurrentUser({
					isLogin: false,
					username: null,
				});
				console.log('_app内catch節終了');
			}
		})();
	}, []);

	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>NenQ -年休管理アプリ-</title>
			</Head>
			<CurrentUserContext.Provider value={currentUser}>
				<ThemeProvider attribute="class" defaultTheme="light">
					<Component {...pageProps} />
					<ProgressBar
						height="3px"
						color="#0eb7c9"
						options={{ showSpinner: false }}
						shallowRouting
					/>
				</ThemeProvider>
			</CurrentUserContext.Provider>
		</>
	);
}
