import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
	userId: string;
	name: string;
	email: string;
	isSubscribed: boolean;
	apiKey: string;
	avatar?: string;
};

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData>({
		cookie: {
			name: "__session",
			maxAge: 60 * 60 * 24, //10 sec
			sameSite: "lax",
			secrets: [process.env.SESSION_SECRET as string],
			secure: process.env.NODE_ENV === "production" ? true : false,
		},
	});

export { getSession, commitSession, destroySession };
