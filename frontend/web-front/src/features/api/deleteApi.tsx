import axios from 'axios';
import { NextRouter } from 'next/router';

export default async function deleteApi(id: number, router: NextRouter) {
	await axios
		.delete(`http://localhost:8080/api/delete/${id}`, {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			withCredentials: true,
		})
		.then(() => {
			alert('削除しました！');
			router.push('/');
		})
		.catch((e) => alert(e));
}
