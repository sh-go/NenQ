import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'next-themes';
import '../styles/global.css';
import { createContext, useEffect } from 'react';
import fetchCurrentUser from '../features/api/fetchCurrentUser';

export default function App({ Component, pageProps, router }: AppProps) {
	const currentuser = {
		isLogin: false,
		username: null,
	};
	console.log('Appスタート');
	console.log(`router.pathname: ${router.pathname}`);

	useEffect(() => {
		console.log('useEffect開始');
		(async function () {
			console.log('useEffect内非同期処理開始');
			if (router.pathname === '/login') return;
			try {
				const user = await fetchCurrentUser();
				currentuser.isLogin = true;
				currentuser.username = user.username;
			} catch {
				router.replace('/login');
			}
		})();
	}, [router.pathname]);

	const CurrentUserContext = createContext(currentuser);

	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>NenQ -年休管理アプリ-</title>
			</Head>
			<CurrentUserContext.Provider value={currentuser}>
				<ThemeProvider attribute="class" defaultTheme="light">
					<Component {...pageProps} />
				</ThemeProvider>
			</CurrentUserContext.Provider>
		</>
	);
}
