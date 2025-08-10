import React from 'react';

export default function SummarySkeleton(): React.JSX.Element {
	return (
		<div className="animate-pulse overflow-hidden rounded-lg border shadow-md dark:border-gray-700">
			<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
				<thead className="bg-white dark:bg-gray-700">
					<tr>
						<th
							scope="col"
							className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
						>
							繰り越し
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
						>
							取得済み
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
						>
							利用可能
						</th>
					</tr>
				</thead>
			</table>
			<div className="grid grid-cols-3 gap-4 p-6">
				<div className="h-6 rounded bg-gray-300 dark:bg-gray-600" />
				<div className="h-6 rounded bg-gray-300 dark:bg-gray-600" />
				<div className="h-6 rounded bg-gray-300 dark:bg-gray-600" />
			</div>
		</div>
	);
}
