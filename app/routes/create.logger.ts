import { json, ActionFunctionArgs } from "@remix-run/node";
import { zfd } from "zod-form-data";
import z from "zod";
import { prisma } from "~/server/db/db.server";
import { getSession } from "~/server/session/session.server";

const validator = zfd.formData({
	logger_name: zfd.text(
		z
			.string()
			.min(3, "Logger name must be at least 3 characters long")
			.max(13, "Logger name must be at most 13 characters long")
			.regex(/^[a-zA-Z]+$/i, "Only alphabetical characters are allowed")
	),
});

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = session.get("userId") as string;

	if (!session || !userId) {
		return json({ message: "Not Authorized" }, { status: 401 });
	}

	const formData = await request.formData();

	const data = validator.safeParse(formData);

	if (data.success === false) {
		const message = data.error.issues.map((issue) => issue.message).join(" / ");
		return json({ message }, { status: 400 });
	}

	const logger_name = data.data.logger_name.trim();
	const isExists = await prisma.logger.findFirst({
		where: {
			logger_name,
		},
	});

	if (isExists) {
		return json({ message: "Logger with such name already exists" });
	}

	const maxLoggers = await prisma.logger.count({
		where: {
			user_id: userId,
		},
	});

	if (maxLoggers >= 10) {
		return json({
			message: "You can have only 10 loggers, contact to inrease the quote.",
		});
	}

	const logger = await prisma.logger.create({
		data: {
			logger_name,
			user_id: userId,
		},
	});

	if (!logger) {
		return json({ message: "Error creating logger" }, { status: 500 });
	}

	return json({ message: `Logger ${logger_name} is successfully created.` });
};
