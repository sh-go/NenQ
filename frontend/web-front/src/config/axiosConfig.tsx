import axios from 'axios';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] =
	'application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] =
	'https://nenq.site';
// 'http://localhost:8080';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

export const serverSideAxios = axios.create({
	baseURL: 'https://api.nenq.site',
	// baseURL: 'http://nginx-backend:80',
});

export const clientSideAxios = axios.create({
	baseURL: 'https://api.nenq.site',
	// baseURL: 'http://localhost:8080',
});
