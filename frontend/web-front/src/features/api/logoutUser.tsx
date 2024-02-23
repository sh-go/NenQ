import axios from 'axios';
import { useRouter } from 'next/router';

export default async function logoutUser() {
	await axios
		.post('http://localhost:8080/api/logout/', {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			withCredentials: true,
		})
		.then(() => alert('ログアウトしました！'))
		.catch((e) => alert(e));
}
