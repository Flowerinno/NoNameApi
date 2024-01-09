import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { authenticateUser, loginUser } from "~/server/auth/auth.server";
import { commitSession } from "~/server/session/session.server";
import { E_Routes } from "~/types";
import googleBtn from "../assets/images/google.png";
import { SocialsProvider } from "remix-auth-socials";
import { Social } from "~/components";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const isAuth = await authenticateUser(request);
	console.log(isAuth);
	if (isAuth) {
		return redirect(E_Routes.home);
	}

	return json({ message: "Hello, world!" }, { status: 200 });
};

export const action = async ({ request }: ActionFunctionArgs) => {
	try {
		const res = await loginUser(request);
		const { session, ...rest } = res;

		if (res.isError) {
			return json({ ...res, isError: true });
		}

		if (session)
			return redirect(E_Routes.home, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
	} catch (error) {
		return json({ message: error, isError: true }, { status: 400 });
	}
};

export default function Login() {
	const data = useActionData<typeof action>();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="flex flex-row items-center justify-center w-full bg-gray-100  dark:bg-black dark:text-white gap-5 p-2">
				<Social provider="google" />
				<Social provider="github" />
			</div>
			<Form
				method="POST"
				className="flex flex-col items-center flex-1  justify-start text-sm md:text-2xl bg-gray-100 gap-5 dark:bg-black dark:text-white w-full p-5"
			>
				{typeof data?.message === "string" && (
					<h3 className="p-2 h-10 text-2xl rounded-xl dark:text-white">
						{data?.message}
					</h3>
				)}
				<input
					className="text-2xl p-2 rounded-xl dark:text-black w-11/12 md:w-4/12"
					name="email"
					type="text"
					placeholder="email"
					required
				/>
				<div className="text-2xl rounded-xl dark:text-black w-11/12 md:w-4/12">
					<input
						className="outline-none p-2 rounded-xl dark:text-black w-full"
						name="password"
						type="text"
						placeholder="password"
						required
					/>
				</div>
				<button
					type="submit"
					name="intent"
					value="form"
					className="text-2xl rounded-xl border-2 p-2 w-40"
				>
					login
				</button>
			</Form>
		</div>
	);
}
