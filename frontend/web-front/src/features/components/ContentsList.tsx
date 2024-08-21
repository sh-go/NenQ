import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DeleteModal from './DeleteModal';

type Props = {
	data: ListData[];
};

export const ContentsList: React.FC<Props> = ({ data }: Props) => {
	const router = useRouter();
	const [id, setId] = useState(null);
	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef(null);

	return (
		<div className="overflow-hidden shadow-md dark:border-gray-700">
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
									<td className="whitespace-nowrap px-2 py-4 text-center text-sm text-gray-700 sm:text-xl dark:text-gray-200">
										{item.update}
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 sm:text-xl dark:text-gray-200">
										{item.date}
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 sm:text-xl dark:text-gray-200">
										{item.hour}
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-center text-xs text-gray-700 sm:text-lg dark:text-gray-200">
										{item.text}
									</td>
									<td className="flex justify-center px-2 py-4 ">
										<button
											type="submit"
											onClick={() =>
												router.push(
													{
														pathname: '/edit',
														query: {
															id: item.id,
															update: item.update,
															date: item.date,
															hour: item.hour,
															text: item.text,
														},
													},
													'edit'
												)
											}
										>
											<FiEdit className="mx-1 size-4 text-gray-500 hover:fill-gray-400 sm:size-6" />
										</button>
										<button
											type="submit"
											onClick={() => {
												setId(item.id);
												setOpen(true);
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
			<DeleteModal
				id={id}
				open={open}
				setOpen={setOpen}
				cancelButtonRef={cancelButtonRef}
			/>
		</div>
	);
};
