import axios, { AxiosInstance } from 'axios';

export default async function getApi() {
	let instance: AxiosInstance;

	instance = axios.create({
		baseURL: 'http://nginx-back:80',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const res = await instance.get('/api/');
	console.log(res.data);
	const data = (await res?.data) as Data[];

	// instance
	// 	.get('/api/')
	// 	.then((results) => {
	// 		console.log(results.data);
	// 		const data = results.data;
	// 		return data;
	// 	})
	// 	.catch((e) => {
	// 		console.log('通信できない！');
	// 		console.log(e.status);
	// 		const data = [];
	// 		return data;
	// 	});

	return data.map((item) => {
		return {
			id: item.id,
			update: item.update,
			date: item.date,
			hour: item.hour,
			text: item.text,
			author: item.author,
			slug: item.slug,
		};
	});
}
