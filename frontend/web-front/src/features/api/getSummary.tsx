import { serverSideAxios } from '../../config/axiosConfig';

export default async function getSummary(cookies) {
	const access_token = cookies['access_token'];

	return await serverSideAxios
		.get('/api/summary', {
			headers: {
				Authorization: `JWT ${access_token}`,
			},
		})
		.then((res) => {
			const data = res.data as SummaryData;
			return data;
		})
		.catch((e) => {
			return undefined;
		});
}
