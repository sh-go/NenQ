import axios from 'axios';

export default async function fetchCurrentUser() {
	try {
		const user = await fetchUser();
		return user;
	} catch (error) {
		if (error['error'] === 'Activations link expired') {
			const refresh_token = await getRefreshToken();
			const refreshRet = await getAccessToken(refresh_token);

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
			return res;
		})
		.catch((e) => {
			throw e;
		});
}

async function getRefreshToken() {}
