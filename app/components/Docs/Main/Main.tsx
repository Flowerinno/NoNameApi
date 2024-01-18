import { Introduction, GettingStarted, Logs } from "./Sections";

interface Props {
	section: string;
	isSidebarOpen?: boolean;
}

const mocked = {
	getting_started: <GettingStarted />,
	logs: <Logs />,
	introduction: <Introduction />,
};

export const Main = ({ section, isSidebarOpen }: Props) => {
	if (isSidebarOpen) {
		return null;
	}

	return (
		<div className="flex flex-col items-center justify-start md:items-start min-h-screen w-full md:w-9/12 p-2">
			{mocked[section as keyof typeof mocked]}
		</div>
	);
};
