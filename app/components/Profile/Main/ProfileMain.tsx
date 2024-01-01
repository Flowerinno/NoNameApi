import { Logout } from "./Sections/Logout";
import { Settings } from "./Sections/Settings";
import { Support } from "./Sections/Support";

type SidebarLabels = "profile" | "settings" | "support" | "logout";

interface MainProps {
	section: string;
}

const presentSections = {
	profile: "Profile",
	settings: <Settings />,
	support: <Support />,
	logout: <Logout />,
} as const;

export const ProfileMain = ({ section }: MainProps) => {
	return (
		<div className="w-full md:w-9/12 h-full flex flex-col items-center p-2">
			{presentSections[section as SidebarLabels]}
		</div>
	);
};
