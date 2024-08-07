import axios from 'axios';

axios.defaults.headers.common['Content-Type'] =
	'application/json; charset=utf-8';
axios.defaults.withCredentials = true;

export const serverSideAxios = axios.create({
	baseURL: 'https://nenq-project-5o3fk7swva-an.a.run.app',
});

export const clientSideAxios = axios.create({
	baseURL: 'https://nenq-project-5o3fk7swva-an.a.run.app',
});
