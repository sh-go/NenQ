import { EditPencil, Trash } from 'iconoir-react';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../../components/elements/Modal';

type Props = {
	data: Data[];
};

export const ContentsList: React.FC<Props> = ({ data }: Props) => {
	const router = useRouter();
	const [id, setId] = useState(null);
	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef(null);

	return (
		<div className="overflow-hidden dark:border-gray-700">
			<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
				<thead className="">
					<tr>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
						>
							日付
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
						>
							取得日数
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
						>
							取得時間
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
						>
							種別
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
						></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
					{data.map((item) => {
						return (
							<React.Fragment key={item.id}>
								<tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">
									<td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-700 dark:text-gray-200">
										{item.update}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700 dark:text-gray-200">
										{item.date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700 dark:text-gray-200">
										{item.hour}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700 dark:text-gray-200">
										{item.text}
									</td>
									<td className="float-right flex px-6 py-4">
										<button type="submit" onClick={() => router.push('/edit')}>
											<EditPencil className="mx-1 text-gray-500 hover:fill-gray-200" />
										</button>
										<button
											type="submit"
											onClick={() => {
												setId(item.id);
												setOpen(true);
											}}
										>
											<Trash className="mx-1 text-gray-500 hover:fill-gray-200" />
										</button>
									</td>
								</tr>
							</React.Fragment>
						);
					})}
				</tbody>
			</table>
			<Modal
				id={id}
				open={open}
				setOpen={setOpen}
				cancelButtonRef={cancelButtonRef}
			/>
		</div>
	);
};
