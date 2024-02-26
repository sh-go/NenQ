import axios from 'axios';

export default async function deleteApi(id: number) {
	await axios
		.delete(`http://localhost:8080/api/delete/${id}`, {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			withCredentials: true,
		})
		.then(() => alert('削除しました！'))
		.catch((e) => alert(e));
}
