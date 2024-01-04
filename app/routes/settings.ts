import { json, ActionFunctionArgs } from "@remix-run/node";
import { parseSession } from "~/server/session/utils";
import { prisma } from "~/server/db/db.server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { commitUserSession } from "~/server/auth/auth.server";
import { commitSession } from "~/server/session/session.server";

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const session = await parseSession(request);

	if (!session) {
		return json({ message: "Not authorized" });
	}
	const userId = session.get("userId");
	const formData = await request.formData();
	const isKeyShouldBeUpdated = formData.get("isKeyShouldBeUpdated");
	const password = formData.get("password") as string;

	if (isKeyShouldBeUpdated === "true") {
		await prisma.user.update({
			where: { id: userId },
			data: { apiKey: uuidv4() },
		});
	}

	if (password) {
		const hash = await bcrypt.hash(password, 10);
		await prisma.user.update({
			where: { id: userId },
			data: { password: hash },
		});
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!user) {
		return json({ message: "Not authorized" });
	}

	const newSession = await commitUserSession(user);

	return json(
		{ message: "Updated the profile" },
		{
			headers: {
				"Set-Cookie": await commitSession(newSession),
			},
		}
	);
};
