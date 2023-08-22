export const Summary = () => {
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
										残り年休
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-center text-3xl font-medium text-gray-700 dark:text-gray-200">
										7h 20m
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-center text-3xl text-gray-700 dark:text-gray-200">
										16days 1h 15m
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
