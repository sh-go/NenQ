import {
	Field,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react';
import { FiCheck } from 'react-icons/fi';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';

type Props = {
	/** 選択中の時間 (id) */
	value: number | null;
	/** 親フォームへ選択結果を通知する */
	onChange: (value: number | null) => void;
	/** 選択肢一覧 */
	hours: {
		id: number;
		name: string;
		unavailable: boolean;
	}[];
	/** 入力を無効化するか */
	isDisabled?: boolean;
	/** プレースホルダーとして表示するラベル */
	label: string;
};

export default function HourListBox({
	value,
	onChange,
	hours,
	isDisabled = false,
	label,
}: Props): React.JSX.Element {
	const selected = hours.find((hour) => hour.id === value) || null;

	return (
		<Field disabled={isDisabled} className="h-full">
			<Listbox value={selected} onChange={(hour) => onChange(hour.id)}>
				<div className="relative flex h-full items-center">
					<ListboxButton className="relative block h-full w-[90px] rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-left text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 dark:border-gray-700 dark:bg-slate-800">
						{selected ? (
							selected.name
						) : (
							<span className="opacity-50">{label}</span>
						)}
						<HiOutlineChevronUpDown
							className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
							aria-hidden="true"
						/>
					</ListboxButton>
					<ListboxOptions
						anchor="bottom"
						transition
						className="z-10  rounded-xl border border-gray-300 bg-gray-50 p-1 transition duration-100 ease-in [--anchor-gap:8px] focus:outline-none data-[leave]:data-[closed]:opacity-0 dark:border-gray-700 dark:bg-slate-800"
					>
						{hours.map((hour) => (
							<ListboxOption
								key={hour.id}
								value={hour}
								className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-gray-300/75 dark:data-[focus]:bg-white/10"
							>
								<FiCheck className="invisible size-4 group-data-[selected]:visible" />
								<div className="text-sm/6">{hour.name}</div>
							</ListboxOption>
						))}
					</ListboxOptions>
				</div>
			</Listbox>
		</Field>
	);
}
