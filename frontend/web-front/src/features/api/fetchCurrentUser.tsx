import { clientSideAxios } from '../../config/axiosConfig';

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
	return await clientSideAxios
		.get('/api/user')
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			throw e;
		});
}

async function getRefreshToken() {
	return clientSideAxios
		.get('/api/refresh')
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			return e.response.data;
		});
}

async function setNewTokens(refresh) {
	return clientSideAxios
		.post('/api/refresh/token', refresh)
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			return 'Token is invalid or expired';
		});
}
