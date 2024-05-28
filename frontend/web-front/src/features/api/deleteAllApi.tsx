import axios from 'axios';
import { NextRouter } from 'next/router';

export default async function deleteAllApi(router: NextRouter) {
	await axios
		.delete('http://localhost:8080/api/delete/all', {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			withCredentials: true,
		})
		.then(() => {
			alert('すべて削除しました！');
			router.push('/');
		})
		.catch((e) => {
			console.log(e);
			alert(e);
		});
}
