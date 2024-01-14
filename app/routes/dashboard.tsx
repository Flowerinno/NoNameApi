import { Logger } from "@prisma/client";
import {
	json,
	redirect,
	ActionFunctionArgs,
	LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { CreateLogger, Overview } from "~/components/Dashboard/Sections";
import { prisma } from "~/server/db/db.server";
import { destroySession, getSession } from "~/server/session/session.server";

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

	const loggers = (await prisma.logger.findMany({
		where: {
			user_id: userId,
		},
	})) as Logger[] | [];

	let section = new URL(request.url).searchParams.get("section") ?? "overview";

	return json({ loggers, section });
};
export const action = async ({ request, params }: ActionFunctionArgs) => {
	//setup webhook here on new logs
	return json({ message: "Hello World" });
};

type Section = "overview" | "create";

type LoaderReturnType = {
	loggers: Logger[] | [];
	section: Section;
};

const styles = {
	sectionButton:
		"border-2 border-b-0 rounded-tl-md rounded-tr-md p-2 border-gray-500 min-w-24 md:w-40 hover:border-black dark:hover:border-gray-100 hover:text-red-400 text-center flex-shrink-0",
	activeSectionButton:
		"border-2 border-b-0 border-red-400 rounded-tl-md rounded-tr-md p-2 border-gray-500 min-w-24 md:w-40 hover:border-black dark:hover:border-gray-100 hover:text-red-400 text-center flex-shrink-0",
};

export default function Dashboard() {
	const { loggers, section } = useLoaderData() as LoaderReturnType;

	const mocked = {
		overview: <Overview loggers={loggers} />,
		create: <CreateLogger />,
	};

	const renderSection = mocked[section as keyof typeof mocked];
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
			{/* <LogsWindow logs={logs} />
			<ApiCallsWindow logs={logs} /> */}
			{/* <div className="dark:bg-black dark:text-white w-full lg:w-5/12 rounded-md h-96 overflow-scroll overflow-x-hidden border-2">
				123
			</div>
			<div className="dark:bg-black dark:text-white w-full lg:w-5/12 rounded-md h-96 overflow-scroll overflow-x-hidden border-2">
				123
			</div> */}
		</div>
	);
}
