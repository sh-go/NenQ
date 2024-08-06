import axios from 'axios';

export default async function getSummary(cookies) {
	const access_token = cookies['access_token'];

	return await axios
		.get('http://nginx-backend:80/api/summary', {
			headers: {
				'Content-Type': 'application/json;',
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
