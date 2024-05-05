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
	errorMessage: string;
	showErrorMessage?: boolean;
};

export const InputForm = ({
	label,
	type,
	name,
	register,
	errors,
	errorMessage,
	showErrorMessage = true,
}: Props) => {
	return (
		<div>
			<label
				htmlFor={name}
				className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
			>
				{label}
			</label>
			<input
				type={type}
				name={name}
				min="0"
				id={name}
				{...register(name, {
					required: errorMessage,
				})}
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
