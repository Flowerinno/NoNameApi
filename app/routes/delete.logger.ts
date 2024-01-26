import { json, redirect, ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/server/db/db.server";
import { getSession } from "~/server/session/session.server";

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = session.get("userId") as string;

	const formData = await request.formData();

	const logger_name = formData.get("logger_name") as string;

	if (!logger_name) {
		return json({ message: "Logger name is required" }, { status: 400 });
	}

	if (!session || !userId) {
		return json({ message: "Not Authorized" }, { status: 401 });
	}

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return json({ message: "User not found" }, { status: 404 });
	}

	const logger = await prisma.logger.findFirst({
		where: {
			logger_name,
			user_id: userId,
		},
	});

	if (!logger) {
		return json({ message: "Logger not found" }, { status: 404 });
	}

	await prisma.logger.delete({
		where: {
			id: logger.id,
		},
	});

	return json({ message: `Logger ${logger_name} deleted` });
};
