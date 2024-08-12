import { serverSideAxios } from '../../config/axiosConfig';

export default async function getSummary(cookies) {
	const access_token = cookies['access_token'];

	return await serverSideAxios
		.get('/api/summary', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then((res) => {
			const data = res.data as SummaryData;
			return data;
		})
		.catch((e) => {
			console.log(`getSummaryエラー：${e}`);
			return undefined;
		});
}
