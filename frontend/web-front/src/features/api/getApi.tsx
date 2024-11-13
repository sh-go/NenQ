import { serverSideAxios } from '../../config/axiosConfig';

export default async function getApi(access_token): Promise<ListData[]> {
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
