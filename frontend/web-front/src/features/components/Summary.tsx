import axios from 'axios';
import { NextResponse } from 'next/server';

type Props = {
	data: SummaryData;
};

export const Summary = ({ data }: Props) => {
	return (
		<div className="flex flex-col">
			<div className="-m-1.5 overflow-x-auto">
				<div className="p-1.5 min-w-full inline-block align-middle">
					<div className="border rounded-lg overflow-hidden dark:border-gray-700">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
									>
										取得済み
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
									>
										残り
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-center text-3xl text-gray-700 dark:text-gray-200">
										{data.used_date}日<span className="text-xl"> と </span>
										{data.used_hour}時間{data.used_min}分
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-center text-3xl text-gray-700 dark:text-gray-200">
										{data.remain_date}日<span className="text-xl"> と </span>
										{data.remain_hour}時間
										{data.remain_min}分
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
