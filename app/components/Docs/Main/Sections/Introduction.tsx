import { Link } from "@remix-run/react";
import { E_Routes } from "~/types";

const links = [
	{
		label: "getting started",
		value: E_Routes.getting_started,
	},
	{
		label: "logs",
		value: E_Routes.logs,
	},
];

export const Introduction = () => {
	return (
		<div className="flex flex-col items-start min-h-screen w-11/12 p-2 gap-2 text-sm md:text-2xl">
			<h3 className="font-bold text-4xl">NO NAME API</h3>
			<p>Simple and Free Logger for your needs. Idk what to put here so...</p>
			<p className="text-sm">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
				incidunt provident dolorem reprehenderit, accusantium ipsum nam ab aut
				laboriosam illum similique. Qui, officiis natus nemo impedit dolores
				asperiores rem odit.
			</p>
			<p className="text-sm">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
				incidunt provident dolorem reprehenderit, accusantium ipsum nam ab aut
				laboriosam illum similique. Qui, officiis natus nemo impedit dolores
				asperiores rem odit.
			</p>
			<p className="text-sm">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
				incidunt provident dolorem reprehenderit, accusantium ipsum nam ab aut
				laboriosam illum similique. Qui, officiis natus nemo impedit dolores
				asperiores rem odit. Lorem ipsum dolor, sit amet consectetur adipisicing
				elit. Ducimus praesentium voluptatem sequi est. Quis a, vero
				exercitationem at explicabo adipisci quod expedita! Maxime asperiores
				modi odit tenetur vero velit neque necessitatibus, commodi enim
				quibusdam.
			</p>
			<p className="text-sm">Lorem ipsum dolor sit amet.</p>
			<br />
			<div className="flex flex-row justify-center items-center flex-wrap gap-5">
				{links.map((link, index) => {
					return (
						<Link
							className="border-2 p-1 rounded-md w-44 text-center hover:border-red-400"
							to={link.value}
							key={index}
						>
							<h4>{link.label}</h4>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
