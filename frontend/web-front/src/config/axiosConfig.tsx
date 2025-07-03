import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';

axios.defaults.headers.common['Accept'] = 'application/json';

axios.defaults.headers.common['Content-Type'] =
	'application/json;charset=utf-8';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = isProd
	? 'https://nenq.site'
	: 'http://localhost:8080';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.withCredentials = true;

export const serverSideAxios = axios.create({
	baseURL: isProd ? 'https://api.nenq.site' : 'http://nginx-backend:80',
});

export const clientSideAxios = axios.create({
	baseURL: isProd ? 'https://api.nenq.site' : 'http://localhost:8080',
});
