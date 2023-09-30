import { EditPencil, Trash } from 'iconoir-react';
import React from 'react';

export const ContentsList: React.FC = (props) => {
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
					<tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">
						<td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-700 dark:text-gray-200">
							8月21日
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700 dark:text-gray-200">
							1h 15m
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700 dark:text-gray-200">
							早退
						</td>
						<td className="float-right flex px-6 py-4">
							<a href="#">
								<EditPencil className="mx-1 text-gray-500 hover:fill-gray-200" />
							</a>
							<a href="#">
								<Trash className="mx-1 text-gray-500 hover:fill-gray-200" />
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};