import { Logger, Logs } from "@prisma/client";
import {
	json,
	redirect,
	ActionFunctionArgs,
	LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
	CreateLogger,
	LoggerComponent,
	Overview,
} from "~/components/Dashboard/Sections";
import { prisma } from "~/server/db/db.server";
import { destroySession, getSession } from "~/server/session/session.server";
import { getDayAgo } from "~/utils";
import localForage from "localforage";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (!session) {
		return redirect("/", {
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		});
	}

	const userId = session.get("userId");

	if (!userId) {
		return redirect("/", {
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		});
	}
	const url = new URL(request.url);

	let date = url.searchParams.get("date") ?? new Date();
	let section = url.searchParams.get("section") ?? "overview";

	const loggers = (await prisma.logger.findMany({
		where: {
			user_id: userId,
		},
	})) as Logger[] | [];

	let logs: Logs[] | [] = [];
	if (section !== "overview" && section !== "create") {
		const logger = loggers.find((logger) => logger.logger_name === section);

		const gte = new Date(new Date(date).setHours(0, 0, 0, 0));
		const lte = new Date(new Date(date).setHours(23, 59, 59, 999));
		if (logger) {
			logs = await prisma.logs.findMany({
				where: {
					logger_id: logger.id,
					created_at: {
						gte,
						lte,
					},
				},
			});
		}
	}

	return json({ loggers, section, logs });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
	return json({ message: "Hello World" });
};

type Section = "overview" | "create";

type LoaderReturnType = {
	loggers: Logger[] | [];
	section: Section;
	logs: Logs[] | [];
};

const styles = {
	sectionButton:
		"border-2 border-b-0 rounded-tl-md rounded-tr-md p-2 border-gray-500 min-w-24 md:w-40 hover:border-black dark:hover:border-gray-100 hover:text-red-400 text-center flex-shrink-0",
	activeSectionButton:
		"border-2 border-b-0 border-red-400 rounded-tl-md rounded-tr-md p-2 border-gray-500 min-w-24 md:w-40 hover:border-black dark:hover:border-gray-100 hover:text-red-400 text-center flex-shrink-0",
};

export default function Dashboard() {
	const { loggers, section, logs } = useLoaderData() as LoaderReturnType;

	const mocked = {
		overview: <Overview loggers={loggers} />,
		create: <CreateLogger />,
	};

	let renderSection = mocked[section as keyof typeof mocked];

	if (section !== "overview" && section !== "create") {
		const logger = loggers.find((logger) => logger.logger_name === section);
		if (logger) {
			renderSection = <LoggerComponent logs={logs} />;
		}
	}

	return (
		<div className="dark:bg-black dark:text-white min-h-screen p-2 flex flex-col justify-start gap-5">
			<Form className="flex flex-row items-start justify-start w-full overflow-y-hidden overflow-x-auto gap-1 md:gap-5 border-b-2 rounded-md">
				<button
					name="section"
					type="submit"
					value="overview"
					className={
						section === "overview"
							? styles.activeSectionButton
							: styles.sectionButton
					}
				>
					overview
				</button>
				{loggers.length > 0 &&
					loggers.map((logger) => (
						<button
							key={logger.id}
							name="section"
							type="submit"
							value={logger.logger_name}
							className={
								section === logger.logger_name
									? styles.activeSectionButton
									: styles.sectionButton
							}
						>
							{logger.logger_name}
						</button>
					))}

				<button
					name="section"
					type="submit"
					value="create"
					className={
						section === "create"
							? styles.activeSectionButton
							: styles.sectionButton
					}
				>
					create
				</button>
			</Form>

			<div className="w-full">{renderSection}</div>
		</div>
	);
}
