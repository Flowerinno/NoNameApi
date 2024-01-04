import { Link } from "@remix-run/react";
import { E_Routes } from "~/types";

export const Description = () => {
	return (
		<div className="bg-gray-100 flex flex-col align-middle items-center justify-start gap-5 md:gap-10 text-sm md:text-2xl dark:bg-black dark:text-white">
			<div className=" bg-gray-100 flex flex-col items-start justify-start md:items-center gap-5 md:gap-10  text-sm md:text-2xl dark:bg-black dark:text-white">
				<h3 className="animate-fade-up md:self-center w-11/12 md:w-9/12">
					No Name API is designed to empower developers with a versatile and
					user-friendly interface. Whether you're building web applications,
					mobile apps, or any other digital project, our API service provides
					the tools you need to streamline your development process.
				</h3>

				<ul className="flex flex-row flex-wrap  md:justify-center gap-5 md:gap-20 animate-fade-down w-fit">
					<li className="w-full md:w-56">
						Simplicity: Our API is designed with simplicity in mind. Integrate
						easily and focus on what matters most – building exceptional
						applications.
					</li>
					<li className="w-full md:w-56">
						Reliability: No Name API ensures high availability and reliability,
						so you can trust your applications to perform consistently.
					</li>
					<li className="w-full md:w-56">
						Community Support: Join a vibrant community of developers using No
						Name API. Share experiences, ask questions, and collaborate to
						enhance your development journey.
					</li>
				</ul>
				<Link
					to={E_Routes.register}
					className="text-sm underline-offset-1 text-red-300"
				>
					maybe sign up here?
				</Link>
			</div>
		</div>
	);
};
