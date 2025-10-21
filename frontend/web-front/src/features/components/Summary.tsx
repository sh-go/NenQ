import { useRouter } from 'next/router';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

type Props = {
	summaryData: SummaryData;
	carryOverData: CarryOverData;
};

export default function Summary({
	summaryData,
	carryOverData,
}: Props): React.JSX.Element {
	const router = useRouter();

	const pieChartData = React.useMemo(
		() => [
			{ name: '取得済み', value: summaryData.usedDate },
			{ name: '残り', value: summaryData.remainDate },
		],
		[summaryData]
	);
	const COLORS = ['#34d399', '#f87171'];

	const areaChartData = React.useMemo(
		() => [
			{
				name: 'Page A',
				uv: 4000,
				pv: 2400,
				amt: 2400,
			},
			{
				name: 'Page B',
				uv: 3000,
				pv: 1398,
				amt: 2210,
			},
			{
				name: 'Page C',
				uv: 2000,
				pv: 9800,
				amt: 2290,
			},
			{
				name: 'Page D',
				uv: 2780,
				pv: 3908,
				amt: 2000,
			},
			{
				name: 'Page E',
				uv: 1890,
				pv: 4800,
				amt: 2181,
			},
			{
				name: 'Page F',
				uv: 2390,
				pv: 3800,
				amt: 2500,
			},
			{
				name: 'Page G',
				uv: 3490,
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
			<div className="mt-4 flex flex-row justify-center md:mt-0">
				<div className="w-full">
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={pieChartData}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={80}
							>
								{pieChartData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="w-full">
					<ResponsiveContainer width="100%" height={250}>
						<AreaChart
							style={{
								width: '100%',
								maxWidth: '700px',
								maxHeight: '70vh',
								aspectRatio: 1.618,
							}}
							data={areaChartData}
							margin={{
								top: 20,
								right: 0,
								left: 0,
								bottom: 0,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis width="auto" />
							<Tooltip />
							<Area
								type="monotone"
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
