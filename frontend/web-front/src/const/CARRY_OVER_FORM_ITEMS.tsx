export const CARRY_OVER_FORM_ITEMS: {
	label: string;
	type: string;
	name: 'date' | 'hour' | 'min';
	error_message: string;
}[] = [
	{
		label: '繰り越した日数',
		type: 'number',
		name: 'date',
		error_message: '0以上の数字で入力してください',
	},
	{
		label: '繰り越した時間数',
		type: 'number',
		name: 'hour',
		error_message: '0以上の数字で入力してください',
	},
	{
		label: '繰り越した分数',
		type: 'number',
		name: 'min',
		error_message: '0以上の数字で入力してください',
	},
];
