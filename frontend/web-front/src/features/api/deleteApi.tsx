import axios from 'axios';
import { NextRouter } from 'next/router';

export default async function deleteApi(id: number, router: NextRouter) {
	await axios
		.delete(`/api/delete/${id}`)
		.then(() => {
			alert('削除しました！');
			router.push('/');
		})
		.catch((e) => alert(e));
}
