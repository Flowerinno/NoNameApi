import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/server/db/db.server";
import { E_Routes } from "~/types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const userId = params.userId;

	if (!userId) redirect(E_Routes.login, { status: 401 });

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user || user.isUserVerified) {
		redirect(E_Routes.login, { status: 401 });
	}

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			isUserVerified: true,
		},
	});

	return { isUpdated: updatedUser.isUserVerified };
};

export default function EmailVerification() {
	return (
		<>
			<div className="flex flex-row items-center justify-center gap-2 bg-gray-100 text-2xl min-h-screen md:text-4xl dark:bg-black dark:text-white">
				Your email is verified, enjoy using the API
			</div>
		</>
	);
}
