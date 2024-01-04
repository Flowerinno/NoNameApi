import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "./session.server";
import { E_Routes } from "~/types";

export const parseSession = async (request: Request) => {
	const cookie = request.headers.get("Cookie");
	const session = await getSession(cookie);

	if (!session)
		redirect(E_Routes.home, {
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		});

	const { userId } = session.data;

	if (!userId)
		redirect(E_Routes.home, {
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		});

	return session;
};
