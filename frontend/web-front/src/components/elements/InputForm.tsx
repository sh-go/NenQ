import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
	label: string;
	type: string;
	name:
		| 'email'
		| 'password'
		| 'update'
		| 'date'
		| 'hour'
		| 'min'
		| 'text'
		| 'carry_over';
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	error_message: string;
	showErrorMessage: boolean;
};

export const InputForm = ({
	label,
	type,
	name,
	register,
	errors,
	error_message,
	showErrorMessage = true,
}: Props) => {
	return (
		<div>
			<label
				htmlFor={name}
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{label}
			</label>
			<input
				type={type}
				name={name}
				min="0"
				id={name}
				{...register(name, {
					required: error_message,
				})}
				className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			/>
			{showErrorMessage && (
				<ErrorMessage
					errors={errors}
					name={name}
					render={({ message }) => (
						<p className="text-sm text-rose-400">{message}</p>
					)}
				/>
			)}
		</div>
	);
};
