import { Logout } from "./Sections/Logout";
import { Profile } from "./Sections/Profile";
import { Settings } from "./Sections/Settings";
import { Support } from "./Sections/Support";

type SidebarLabels = "profile" | "settings" | "support" | "logout";

interface userData {
	userId?: string;
	name?: string;
	email?: string;
	apiKey?: string;
}

interface MainProps {
	section: string;
	userData?: userData;
}

export const ProfileMain = ({ section, userData }: MainProps) => {
	const presentSections = {
		profile: <Profile userData={userData} />,
		settings: <Settings />,
		support: <Support />,
		logout: <Logout />,
	} as const;
	return (
		<div className="w-full md:w-9/12 h-full flex flex-col items-center p-2">
			{presentSections[section as SidebarLabels]}
		</div>
	);
};
