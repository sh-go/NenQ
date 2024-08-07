import { serverSideAxios } from '../../config/axiosConfig';

export default async function getCarryOver(cookies) {
	const access_token = cookies['access_token'];

	return await serverSideAxios
		.get('/api/carryover', {
			headers: {
				Authorization: `JWT ${access_token}`,
			},
		})
		.then((res) => {
			const data = res.data as CarryOverData;
			return data;
		})
		.catch((e) => {
			return undefined;
		});
}
