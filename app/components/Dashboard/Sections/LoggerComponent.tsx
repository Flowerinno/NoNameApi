import { Logs } from "@prisma/client";
import { ApiCallsWindow, LogsWindow } from "..";

interface Props {
	logs: Logs[] | [];
}

export const LoggerComponent = ({ logs }: Props) => {
	return (
		<div className="flex flex-row flex-wrap gap-5 p-2 md:items-start md:justify-around">
			<ApiCallsWindow logs={logs} />
			<LogsWindow logs={logs} />
		</div>
	);
};
