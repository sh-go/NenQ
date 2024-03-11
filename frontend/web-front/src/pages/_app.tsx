import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'next-themes';
import '../styles/global.css';
import { createContext, useEffect } from 'react';

export default function App({ Component, pageProps, router }: AppProps) {
	const currentuser = {
		isLogin: false,
		username: null,
	};
	useEffect(() => {
		if (router.pathname === '/login') return;
		try {
			user = fetchCurrentUser();
			currentuser.isLogin = true;
			currentuser.username = user.username;
		} catch (error) {
			router.replace('/login');
		}
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
