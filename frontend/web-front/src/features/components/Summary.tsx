import { useRouter } from 'next/router';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import SummaryPieChart from './SummaryPieChart';

type Props = {
	summaryData: SummaryData;
	carryOverData: CarryOverData;
};

export default function Summary({
	summaryData,
	carryOverData,
}: Props): React.JSX.Element {
	const router = useRouter();

	const areaChartData = React.useMemo(
		() => [
			{
				name: '1月',
				uv: 2,
				pv: 2400,
				amt: 2400,
			},
			{
				name: '2月',
				uv: 5,
				pv: 1398,
				amt: 2210,
			},
			{
				name: '3月',
				uv: 6,
				pv: 9800,
				amt: 2290,
			},
			{
				name: '4月',
				uv: 9,
				pv: 3908,
				amt: 2000,
			},
			{
				name: '5月',
				uv: 11,
				pv: 4800,
				amt: 2181,
			},
			{
				name: '6月',
				uv: 11,
				pv: 3800,
				amt: 2500,
			},
			{
				name: '7月',
				uv: 12,
				pv: 4300,
				amt: 2100,
			},
			{
				name: '8月',
				uv: 13,
				pv: 4300,
				amt: 2100,
			},
			{
				name: '9月',
				uv: 17,
				pv: 4300,
				amt: 2100,
			},
			{
				name: '10月',
				uv: 17,
				pv: 4300,
				amt: 2100,
			},
			{
				name: '11月',
				uv: 17,
				pv: 4300,
				amt: 2100,
			},
			{
				name: '12月',
				uv: 19,
				pv: 4300,
				amt: 2100,
			},
		],
		[summaryData]
	);

	return (
		<div className="flex flex-col">
			<div className="-m-1.5 ">
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
											<p>{summaryData.usedDate}日</p>
											<p className="hidden px-1 text-xl sm:inline"> と </p>
											<p>
												{summaryData.usedHour}時間{summaryData.usedMin}分
											</p>
										</div>
									</td>
									<td className="whitespace-nowrap p-3 text-center text-base text-gray-700 dark:text-gray-200 sm:text-3xl">
										<div className="flex-row items-baseline justify-center sm:flex">
											<p>{summaryData.remainDate}日</p>
											<p className="hidden px-1 text-xl sm:block"> と </p>
											<p>
												{summaryData.remainHour}時間{summaryData.remainMin}分
											</p>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className="mt-0 w-full justify-center md:flex md:flex-row">
				<SummaryPieChart summaryData={summaryData} />
				<div className="h-52 w-full md:h-64 md:w-3/5">
					<ResponsiveContainer width="102%" height="100%">
						<AreaChart
							style={{
								maxWidth: '700px',
								maxHeight: '70vh',
								aspectRatio: 1.618,
							}}
							data={areaChartData}
							margin={{
								top: 20,
								right: 10,
								left: 0,
								bottom: 0,
							}}
						>
							<CartesianGrid strokeDasharray="0 1" />
							<XAxis dataKey="name" fontSize={10} />
							<YAxis width="auto" fontSize={10} />
							<Tooltip />
							<Area
								type="linear"
								dataKey="uv"
								stroke="#8884d8"
								fill="#8884d8"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
