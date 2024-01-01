import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Header } from "~/components";
import { authenticateUser, loginUser } from "~/server/auth/auth.server";
import { commitSession } from "~/server/session/session.server";
import { E_Routes } from "~/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const isAuth = await authenticateUser(request);

	if (isAuth) {
		return redirect(E_Routes.home);
	}

	return json({ message: "Hello, world!" }, { status: 200 });
};

export const action = async ({ request }: ActionFunctionArgs) => {
	try {
		const res = await loginUser(request);

		if (res.status !== 200) {
			return json({ ...res });
		}

		return redirect(E_Routes.home, {
			headers: {
				"Set-Cookie": await commitSession(res.session),
			},
		});
	} catch (error) {
		return json({ message: error }, { status: 400 });
	}
};

export default function Login() {
	const data = useActionData<typeof action>();

	return (
		<>
			<Form
				method="post"
				className="flex flex-col items-center justify-center min-h-screen text-4xl bg-gray-100 gap-5 dark:bg-black dark:text-white w-full"
			>
				<input
					className="text-2xl p-2 rounded-xl dark:text-black w-11/12 md:w-4/12 md:text-4xl"
					name="email"
					type="text"
					placeholder="email"
					required
				/>
				<div className="text-2xl rounded-xl dark:text-black w-11/12 md:w-4/12 md:text-4xl">
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
					className="text-2xl rounded-xl border-2 p-2 w-40 md:text-4xl"
				>
					login
				</button>
			</Form>
		</>
	);
}
