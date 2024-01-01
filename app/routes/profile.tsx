import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProfileMain, ProfileSidebar } from "~/components/Profile";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);

	const section = params.get("sidebar");

	return json({ section });
};

type SidebarLabels = "profile" | "settings" | "support" | "logout";
const presentLabels = ["profile", "settings", "support", "logout"] as const;

export default function Profile() {
	const data = useLoaderData<typeof loader>();
	let section = data?.section;

	if (!section || !presentLabels.includes(section as SidebarLabels)) {
		section = "profile";
	}

	return (
		<div className="p-10 bg-gray-100 flex flex-col align-middle items-center justify-start gap-4 md:gap-6 min-h-screen text-sm md:text-2xl dark:bg-black dark:text-white w-full">
			<div className="border-black dark:border-white border-2 w-11/12  rounded-md flex flex-col md:flex md:flex-row">
				<ProfileSidebar section={section} />
				<ProfileMain section={section} />
			</div>
		</div>
	);
}
