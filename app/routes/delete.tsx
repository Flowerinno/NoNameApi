import { json, redirect, ActionFunctionArgs } from "@remix-run/node";
import Cookies from "js-cookie";
import { prisma } from "~/server/db/db.server";
import { destroySession, getSession } from "~/server/session/session.server";
import { E_Routes } from "~/types";

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const cookie = request.headers.get("Cookie");
	const session = await getSession(cookie);

	if (!session) {
		return redirect(E_Routes.home);
	}

	const userId = session.get("userId");

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return redirect(E_Routes.home, {
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		});
	}

	await prisma.logger.deleteMany({
		where: {
			user_id: userId,
		},
	});

	await prisma.user.delete({
		where: {
			id: userId,
		},
	});

	return json(
		{ message: "Account deleted" },
		{
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		}
	);
};

export default function Delete() {
	Cookies.remove("__session");
	return (
		<div className="text-dark text-2xl md:text-4xl min-h-screen flex flex-row justify-center p-3 dark:bg-black dark:text-white">
			Your account have been deleted
		</div>
	);
}
