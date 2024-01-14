import React, { useEffect, useState } from "react";
import { Log, Logs } from "./types";
import {
	XAxis,
	YAxis,
	Tooltip,
	BarChart,
	Bar,
	ResponsiveContainer,
} from "recharts";

type Props = Logs;
interface TickItem {
	x: number;
	y: number;
	payload: {
		value: string;
	};
}

const renderCustomBarLabel = ({ x, y, width, value }: any) => {
	return (
		<text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
			{value}
		</text>
	);
};

const renderCustomTick = ({ x, y, payload }: TickItem) => {
	const date = new Intl.DateTimeFormat("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).format(new Date(payload.value));
	return (
		<text
			x={x - 100}
			y={y + 10}
			width={10}
			height={10}
			fill="#666"
			textAnchor="middle"
		>
			{date}
		</text>
	);
};

export const sortMethods = {
	currentDate: (logs: Log[]) => {
		return [...logs]
			.sort((a, b) => {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			})
			.filter((log) => {
				const logDate = new Date(log.createdAt);
				const currentDate = new Date();
				const diff = currentDate.getTime() - logDate.getTime();
				return diff < 86400000;
			});
	},
};

export const ApiCallsWindow: React.FC<Props> = ({ logs }) => {
	const sortedByDate = sortMethods.currentDate(logs);

	const [chartWidth, setChartWidth] = useState(400);

	return (
		<div className="lg:w-5/12 rounded-md border-2 w-full p-2 flex flex-col">
			<p className="font-bold self-end text-2xl">last api calls</p>
			<ResponsiveContainer
				width="100%"
				height="100%"
				onResize={(w, h) => setChartWidth(w)}
			>
				<>
					<BarChart
						margin={{ left: -25, top: 20 }}
						width={chartWidth}
						height={440}
						data={sortedByDate}
					>
						<XAxis dataKey="createdAt" tick={renderCustomTick} />
						<YAxis />
						<Bar
							dataKey="id"
							barSize={20}
							fill="#9f9dbc"
							label={renderCustomBarLabel}
						/>
						<Tooltip
							wrapperStyle={{
								background: "none",
								backgroundColor: "transparent",
								zIndex: 0,
							}}
							cursor={{ fill: "transparent" }}
							viewBox={{ width: 50, height: 50 }}
							itemStyle={{ color: "white", backgroundColor: "black" }}
							contentStyle={{ color: "white", backgroundColor: "black" }}
						/>
					</BarChart>
				</>
			</ResponsiveContainer>
		</div>
	);
};
