import { Link } from "@remix-run/react";

import { Cards } from "./Cards/Cards";
import { E_Routes } from "~/types";

const links = [
	{
		name: "Logs",
		link: E_Routes.logs,
		class: "text-red-500",
	},
];

export const Introduce = () => {
	return (
		<div className="bg-gray-100 flex flex-col align-middle items-center justify-start gap-4 md:gap-6 text-sm md:text-2xl dark:bg-black dark:text-white max-w-4xl">
			<h1 className="bg-clip-text text-transparent text-4xl text-bold mb-5 self-start md:self-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-fade-right">
				FREE API FOREVER
			</h1>
			<div className="flex flex-col gap-5 md:gap-9 items-start">
				<p>
					<strong>No Name API </strong> is The Logger service for everyone and
					everywhere. You can use it for free without any limits.
				</p>
				<Cards />
				<div>
					Get various APIs that fit your needs with No Name API.{" "}
					<Link
						className="text-sm underline-offset-1 text-red-300"
						to={E_Routes.register}
					>
						sign up?
					</Link>
				</div>
				<div className="flex flex-col gap-3">
					<p>Currently available APIs:</p>
					<ul className=" dark:text-white flex flex-row flex-wrap gap-5">
						{links.map((item, i) => {
							return (
								<li key={i}>
									<Link className={item.class} to={item.link}>
										{item.name} ☜
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};
