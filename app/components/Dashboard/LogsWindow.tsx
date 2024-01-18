import { useEffect, useState } from "react";
import { Logs } from "@prisma/client";
import { useLocation, useNavigate } from "@remix-run/react";
import { formatDate } from "~/utils";

type LogsWindowProps = { logs: Logs[] | [] };
type SingleLogProps = { log: Logs };

const SingleLog = ({ log }: SingleLogProps) => {
	return (
		<li className="rounded-md border-2 border-black dark:border-white flex flex-col w-full gap-1 p-1">
			<p>
				<strong>timestamp: </strong>
				{new Intl.DateTimeFormat("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}).format(new Date(log.created_at))}
			</p>
			<p>
				<strong>level: </strong> {log.level}
			</p>
			<p>
				<strong>message: </strong> {log.message}
			</p>
		</li>
	);
};

export const LogsWindow = ({ logs }: LogsWindowProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const currDay = formatDate(new Date(), false).split("/").reverse().join("-");
	const [date, setDate] = useState(currDay);
	const [sortedList, setSortedList] = useState<Logs[] | []>([]);

	const refreshLogs = async () => {
		const path = location.pathname;

		const params =
			new URLSearchParams(location.search).get("section") || "overview";

		navigate(path + "?section=" + params, { replace: true });
	};

	useEffect(() => {
		if (date) {
			const filtered = logs.filter((log) => {
				const formatted = formatDate(log.created_at, false)
					.split("/")
					.reverse()
					.join("-");

				return formatted === date;
			});

			setSortedList(() => filtered);
		} else {
			setSortedList(logs);
		}
	}, [date]);

	return (
		<div className="dark:bg-black dark:text-white w-full lg:w-5/12 rounded-md">
			<div
				id="logs_control_panel"
				className="border-2 rounded-md flex flex-row justify-between p-1"
			>
				<div className="p-1 flex flex-row items-center gap-2">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-sm md:text-md"
						onClick={refreshLogs}
					>
						Refresh
					</button>
					<input
						type="date"
						value={date}
						className="border-2 rounded-md p-1 text-black text-sm md:text-md"
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<h3 className="self-center mr-5 text-sm md:text-md font-bold">logs</h3>
			</div>
			<ul className="w-full rounded-md h-96 overflow-scroll overflow-x-hidden bg-scroll flex flex-col gap-2">
				{sortedList?.length > 0 &&
					sortedList.map((log) => {
						return <SingleLog key={log.id} log={log} />;
					})}
			</ul>
		</div>
	);
};
