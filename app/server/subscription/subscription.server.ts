import { User } from "@prisma/client";
import { getSession } from "../session/session.server";

export const commitUserSession = async (user: User) => {
	const session = await getSession();

	session.set("userId", user.id);
	session.set("name", user.name);
	session.set("email", user.email);
	session.set("isSubscribed", user.isSubscribed);

	return session;
};
