import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
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
		const { session, ...rest } = res;

		if (res.isError) {
			return json({ ...res, isError: true });
		}

		if (session)
			return json(rest, {
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
	const navigate = useNavigate();

	useEffect(() => {
		if (data && !data?.isError) {
			navigate(E_Routes.home, {
				replace: true,
			});
		}
	}, []);

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
