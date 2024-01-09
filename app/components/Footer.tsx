import { Link } from "@remix-run/react";
import { E_Routes } from "~/types";

const links = [
	{
		name: "home",
		path: E_Routes.home,
	},
	{
		name: "about",
		path: E_Routes.about,
	},
	{
		name: "contact",
		path: E_Routes.contact,
	},
	{
		name: "login",
		path: E_Routes.login,
	},
	{
		name: "register",
		path: E_Routes.register,
	},
	{
		name: "docs",
		path: E_Routes.docs,
	},
	{
		name: "privacy",
		path: E_Routes.privacy,
	},
	{
		name: "terms",
		path: E_Routes.terms,
	},
];

export const Footer = () => {
	return (
		<div className="flex flex-col items-center justify-center p-5 md:flex md:flex-row md:items-center md:justify-around dark:bg-gray-950 gap-5">
			<div className="flex flex-col items-start justify-start gap-5">
				<div className="flex flex-wrap w-72 gap-2 dark:text-white ">
					{links.map((link) => {
						return (
							<Link className="w-20 underline" to={link.path} key={link.name}>
								{link.name}
							</Link>
						);
					})}
				</div>
			</div>
			<div className="dark:text-white">
				<a
					className=" text-fuchsia-200 dark:text-fuchsia-800 animate-pulse "
					target="_blank"
					href="https://www.linkedin.com/in/aleksandr-kononov-56b804222/"
				>
					By Aleksandr Kononov from UA
				</a>
				<p className="text-center">© 2024 No Name API</p>
			</div>
		</div>
	);
};
