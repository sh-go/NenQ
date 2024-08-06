import axios from 'axios';

export default async function getApi(cookies) {
	const access_token = cookies['access_token'];

	return await axios
		.get('http://nginx-backend:80/api/list', {
			headers: {
				'Content-Type': 'application/json;',
				Authorization: `JWT ${access_token}`,
			},
		})
		.then((res) => {
			const data = res.data as ListData[];
			return data;
		})
		.catch((e) => {
			console.log(`エラー：${e}`);
			return undefined;
		});
}
