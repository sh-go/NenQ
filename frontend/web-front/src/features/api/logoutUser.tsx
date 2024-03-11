import axios from 'axios';
import { NextRouter } from 'next/router';

export default async function logoutUser(router: NextRouter) {
	await axios
		.post(
			'http://localhost:8080/api/logout',
			{},
			{
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				// withCredentials: true,
			}
		)
		.then(() => router.push('/login'))
		.catch((e) => alert(e));
}
