import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { SocialsProvider } from "remix-auth-socials";
import { commitUserSession } from "~/server/auth/auth.server";
import { authenticator } from "~/server/auth/strategy.server";
import { commitSession } from "~/server/session/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.authenticate(
		SocialsProvider.GOOGLE,
		request
	);

	if (user) {
		const session = await commitUserSession(user);
		return redirect("/", {
			status: 200,
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	return redirect("/login");
};

export default function AuthVerifyGoogleCallback() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/");
	}, []);

	return (
		<div className="bg-gray-100 flex flex-col align-middle items-center justify-start gap-4 md:gap-6 text-sm md:text-2xl dark:bg-black dark:text-white max-w-4xl min-h-screen"></div>
	);
}
