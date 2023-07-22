import React, { FC, useState } from 'react';
import axios, { AxiosInstance } from 'axios';

type Todo = {
	id: number;
	title: string;
	body: string;
};

export const GetApi: React.FC = () => {
	const [todos, setTodo] = useState<Todo[]>([]);

	const getAPIData = async () => {
		let instance: AxiosInstance;

		instance = axios.create({
			baseURL: 'http://localhost:8080',
		});

		try {
			const res = await instance.get('/api/');
			console.log(res?.data);
			const tododata = res?.data as Todo[];
			setTodo(tododata);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<button onClick={getAPIData}>click</button>
			{todos.map((item) => (
				<div key={item.id}>
					<h1>{item.title}</h1>
					<p>{item.body}</p>
				</div>
			))}
		</div>
	);
};
