import { useState } from "react";
import { Log, Logs } from "./types";

type LogsWindowProps = Logs;
type SingleLogProps = { log: Log };

const SingleLog: React.FC<SingleLogProps> = ({ log }) => {
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
				}).format(new Date(log.createdAt))}
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

export const LogsWindow: React.FC<LogsWindowProps> = ({ logs }) => {
	const [isOpen, setIsOpen] = useState(true);

	const sorted = [...logs].sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});

	if (logs.length === 0) {
		return (
			<div
				className="dark:bg-black dark:text-white w-full 
			lg:w-5/12 rounded-md border-2 h-96 flex items-center justify-center"
			>
				<h3>no logs</h3>
			</div>
		);
	}

	return (
		<div className="dark:bg-black dark:text-white w-full lg:w-5/12 rounded-md">
			<div
				id="logs_control_panel"
				className="border-2 rounded-md flex flex-row justify-between p-1"
			>
				<div className="p-1 flex flex-row items-center gap-2">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
						Refresh
					</button>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? "Hide" : "Show"}
					</button>
					<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
						Clear
					</button>
				</div>
				<h3 className="self-center mr-5 text-2xl font-bold">logs</h3>
			</div>
			{isOpen && (
				<ul className="w-full rounded-md h-96 overflow-scroll overflow-x-hidden bg-scroll flex flex-col gap-2">
					{sorted?.length > 0 &&
						sorted.map((log) => {
							return <SingleLog key={log.id} log={log} />;
						})}
				</ul>
			)}
		</div>
	);
};
