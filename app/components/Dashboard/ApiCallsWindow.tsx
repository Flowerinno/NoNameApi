import React, { useState } from "react";
import { Logs } from "@prisma/client";
import {
	XAxis,
	YAxis,
	Tooltip,
	BarChart,
	Bar,
	ResponsiveContainer,
} from "recharts";
import { formatDate } from "~/utils";
import { date } from "zod";
import { useLocation } from "@remix-run/react";

type Props = { logs: Logs[] | [] };
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
		hour: "numeric",
		minute: "2-digit",
	}).format(new Date(payload.value));
	return (
		<text
			x={x}
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
	currentDate: (logs: Logs[]) => {
		return [...logs]
			.sort((a, b) => {
				return (
					new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
				);
			})
			.filter((log) => {
				const logDate = new Date(log.created_at);
				const currentDate = new Date();
				const diff = currentDate.getTime() - logDate.getTime();
				return diff < 86400000;
			});
	},
};

const CustomTooltip = ({
	obj: { active, payload, label },
}: {
	obj: {
		active?: boolean;
		payload: any;
		label: Date;
	};
}) => {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip">
				<p className="label">{`${formatDate(label, false)} - count: ${
					payload[0].value
				}`}</p>
				<p className="desc">1 hour gap</p>
			</div>
		);
	}

	return null;
};

const groupLogsBy2Hours = (
	logs: Logs[]
): { timestamp: number; count: number }[] => {
	const groupedLogs: { timestamp: number; count: number }[] = [];
	const twoHoursInMilliseconds = 1 * 60 * 60 * 1000;

	logs.forEach((log) => {
		const logTimestamp = new Date(log.created_at).getTime();
		const roundedTimestamp =
			Math.floor(logTimestamp / twoHoursInMilliseconds) *
			twoHoursInMilliseconds;

		const existingGroup = groupedLogs.find(
			(group) => group.timestamp === roundedTimestamp
		);

		if (existingGroup) {
			existingGroup.count += 1;
		} else {
			groupedLogs.push({ timestamp: roundedTimestamp, count: 1 });
		}
	});

	return groupedLogs;
};

export const ApiCallsWindow: React.FC<Props> = ({ logs }) => {
	const location = useLocation();
	const groupedLogs = groupLogsBy2Hours(logs);
	const [chartWidth, setChartWidth] = useState(400);

	const dateParam = new URLSearchParams(location.search).get("date") ?? "";
	const date = formatDate(dateParam ? new Date(dateParam) : new Date(), false);

	if (groupedLogs.length === 0) {
		return (
			<div className="lg:w-5/12 w-full rounded-md border-2 p-2 flex flex-col">
				<p className="font-bold self-center text-sm md:text-md">
					No API calls for {date}
				</p>
			</div>
		);
	}

	return (
		<div className="lg:w-5/12 w-full rounded-md border-2 p-2 flex flex-col">
			<p className="font-bold self-end text-sm md:text-md">
				last api calls for {date}
			</p>
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
						data={groupedLogs}
					>
						<XAxis dataKey="timestamp" tick={renderCustomTick} />
						<YAxis />
						<Bar
							dataKey="count"
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
							content={({ active, payload, label }) => (
								<CustomTooltip obj={{ active, payload, label }} />
							)}
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
