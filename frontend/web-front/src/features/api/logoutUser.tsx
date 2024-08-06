import axios from 'axios';
import { NextRouter } from 'next/router';

export default async function logoutUser(router: NextRouter) {
	await axios
		.post('/api/logout', {})
		.then(() => router.push('/login'))
		.catch((e) => alert(e));
}
