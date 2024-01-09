import { Sections } from "../Sidebar/enums";
import { Introduction } from "./Sections/Introduction";

interface Props {
	section: string;
	isSidebarOpen?: boolean;
}

const mocked = {
	getting_started: <div>Getting started</div>,
	logs: <div>Logs</div>,
	analytics: <div>Analytics</div>,
	
};

export const Main = ({ section, isSidebarOpen }: Props) => {
	if (isSidebarOpen) {
		return null;
	}

	if (section === Sections.introduction) {
		return <Introduction />;
	}

	return (
		<div className="flex flex-col items-center justify-start md:items-start min-h-screen w-full md:w-9/12 p-2">
			main
		</div>
	);
};
