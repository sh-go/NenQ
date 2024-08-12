import { serverSideAxios } from '../../config/axiosConfig';

export default async function getCarryOver(cookies) {
	const access_token = cookies['access_token'];

	return await serverSideAxios
		.get('/api/carryover', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then((res) => {
			const data = res.data as CarryOverData;
			return data;
		})
		.catch((e) => {
			console.log(`getCarryOverエラー：${e}`);
			throw e.response.data;
		});
}
