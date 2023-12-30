import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Header, Introduce } from "~/components";
import { prisma } from "~/server/db/db.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "No Name Landing" },
		{ name: "description", content: "Welcome home!" },
	];
};

// export const loader = async ({ request }: LoaderFunctionArgs) => {
// };

export default function Index() {
	return (
		<>
			<Header />
			<Introduce />
		</>
	);
}
