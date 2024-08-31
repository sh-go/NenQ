export const CREATE_FORM_ITEMS: {
	label: string;
	type: string;
	name: 'update' | 'date' | 'hour' | 'text';
	error_message: string;
}[] = [
	{
		label: '取得した日',
		type: 'date',
		name: 'update',
		error_message: '日付を入力してください',
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
	{
		label: '種別',
		type: 'radio',
		name: 'text',
		error_message: '取得した種別を選んでください',
	},
];
