import { useEffect, useState } from "react";
import { Logs } from "@prisma/client";
import { Form, useLocation, useNavigate, useSubmit } from "@remix-run/react";
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
	const location = useLocation();
	const submit = useSubmit();
	const dateParam = new URLSearchParams(location.search).get("date");

	const currDay = formatDate(new Date(), false).split("/").reverse().join("-");
	const [date, setDate] = useState(dateParam ?? currDay);

	const handleDateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		submit(e.currentTarget, {
			preventScrollReset: true,
		});
	};

	return (
		<div className="dark:bg-black dark:text-white w-full lg:w-5/12 rounded-md">
			<div
				id="logs_control_panel"
				className="border-2 rounded-md flex flex-row justify-between p-1"
			>
				<div className="p-1 flex flex-row items-center gap-2">
					<Form navigate={false} onChange={(e) => handleDateSubmit(e)}>
						<input
							type="hidden"
							name="section"
							value={
								new URLSearchParams(location.search).get("section") ||
								"overview"
							}
						/>
						<input
							name="date"
							type="date"
							value={date}
							className="border-2 rounded-md p-1 text-black text-sm md:text-md"
							onChange={(e) => {
								setDate(e.target.value);
							}}
						/>
					</Form>
				</div>
				<h3 className="self-center mr-5 text-sm md:text-md font-bold">logs</h3>
			</div>
			<ul className="w-full rounded-md h-96 overflow-scroll overflow-x-hidden bg-scroll flex flex-col gap-2">
				{logs?.length > 0 &&
					logs.map((log) => {
						return <SingleLog key={log.id} log={log} />;
					})}
			</ul>
		</div>
	);
};
