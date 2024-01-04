import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { authenticateUser, registerUser } from "~/server/auth/auth.server";
import { commitSession } from "~/server/session/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await authenticateUser(request);

	if (userId) {
		return redirect(`/verify/${userId}`);
	}

	return json({ message: "Hello, world!" }, { status: 200 });
};

export async function action({ request }: ActionFunctionArgs) {
	const res = await registerUser(request);

	const { session, ...rest } = res;

	if (session) {
		return json(
			{ userId: session.get("userId"), ...rest },
			{
				headers: {
					"Set-Cookie": await commitSession(res.session),
				},
			}
		);
	}

	return json({ ...res, userId: null });
}

export default function Signup() {
	const fetcher = useFetcher<typeof action>();
	const [errors, setErrors] = useState("");
	const data = fetcher.data;

	useEffect(() => {
		if (data?.status && data?.status !== 201) {
			setErrors("Something went wrong");
		}
	}, [data?.status]);

	if (data?.status === 201) {
		return (
			<>
				<div className="flex flex-col items-center justify-center min-h-screen text-2xl md:text-4xl dark:bg-black dark:text-white gap-5 p-3">
					<h1>You have successfully registered</h1>
					<div>
						Please verify your email by clicking{" "}
						<Link
							className="text-2xl md:text-4xl text-blue-500"
							to={`/verify/${data?.userId}`}
						>
							the link
						</Link>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<fetcher.Form
				method="post"
				className="text-2xl flex flex-col items-center justify-center min-h-screen md:text-4xl bg-gray-100 gap-5  dark:bg-black dark:text-white"
			>
				{errors && <p className="text-red-500">{errors}</p>}
				<input
					className="p-2 rounded-xl dark:text-black w-11/12 md:w-4/12"
					name="name"
					type="text"
					placeholder="name"
				/>
				<input
					className="p-2 rounded-xl dark:text-black w-11/12 md:w-4/12"
					name="email"
					type="text"
					placeholder="email"
					required
				/>
				<input
					className="p-2 rounded-xl dark:text-black w-11/12 md:w-4/12"
					name="password"
					type="text"
					placeholder="password"
					required
				/>
				<button
					type="submit"
					onClick={() => setErrors("")}
					className="rounded-xl border-2 p-2 w-40"
				>
					register
				</button>
			</fetcher.Form>
		</>
	);
}
