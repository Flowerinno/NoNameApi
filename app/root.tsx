import {
	json,
	MetaFunction,
	type LinksFunction,
	type LoaderFunctionArgs,
} from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";
import { authenticateUser } from "./server/auth/auth.server";
import { Footer } from "./components/Footer";
import { CookieBanner, Header } from "./components";

import errorPage from "./assets/images/errorPage.png";

export const meta: MetaFunction = () => {
	return [{ title: "No name other" }];
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{
		rel: "text/javascript",
		href: "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js",
	},
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com",
	},
	{ rel: "preconnect", href: "https://fonts.gstatic.com" },
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap",
	},
	{
		rel: "icon",
		type: "image/x-icon",
		href: "/public/favicon.ico",
	},
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const isAuth = authenticateUser(request);

	if (!isAuth) {
		return json({ isAuth: false });
	}
	return null;
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
	return (
		<html style={{ minHeight: "100vh" }}>
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body style={{ minHeight: "100vh" }}>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Header />
					<img
						style={{ height: "100vh", objectFit: "contain" }}
						src={errorPage}
						alt="error page"
					/>
					<Footer />
				</div>
				<Scripts />
			</body>
		</html>
	);
};

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<Meta />
				<Links />
			</head>
			<body style={{ position: "relative" }}>
				<CookieBanner />
				<Outlet />
				<Footer />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
