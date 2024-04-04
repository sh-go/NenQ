import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { CurrentUserContext } from '../../pages/_app';

export default function useRequireLogin() {
	const router = useRouter();
	const currentUser: CurrentUserState = useContext(CurrentUserContext);
	const authChecking = currentUser === undefined;

	useEffect(() => {
		console.log('create_user内useEffect開始');
		if (authChecking) return;
		console.log(`isLogin: ${currentUser.isLogin}`);
		if (!currentUser.isLogin) router.push('/login');
	}, [authChecking, currentUser]);

	return { currentUser };
}
