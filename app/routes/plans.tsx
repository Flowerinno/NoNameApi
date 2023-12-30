import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { authenticateUser } from "~/server/auth/auth.server";
import { getPlans } from "~/server/db";
import { commitSession, getSession } from "~/server/session/session.server";
import { updateSubscription } from "~/server/subscription/subscription.server";

interface Plan {
	id: number;
	label: string;
	price: number;
	features: string[];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const isAuth = await authenticateUser(request);

	if (!isAuth) {
		return redirect("/login");
	}

	const plans = getPlans();

	return json({ plans });
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const res = await updateSubscription(request);

	if (res?.status !== 200) {
		return json({ ...res });
	}
	
	console.log(res);
	return redirect("/protected", {
		headers: {
			"Set-Cookie": await commitSession(
				res?.session
					? res.session
					: await getSession(request.headers.get("Cookie"))
			),
		},
	});
};

export default function Plans() {
	const { plans } = useLoaderData<typeof loader>();
	const data = useActionData<typeof action>();
	console.log(data);
	return (
		<Form
			method="post"
			className="min-h-screen flex items-center justify-around bg-green-50"
		>
			{plans.map((plan, i) => {
				return (
					<div
						className="flex flex-col items-center justify-center  text-3xl bg-gray-100 gap-5 rounded-xl p-5 border-2 border-blue-400 w-100"
						key={i}
					>
						<h1 className="text-4xl">{plan.label}</h1>
						<div className="flex flex-col items-start justify-center gap-5 p-5 border-1">
							{plan.features.map((feature) => {
								return <p key={feature}>{feature}</p>;
							})}
						</div>
						<button
							className="border-4 p-5 w-36 text-center rounded-md cursor-pointer hover:scale-110 hover:border-green-400 hover:text-blue-500"
							type="submit"
							value={plan.id}
							name="id"
						>
							{plan.price === 0 ? "Free" : plan.price}
						</button>
					</div>
				);
			})}
		</Form>
	);
}
