import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
	userId: string;
	name: string;
	email: string;
	apiKey: string;
};

export const sessionStorage = createCookieSessionStorage<SessionData>({
	cookie: {
		name: "__session",
		maxAge: 60 * 60 * 24, //10 sec
		sameSite: "lax",
		secrets: [process.env.SESSION_SECRET as string],
		secure: process.env.NODE_ENV === "production" ? true : false,
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;
