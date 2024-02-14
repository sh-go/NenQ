export const CREATE_USER_FORM_ITEMS = [
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
		error_message: '半角英数字を20字以内で入力してください',
	},
	{
		label: '確認用パスワード',
		type: 'password',
		name: 'password_2',
		error_message: '半角英数字を20字以内で入力してください',
	},
];
