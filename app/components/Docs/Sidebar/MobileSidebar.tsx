import { useState } from "react";
import { SectionLink } from "./SectionLink/SectionLink";
import { Sections } from "./enums";

const links = [
	{
		label: "introduction",
		value: Sections.introduction,
	},
	{
		label: "getting started",
		value: Sections.getting_started,
	},
	{
		label: "logs",
		value: Sections.logs,
	},
];

interface Props {
	activeSection: string;
	handleSidebar: () => void;
	isOpen: boolean;
}

export const MobileSidebar = ({
	activeSection,
	handleSidebar,
	isOpen,
}: Props) => {
	if (!isOpen) {
		return (
			<div
				className={`${
					isOpen && "min-h-screen"
				} rounded-md w-full flex flex-col items-center justify-start p-2`}
			>
				<button
					className="text-sm md:text-2xl p-2 border-2 rounded-md hover:bg-slate-500 w-full"
					onClick={handleSidebar}
				>
					menu
				</button>
			</div>
		);
	}

	return (
		<div
			className={`rounded-md w-full flex flex-col items-center justify-start p-2 gap-2 z-50 transition-all ${
				isOpen && "min-h-screen"
			}`}
		>
			<div className="rounded-md w-full flex flex-col items-center justify-start">
				<button
					className="text-sm md:text-2xl p-2 border-2 rounded-md hover:bg-slate-500 w-full"
					onClick={handleSidebar}
				>
					menu
				</button>
			</div>
			{links.map((link, index) => {
				return (
					<SectionLink
						value={link.value}
						key={index}
						title={link.label}
						activeSection={activeSection}
					/>
				);
			})}
		</div>
	);
};
