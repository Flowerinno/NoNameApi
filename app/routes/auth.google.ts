import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/server/auth/strategy.server";
import { SocialsProvider } from "remix-auth-socials";

export const action = async ({ request }: ActionFunctionArgs) => {
	return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
		successRedirect: "/",
		failureRedirect: "/login",
	});
};
