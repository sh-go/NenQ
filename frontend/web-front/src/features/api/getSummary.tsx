import axios from 'axios';

export default async function getSummary(cookies) {
	const access_token = cookies['access_token'];

	return await axios
		.get('http://nginx-back:80/api/summary/', {
			headers: {
				'Content-Type': 'application/json;',
				Authorization: `JWT ${access_token}`,
			},
			// withCredentials: true,
		})
		.then((res) => {
			const data = res.data as SummaryData;
			return data;
		})
		.catch((e) => console.log(`エラーが発生しました: ${e}`));
}
