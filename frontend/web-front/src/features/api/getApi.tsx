import { serverSideAxios } from '../../config/axiosConfig';

export default async function getApi(cookies) {
	const access_token = cookies['access_token'];

	return await serverSideAxios
		.get('/api/list', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then((res) => {
			const data = res.data as ListData[];
			return data;
		})
		.catch((e) => {
			console.log(`getApiエラー：${e}`);
			return undefined;
		});
}
