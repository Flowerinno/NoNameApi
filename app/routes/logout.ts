import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/server/session/session.server";

import { E_Routes } from "~/types";

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));

	return redirect(E_Routes.home, {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
};
