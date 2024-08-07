import { NextRouter } from 'next/router';
import { clientSideAxios } from '../../config/axiosConfig';

export default async function logoutUser(router: NextRouter) {
	await clientSideAxios
		.post('/api/logout', {})
		.then(() => router.push('/login'))
		.catch((e) => alert(e));
}
