import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { radioOptions } from '../../const/radioOptions';

type Props = {
	label: string;
	name: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	error_message: string;
};

export const InputRadioForm = ({
	label,
	name,
	register,
	errors,
	error_message,
}: Props) => {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				{label}
			</label>

			<div className="text-center">
				{radioOptions.map((item) => (
					<label
						key={item.label}
						className="sm:text-sm focus:ring-primary-600 focus:border-primary-600 w-full p-5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<input
							type="radio"
							name={name}
							id={name}
							value={item.value}
							{...register(name, {
								required: {
									value: true,
									message: error_message,
								},
							})}
						/>
						{item.label}
					</label>
				))}
			</div>
			<ErrorMessage
				errors={errors}
				name={name}
				render={({ message }) => <p className="text-rose-500">{message}</p>}
			/>
		</div>
	);
};
