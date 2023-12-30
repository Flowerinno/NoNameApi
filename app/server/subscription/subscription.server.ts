import { User } from "@prisma/client";
import { prisma } from "../db/db.server";
import { getSession } from "../session/session.server";

export async function updateSubscription(request: Request) {
	const formData = await request.formData();
	const subscriptionId = formData.get("id") as number | null;

	if (!subscriptionId) {
		return;
	}

	const session = await getSession(request.headers.get("cookie"));
	const userId = session.get("userId");

	if (!userId) {
		return;
	}

	try {
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				isSubscribed: true,
			},
		});

		if (updatedUser) {
			await prisma.subscription.upsert({
				where: { userId },
				update: {
					updatedAt: new Date(),
					type: `${subscriptionId}`,
				},
				create: {
					userId,
					updatedAt: new Date(),
					type: `${subscriptionId}`,
				},
			});

			await commitUserSession(updatedUser);

			return {
				status: 200,
				message: "Subscription updated",
				session,
			};
		}

		return {
			status: 500,
			message: "Something went wrong",
		};
	} catch (error) {
		return {
			status: 500,
			message: "Something went wrong",
		};
	}
}

export async function cancelSubscription(user: User) {
	const subscription = await getSubscription(user);

	if (!subscription) return;

	const isSessionExpired =
		Date.now() - subscription.updatedAt.getTime() > 1000 * 60 * 60 * 24 * 30;

	if (isSessionExpired) {
		await prisma.user.update({
			where: { id: user.id },
			data: {
				isSubscribed: false,
			},
		});
	}
}

export const getSubscription = async (user: User) => {
	if (!user.isSubscribed) {
		return;
	}

	const subscription = await prisma.subscription.findFirst({
		where: { userId: user.id },
	});

	if (!subscription || !subscription.updatedAt) {
		return;
	}

	return subscription;
};

export const commitUserSession = async (user: User) => {
	const session = await getSession();

	session.set("userId", user.id);
	session.set("name", user.name);
	session.set("email", user.email);
	session.set("isSubscribed", user.isSubscribed);

	return session;
};
