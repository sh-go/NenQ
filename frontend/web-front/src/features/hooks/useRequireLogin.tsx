import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { CurrentUserContext } from '../../pages/_app';

export default function useRequireLogin() {
	const router = useRouter();
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const authChecking = currentUser === undefined;

	useEffect(() => {
		if (authChecking) return;
		console.log(`isLogin: ${currentUser.isLogin}`);
		if (!currentUser.isLogin) router.push('/login');
	}, [authChecking, currentUser]);

	return { currentUser };
}
