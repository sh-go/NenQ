import React from 'react';
import {
	Cell,
	Pie,
	PieChart,
	PieLabelRenderProps,
	ResponsiveContainer,
	Tooltip,
	TooltipContentProps,
} from 'recharts';

const COLORS = ['#34d399', '#f87171'];

type Props = {
	summaryData: SummaryData;
};

type TooltipPosition = { x: number; y: number } | undefined;

type PieSectionProps = {
	data: { name: string; value: number }[];
	label: (props: PieLabelRenderProps) => React.ReactNode;
	onMouseMove: (event: any) => void;
	onMouseLeave: () => void;
};

const PieSection = React.memo(
	({ data, label, onMouseMove, onMouseLeave }: PieSectionProps) => (
		<Pie
			data={data}
			dataKey="value"
			nameKey="name"
			cx="50%"
			cy="50%"
			innerRadius="50%"
			outerRadius="80%"
			startAngle={90}
			endAngle={-270}
			label={label}
			labelLine={false}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
		>
			{data.map((_, index) => (
				<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
			))}
		</Pie>
	)
);

PieSection.displayName = 'SummaryPieChartPieSection';

const SummaryPieChartComponent = ({
	summaryData,
}: Props): React.JSX.Element => {
	const chartRef = React.useRef<HTMLDivElement | null>(null);
	const [pos, setPos] = React.useState<TooltipPosition>();

	const pieChartData = React.useMemo(() => {
		const total = summaryData.sumInputAll + summaryData.remain15min;
		const usedRatio = total > 0 ? summaryData.sumInputAll / total : 0;
		const remainRatio = total > 0 ? summaryData.remain15min / total : 0;
		const usedPercent = Math.round(usedRatio * 100 * 10) / 10;
		const remainPercent = Math.round(remainRatio * 100 * 10) / 10;

		return [
			{ name: '取得済み', value: usedPercent },
			{ name: '利用可能', value: remainPercent },
		];
	}, [summaryData]);

	const customLabel = React.useCallback(
		({
			cx,
			cy,
			midAngle,
			innerRadius,
			outerRadius,
			name,
		}: PieLabelRenderProps) => {
			const RAD = Math.PI / 180;
			const r =
				Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
			const x = Number(cx) + r * Math.cos(-Number(midAngle) * RAD) * 0.1;
			const y = Number(cy) + r * Math.sin(-Number(midAngle) * RAD);

			return (
				<text
					x={x}
					y={y}
					textAnchor={x >= Number(cx) ? 'start' : 'end'}
					dominantBaseline="central"
					fontSize={12}
					fill="white"
				>
					{name}
				</text>
			);
		},
		[]
	);

	const renderTooltip = React.useCallback(
		(props: TooltipContentProps<number, string>) => {
			const { active, payload } = props;
			if (!active || !payload?.length) return null;
			const row = payload[0];
			const color = row.color ?? row.payload?.fill ?? '#64748b';
			const value = (row.value as number) ?? 0;
			const v = `${value.toFixed(1)}%`;
			const name = row.name ?? row.payload?.name ?? '';

			return (
				<div
					className="rounded-md bg-white/90 px-3 py-2 text-sm text-black shadow"
					style={{
						border: `2px solid ${color}`,
					}}
				>
					<div className="font-medium">{row.name}</div>
					<div>
						{name === pieChartData[0].name
							? `${v}（${summaryData.usedDate}日${summaryData.usedHour}時間${summaryData.usedMin}分）`
							: name === pieChartData[1].name
							? `${v}（${summaryData.remainDate}日${summaryData.remainHour}時間${summaryData.remainMin}分）`
							: ''}
					</div>
				</div>
			);
		},
		[pieChartData, summaryData]
	);

	const handleMouseMove = React.useCallback(
		(e: any) => {
			const container = chartRef.current;

			if (!container) {
				setPos(undefined);
				return;
			}

			const rect = container.getBoundingClientRect();
			if (!rect) return;

			document.addEventListener('mousemove', (e) => {
				const cX = e.clientX ?? 0;
				const cY = e.clientY ?? 0;
				if (rect && Number.isFinite(cX) && Number.isFinite(cY)) {
					setPos({ x: cX - rect.left + 10, y: cY - rect.top + 10 });
				}
			});
		},
		[setPos]
	);

	const handleMouseLeave = React.useCallback(() => {
		setPos(undefined);
	}, [setPos]);

	return (
		<div className="h-60 md:w-2/5">
			<ResponsiveContainer width="100%" height="110%" ref={chartRef}>
				<PieChart
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<PieSection
						data={pieChartData}
						label={customLabel}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					/>
					<Tooltip
						content={renderTooltip}
						position={{ x: pos?.x, y: pos?.y }}
						allowEscapeViewBox={{ x: true, y: true }}
						wrapperStyle={{ pointerEvents: 'none' }}
						isAnimationActive={false}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

const SummaryPieChart = React.memo(SummaryPieChartComponent);

export default SummaryPieChart;
