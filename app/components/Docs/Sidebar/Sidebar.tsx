//fetch links from db
import { SectionLink } from "./SectionLink/SectionLink";
import { Sections } from "./enums";
//mocked

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
		label: "analytics",
		value: Sections.analytics,
	},
	{
		label: "logs",
		value: Sections.logs,
	},
];

interface Props {
	activeSection: string;
}

export const Sidebar = ({ activeSection }: Props) => {
	return (
		<div className="min-h-screen rounded-md w-3/12 flex flex-col items-center justify-start p-2 md:gap-3 animate-ease-in-out">
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
