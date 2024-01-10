import axios from 'axios';

export default async function getApi(cookies) {
	const access_token = cookies['access_token'];

	return await axios
		.get('http://nginx-back:80/api', {
			headers: {
				'Content-Type': 'application/json;',
				Authorization: `JWT ${access_token}`,
			},
			// withCredentials: true,
		})
		.then((res) => {
			const data = res.data as Data[];
			return data;

			// data.map((item) => {
			// 	return {
			// 		id: item.id,
			// 		update: item.update,
			// 		date: item.date,
			// 		hour: item.hour,
			// 		text: item.text,
			// 		author: item.author,
			// 		slug: item.slug,
			// 	};
			// });
		})
		.catch((e) => console.log(`エラーが発生しました: ${e}`));
}
