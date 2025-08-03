import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

type Props = {
	data: ListData[];
};

export default function ContentsList({ data }: Props): React.JSX.Element {
	const router = useRouter();

	const [id, setId] = useState(null);

	const [editOpen, setEditOpen] = useState(false);

	const [editValues, setEditValues] = useState<{
		id: number;
		update: { startDate: string; endDate: string };
		date: number;
		hour: number;
		text: string;
	} | null>(null);

	const [deleteOpen, setDeleteOpen] = useState(false);

	const cancelButtonRef = useRef(null);

	return (
		<div className="mb-20 overflow-hidden shadow-md dark:border-gray-700">
			<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
				<thead>
					<tr>
						<th
							scope="col"
							className="p-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
						>
							日付
						</th>
						<th
							scope="col"
							className="p-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
						>
							日数
						</th>
						<th
							scope="col"
							className="p-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
						>
							時間
						</th>
						<th
							scope="col"
							className="p-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
						>
							種別
						</th>
						<th
							scope="col"
							className="p-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
						></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
					{data.map((item) => {
						return (
							<React.Fragment key={item.id}>
								<tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">
									<td className="whitespace-nowrap px-2 py-4 text-center text-sm text-gray-700 dark:text-gray-200 sm:text-xl">
										{item.startDate} 〜{item.endDate}
									</td>
									<td className="whitespace-nowrap p-4 text-center text-sm text-gray-700 dark:text-gray-200 sm:text-xl">
										{item.date}
									</td>
									<td className="whitespace-nowrap p-4 text-center text-sm text-gray-700 dark:text-gray-200 sm:text-xl">
										{item.hour}
									</td>
									<td className="whitespace-nowrap p-4 text-center text-xs text-gray-700 dark:text-gray-200 sm:text-lg">
										<div className="flex items-center justify-center gap-2">
											{item.text === '休暇' ? (
												<div className="size-3 rounded-full bg-green-600" />
											) : item.text === '遅刻' ? (
												<div className="size-3 rounded-full bg-blue-600" />
											) : item.text === '早退' ? (
												<div className="size-3 rounded-full bg-amber-600" />
											) : null}
											{item.text}
										</div>
									</td>
									<td className="flex justify-center px-2 py-4 ">
										<button
											type="submit"
											onClick={() => {
												setEditOpen(true);
												setEditValues({
													id: item.id,
													update: {
														startDate: item.startDate,
														endDate: item.endDate,
													},
													date: item.date,
													hour: item.hour,
													text: item.text,
												});
											}}
										>
											<FiEdit className="mx-1 size-4 text-gray-500 hover:fill-gray-400 sm:size-6" />
										</button>
										<button
											type="submit"
											onClick={() => {
												setId(item.id);
												setDeleteOpen(true);
											}}
										>
											<FiTrash className="mx-1 size-4 text-gray-500 hover:fill-gray-400 sm:size-6" />
										</button>
									</td>
								</tr>
							</React.Fragment>
						);
					})}
				</tbody>
			</table>
			<EditModal
				editOpen={editOpen}
				setEditOpen={setEditOpen}
				editValues={editValues}
				cancelButtonRef={cancelButtonRef}
			/>

			<DeleteModal
				id={id}
				open={deleteOpen}
				setOpen={setDeleteOpen}
				cancelButtonRef={cancelButtonRef}
			/>
		</div>
	);
}
