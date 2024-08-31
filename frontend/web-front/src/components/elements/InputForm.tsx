import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
	showPassword?: boolean;
	togglePasswordVisiblity?: () => void;
	showErrorMessage?: boolean;
};

export const InputForm = ({
	label,
	type,
	name,
	register,
	errors,
	errorMessage,
	showPassword,
	togglePasswordVisiblity,
	showErrorMessage = true,
}: Props) => {
	return (
		<div>
			<label htmlFor={name} className="mb-2 block text-sm font-medium">
				{label}
			</label>
			<div className="flex">
				<input
					type={type == 'password' && showPassword ? 'text' : type}
					name={name}
					min="0"
					id={name}
					{...register(name, {
						required: errorMessage,
					})}
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
				/>
				{type == 'password' ? (
					<span
						onClick={togglePasswordVisiblity}
						className="flex items-center justify-around"
					>
						{showPassword ? (
							<FaEyeSlash className="absolute mr-10 fill-gray-500" size={22} />
						) : (
							<FaEye className="absolute mr-10 fill-gray-500" size={22} />
						)}
					</span>
				) : null}
			</div>
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
