import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react';
import { FiCheck } from 'react-icons/fi';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';

type Props = {
	selectedCategory: {
		id: number;
		name: string;
		unavailable: boolean;
	};
	setSelectedCategory: React.Dispatch<
		React.SetStateAction<{
			id: number;
			name: string;
			unavailable: boolean;
		}>
	>;
	category: {
		id: number;
		name: string;
		unavailable: boolean;
	}[];
};

export default function CategoryListBox({
	selectedCategory,
	setSelectedCategory,
	category,
}: Props): React.JSX.Element {
	return (
		<Listbox value={selectedCategory} onChange={setSelectedCategory}>
			<div className="relative flex h-full items-center">
				<ListboxButton className="relative block h-full w-3/4 rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-left text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 dark:border-gray-700 dark:bg-slate-800">
					{selectedCategory.name}
					<HiOutlineChevronUpDown
						className="group pointer-events-none absolute right-2.5 top-3.5 size-4 fill-white/60"
						aria-hidden="true"
					/>
				</ListboxButton>
				<ListboxOptions
					anchor="bottom"
					transition
					className="z-10 w-[var(--button-width)] rounded-xl border border-gray-300 bg-gray-50 p-1 transition duration-100 ease-in [--anchor-gap:8px] focus:outline-none data-[leave]:data-[closed]:opacity-0 dark:border-gray-700 dark:bg-slate-800"
				>
					{category.map((ctg) => (
						<ListboxOption
							key={ctg.name}
							value={ctg}
							className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-gray-300/75 dark:data-[focus]:bg-white/10"
						>
							<FiCheck className="invisible size-4 group-data-[selected]:visible" />
							<div className="text-sm/6">{ctg.name}</div>
						</ListboxOption>
					))}
				</ListboxOptions>
			</div>
		</Listbox>
	);
}
