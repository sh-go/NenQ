import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';

type Props = {
	summaryData: SummaryData;
	carryOverData: CarryOverData;
};

export const Summary = ({ summaryData, carryOverData }: Props) => {
	const router = useRouter();

	return (
		<div className="flex flex-col">
			<div className="-m-1.5 overflow-x-auto">
				<div className="inline-block min-w-full p-1.5 align-middle">
					<div className="overflow-hidden rounded-lg border shadow-md dark:border-gray-700">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-white dark:bg-gray-700">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
									>
										繰り越し
										<span className="mx-1">
											<button
												type="submit"
												onClick={() =>
													router.push(
														{
															pathname: '/update_carryover',
															query: {
																id: carryOverData.id,
																date: carryOverData.date,
																hour: carryOverData.hour,
																min: carryOverData.min,
															},
														},
														'update_carryover'
													)
												}
											>
												<FiEdit
													size="1.3em"
													className="text-gray-500 hover:fill-gray-400"
												/>
											</button>
										</span>
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
							<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
								<tr>
									<td className="whitespace-nowrap px-3 text-center text-base text-gray-700 dark:text-gray-200 sm:text-3xl">
										<div className="flex-row items-baseline justify-center sm:flex">
											<p>{carryOverData.date}日</p>
											<p className="hidden px-1 text-xl sm:inline"> と </p>
											<p>
												{carryOverData.hour}時間{carryOverData.min}分
											</p>
										</div>
									</td>
									<td className="whitespace-nowrap p-3 text-center text-base text-gray-700 dark:text-gray-200 sm:text-3xl">
										<div className="flex-row items-baseline justify-center sm:flex">
											<p>{summaryData.used_date}日</p>
											<p className="hidden px-1 text-xl sm:inline"> と </p>
											<p>
												{summaryData.used_hour}時間{summaryData.used_min}分
											</p>
										</div>
									</td>
									<td className="whitespace-nowrap p-3 text-center text-base text-gray-700 dark:text-gray-200 sm:text-3xl">
										<div className="flex-row items-baseline justify-center sm:flex">
											<p>{summaryData.remain_date}日</p>
											<p className="hidden px-1 text-xl sm:block"> と </p>
											<p>
												{summaryData.remain_hour}時間{summaryData.remain_min}分
											</p>
										</div>
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
