import { json, ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/server/db/db.server";
import { getSession } from "~/server/session/session.server";

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));

	return json({
		message: "something went wrong",
	});
};
