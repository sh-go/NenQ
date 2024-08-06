import axios from 'axios';

export default function axiosConfig() {
	axios.defaults.baseURL = 'http://localhost:8080';
	axios.defaults.headers.common['Content-Type'] =
		'application/json; charset=utf-8';
	axios.defaults.withCredentials = true;
}
