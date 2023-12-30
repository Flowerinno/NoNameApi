import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticateUser } from "~/server/auth/auth.server";
import { getSession } from "~/server/session/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const isAuth = await authenticateUser(request);

	if (!isAuth) {
		return redirect("/login");
	}

	const session = await getSession(request.headers.get("Cookie"));
	const subscription = session.get("isSubscribed");

	if (!subscription) {
		return redirect("/plans");
	}

	return json({ message: "Hello, world!" }, { status: 200 });
};

export default function Protected() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-4xl bg-gray-100">
			TEST
		</div>
	);
}
