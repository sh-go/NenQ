import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { RADIO_OPTIONS } from '../../const/RADIO_OPTIONS';

type Props = {
	label: string;
	name: 'update' | 'date' | 'hour' | 'text';
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	errorMessage: string;
};

export const InputRadioForm = ({
	label,
	name,
	register,
	errors,
	errorMessage,
}: Props) => {
	return (
		<div>
			<label className="mb-2 block text-sm font-medium">{label}</label>

			<div className="space-x-8 text-center text-sm">
				{RADIO_OPTIONS.map((item) => (
					<label
						key={item.label}
						className="w-full dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
					>
						<input
							type="radio"
							name={name}
							id={name}
							value={item.value}
							{...register(name, {
								required: {
									value: true,
									message: errorMessage,
								},
							})}
							className="mx-2"
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
