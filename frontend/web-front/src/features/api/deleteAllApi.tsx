import { NextRouter } from 'next/router';
import { clientSideAxios } from '../../config/axiosConfig';

export default async function deleteAllApi(router: NextRouter) {
	await clientSideAxios
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
