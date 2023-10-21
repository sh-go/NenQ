import axios, { AxiosInstance } from 'axios';

export default async function getApi() {
	let instance: AxiosInstance;

	instance = axios.create({
		baseURL: 'http://nginx-back:80',
	});

	const res = await instance.get('/api/');
	const data = (await res?.data) as Data[];

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
