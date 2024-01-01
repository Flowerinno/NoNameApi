import { Link } from "@remix-run/react";

const links = [
	{
		name: "home",
		path: "/",
	},
	{
		name: "about",
		path: "/about",
	},
	{
		name: "contact",
		path: "/contact",
	},
	{
		name: "login",
		path: "/login",
	},
	{
		name: "register",
		path: "/register",
	},
];

export const Footer = () => {
	return (
		<div className="flex flex-col items-center justify-center p-5 md:flex md:flex-row md:items-center md:justify-around dark:bg-gray-950">
			<div className="p-6 flex flex-wrap w-56 gap-3 dark:text-white ">
				{links.map((link) => {
					return (
						<Link className=" w-20 underline " to={link.path} key={link.name}>
							{link.name}
						</Link>
					);
				})}
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
