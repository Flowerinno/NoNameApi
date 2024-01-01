import { Link } from "@remix-run/react";

import { Cards } from "./Cards/Cards";
import { E_Routes } from "~/types";

export const Introduce = () => {
	return (
		<div className="p-10 bg-gray-100 flex flex-col align-middle items-center justify-start gap-4 md:gap-6 min-h-screen text-sm md:text-2xl dark:bg-black dark:text-white">
			<h1 className="bg-clip-text text-transparent text-4xl mb-5 self-start md:self-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
				Free API forever
			</h1>
			<div className="flex flex-col gap-5 md:gap-9 items-start">
				<p>
					No Name API is a free service for everyone. You can use it for free
					without any limits.
				</p>
				<Cards />
				<p>
					Get various APIs that fit your needs with No Name API.{" "}
					<Link
						className="text-sm underline-offset-1 text-red-300"
						to={E_Routes.register}
					>
						sign up?
					</Link>
				</p>
				<div>
					<p className="text-green-900">Currently available APIs:</p>
					<ul className="p-3 dark:text-white">
						<li>
							-{" "}
							<Link className="text-purple-400" to={E_Routes.analytics}>
								Analytics ☜
							</Link>
						</li>
						<li>
							-{" "}
							<Link className="text-red-500" to={E_Routes.logs}>
								Logs ☜
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
