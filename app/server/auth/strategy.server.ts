import {
	GoogleStrategy,
	GitHubStrategy,
	SocialsProvider,
} from "remix-auth-socials";
import { prisma } from "../db/db.server";
import { Authenticator } from "remix-auth";
import { User } from "@prisma/client";
import { sessionStorage } from "../session/session.server";

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			callbackURL:
				process.env.NODE_ENV === "production"
					? (process.env.GOOGLE_CALLBACK_URL_PROD as string)
					: (process.env.GOOGLE_CALLBACK_URL as string),
		},
		async ({ accessToken, refreshToken, extraParams, profile }) => {
			const user = await prisma.user.findUnique({
				where: {
					email: profile.emails[0].value,
				},
			});

			if (user) {
				return user;
			}

			return await prisma.user.upsert({
				where: {
					email: profile.emails[0].value,
				},
				update: {
					name: profile.displayName,
					email: profile.emails[0].value,
					google_id: profile.id,
					is_user_verified: true,
				},
				create: {
					name: profile.displayName,
					email: profile.emails[0].value,
					google_id: profile.id,
					is_user_verified: true,
				},
			});
		}
	),
	SocialsProvider.GOOGLE
);

let gitHubStrategy = new GitHubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID as string,
		clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		callbackURL:
			process.env.NODE_ENV === "production"
				? (process.env.GITHUB_CALLBACK_URL_PROD as string)
				: (process.env.GITHUB_CALLBACK_URL as string),
	},
	async ({ accessToken, extraParams, profile }) => {
		const user = await prisma.user.findUnique({
			where: {
				email: profile.emails[0].value,
			},
		});

		if (user) {
			return user;
		}

		return await prisma.user.upsert({
			where: {
				email: profile.emails[0].value,
			},
			update: {
				name: profile.displayName,
				email: profile.emails[0].value,
				github_id: profile.id,
				is_user_verified: true,
			},
			create: {
				name: profile.displayName,
				email: profile.emails[0].value,
				github_id: profile.id,
				is_user_verified: true,
			},
		});
	}
);

authenticator.use(gitHubStrategy, SocialsProvider.GITHUB);
