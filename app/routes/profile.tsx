import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProfileMain, ProfileSidebar } from "~/components/Profile";
import { authenticateUser } from "~/server/auth/auth.server";
import { E_Routes } from "~/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const isAuth = await authenticateUser(request);

	if (!isAuth) {
		return redirect(E_Routes.login);
	}

	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);

	const section = params.get("sidebar");

	return json({ section });
};

export default function Profile() {
	const data = useLoaderData<typeof loader>();

	return (
		<div className="p-10 bg-gray-100 flex flex-col align-middle items-center justify-start gap-4 md:gap-6 min-h-screen text-sm md:text-2xl dark:bg-black dark:text-white w-full">
			<div className="border-black dark:border-white border-2 w-11/12  rounded-md flex flex-col md:flex md:flex-row">
				<ProfileSidebar section={data?.section ?? "profile"} />
				<ProfileMain section={data?.section ?? "profile"} />
			</div>
		</div>
	);
}
