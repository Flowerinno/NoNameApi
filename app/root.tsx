import {
	json,
	MetaFunction,
	type LinksFunction,
	type LoaderFunctionArgs,
} from "@remix-run/node";
import {
	Link,
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
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap",
	},
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const isAuth = authenticateUser(request);

	if (!isAuth) {
		return json({ isAuth: false });
	}
	return null;
};

// export const ErrorBoundary = ({ error }: { error: Error }) => {
// 	return (
// 		<>
// 			<Header />
// 			<div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen text-2xl md:text-4xl gap-5 dark:bg-black dark:text-white">
// 				<h1 className="">Something went wrong</h1>
// 				<p className="">Please try again later</p>
// 				<Link className="no-underline" to="/">
// 					Go back to home
// 				</Link>
// 			</div>
// 		</>
// 	);
// };

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
