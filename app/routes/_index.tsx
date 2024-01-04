import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node";
import { Description, Introduce } from "~/components";

export const meta: MetaFunction = () => {
	return [
		{ title: "No Name API" },
		{ name: "description", content: "Free API forever!" },
	];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const path = url.pathname;

	return json({ path });
};

export default function Index() {
	return (
		<div className="p-10 bg-gray-100 flex flex-col align-middle items-center justify-start gap-4 md:gap-6 text-sm md:text-2xl dark:bg-black dark:text-white">
			<div className="w-full flex flex-col gap-10">
				<Introduce />
				<Description />
			</div>
		</div>
	);
}
