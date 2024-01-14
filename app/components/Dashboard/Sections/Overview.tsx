import { Logger } from "@prisma/client";
import { useFetcher, useSubmit } from "@remix-run/react";
import { CodeSnippets } from "~/components";
import { formatDate } from "~/utils";
import { snippets } from "./data";

type Props = {
	loggers: Logger[] | [];
};

export const Overview = ({ loggers }: Props) => {
	const fetcher = useFetcher();
	const submit = useSubmit();
	if (!loggers || !loggers.length) {
		return (
			<div className="flex flex-row items-center justify-center">
				<h2 className="text-2xl">no loggers yet, go to create section</h2>
			</div>
		);
	}

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		submit(e.currentTarget);
	};

	return (
		<div className="flex flex-col items-center justify-center gap-3">
			{loggers.map((logger) => {
				return (
					<fetcher.Form
						key={logger.id}
						onClick={(e) => submitHandler(e)}
						className="flex flex-col items-start justify-around text-sm md:text-2xl border-2 rounded-md w-11/12 cursor-pointer p-2"
					>
						<h2 className="font-bold ">Logger Name: {logger.logger_name}</h2>
						<span>Total logs: {logger.total_logs}</span>
						<span>Creation time: {formatDate(logger.created_at)}</span>
						<input type="hidden" name="section" value={logger.logger_name} />
					</fetcher.Form>
				);
			})}
			{/* <h3 className="text-2xl">a quick 'how to':</h3> */}
			{/* <div className="flex flex-row flex-wrap w-full items-start justify-center p-4 gap-3">
				<CodeSnippets label="1. Install" code={snippets[1]} />
				<CodeSnippets label="2. Initialize and use" code={snippets[2]} />
			</div> */}
		</div>
	);
};
