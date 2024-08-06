import axios from 'axios';
import { NextRouter } from 'next/router';

export default async function deleteAllApi(router: NextRouter) {
	await axios
		.delete('/api/delete/all')
		.then(() => {
			alert('すべて削除しました！');
			router.push('/');
		})
		.catch((e) => {
			console.log(e);
			alert(e);
		});
}
