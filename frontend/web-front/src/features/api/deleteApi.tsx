import { NextRouter } from 'next/router';
import { clientSideAxios } from '../../config/axiosConfig';

export default async function deleteApi(id: number, router: NextRouter) {
	await clientSideAxios
		.delete(`/api/delete/${id}`)
		.then(() => {
			alert('削除しました！');
			router.push('/');
		})
		.catch((e) => alert(e));
}
