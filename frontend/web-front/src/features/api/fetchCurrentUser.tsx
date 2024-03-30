import axios from 'axios';

export default async function fetchCurrentUser() {
	try {
		const user = await fetchUser();
		return user;
	} catch (e) {
		// access tokenが、無効またはクッキーにない場合
		if (
			['Activations link expired', 'No token'].includes(
				e.response?.data['error']
			)
		) {
			// refresh tokenをクッキーから取得
			const refresh_token = await getRefreshToken();

			// refresh tokenがクッキーにない場合
			if (refresh_token['error'] === 'No token') {
				throw new Error('No refresh token');
			}

			// refresh　ｔｏｋｅｎでリフレッシュして新たなペアのトークンをクッキーにセットする
			const refreshRet = await setNewTokens(refresh_token);

			// refresh　tokenが無効なものの場合
			if (refreshRet === 'Token is invalid or expired') {
				throw new Error('Token is invalid or expired');
			}

			// 再度、access tokenからユーザー情報を取得
			if (refreshRet['access']) {
				const user = await fetchUser();
				return user;
			}
		}
	}
}

async function fetchUser() {
	return await axios
		.get('http://localhost:8080/api/user', {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			withCredentials: true,
		})
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			throw e;
		});
}

async function getRefreshToken() {
	return axios
		.get('http://localhost:8080/api/refresh', {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			withCredentials: true,
		})
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			return e.response.data;
		});
}

async function setNewTokens(refresh) {
	return axios
		.post('http://localhost:8080/api/refresh/token', refresh, {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			withCredentials: true,
		})
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			return 'Token is invalid or expired';
		});
}
