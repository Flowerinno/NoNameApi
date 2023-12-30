import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useLoaderData } from "react-router";
import { Header } from "~/components";
import { prisma } from "~/server/db/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	// const userId = params.userId;

	// if (!userId) redirect("/login", { status: 401 });

	// const user = await prisma.user.findUnique({
	// 	where: {
	// 		id: userId,
	// 	},
	// });

	// if (!user || user.isUserVerified) {
	// 	redirect("/login", { status: 401 });
	// }

	// const updatedUser = await prisma.user.update({
	// 	where: {
	// 		id: userId,
	// 	},
	// 	data: {
	// 		isUserVerified: true,
	// 	},
	// });

	// return { isUpdated: updatedUser.isUserVerified };
	return { isUpdated: true };
};

export default function EmailVerification() {
	const data = useLoaderData();

	return (
		<>
			<Header />
			<div className="bg-gray-100 text-2xl md:text-4xl dark:bg-black dark:text-white">
				Your email is verified now, you can{" "}
				<Link style={{ cursor: "pointer", color: "blue" }} to="/login">
					login
				</Link>
			</div>
		</>
	);
}
