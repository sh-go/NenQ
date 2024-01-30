import axios from 'axios';

export const useOnClick = () => {
	const data = {
		update: '2000-10-10',
		date: 0,
		hour: 0,
		text: '休暇',
		slug: null,
		user: '5d41dc9b-ea89-4216-aea7-1a06a5bc8158',
	};
	axios
		.post('http://localhost:8080/api/create/', data, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			withCredentials: true,
		})
		.then(() => alert('postできました！'))
		.catch((e) => alert(e));
};
