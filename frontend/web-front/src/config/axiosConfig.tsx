import axios from 'axios';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] =
	'application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] =
	'https://nenq.vercel.app';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

export const serverSideAxios = axios.create({
	baseURL: 'https://nenq-project-5o3fk7swva-an.a.run.app',
});

export const clientSideAxios = axios.create({
	baseURL: 'https://nenq-project-5o3fk7swva-an.a.run.app',
});
