import axios, { AxiosInstance } from 'axios';

type Todo = {
	id: number;
	title: string;
	body: string;
};

export default async function getApi() {
	let instance: AxiosInstance;

	instance = axios.create({
		baseURL: 'http://nginx-back:80',
	});

	const res = await instance.get('/api/');
	const tododata = (await res?.data) as Todo[];

	return tododata.map((item) => {
		return {
			id: item.id,
			title: item.title,
			body: item.body,
		};
	});
}
