export const LOGIN_FORM_ITEMS: {
	label: string;
	type: string;
	name: 'email' | 'password';
	error_message: string;
}[] = [
	{
		label: 'メールアドレス',
		type: 'email',
		name: 'email',
		error_message: 'メールアドレスを入力してください',
	},
	{
		label: 'パスワード',
		type: 'password',
		name: 'password',
		error_message: 'パスワードを入力してください',
	},
];
