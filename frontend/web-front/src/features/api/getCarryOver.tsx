import { serverSideAxios } from '../../config/axiosConfig';

export default async function getCarryOver(access_token) {
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
			return undefined;
		});
}
