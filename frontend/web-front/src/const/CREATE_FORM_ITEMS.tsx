export const CREATE_FORM_ITEMS: {
	label: string;
	type: string;
	name: 'update' | 'date' | 'hour' | 'text';
	error_message: string;
}[] = [
	{
		label: '種別',
		type: 'text',
		name: 'text',
		error_message: '取得した種別を選んでください',
	},

	{
		label: '日数',
		type: 'number',
		name: 'date',
		error_message: '取得した日数を入力してください',
	},
	{
		label: '時間',
		type: 'number',
		name: 'hour',
		error_message: '取得した時間数を入力してください',
	},
];
