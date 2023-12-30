import { Link } from "@remix-run/react";

export const Introduce = () => {
	return (
		<div className="p-10 bg-gray-100 flex flex-col align-middle items-center justify-start min-h-screen text-sm md:text-2xl dark:bg-black dark:text-white">
			<h1 className="bg-clip-text text-transparent text-4xl mb-5 self-start bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
				Free API forever
			</h1>
			<p>
				No Name API is a free API service for everyone. You can use it for free
				without any limits.
			</p>
			<p>Get various APIs that fit your needs with No Name API</p>
			<Link to="/register"></Link>
		</div>
	);
};
