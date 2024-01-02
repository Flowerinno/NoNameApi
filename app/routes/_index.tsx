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
		<>
			<Introduce />
			<Description />
		</>
	);
}
