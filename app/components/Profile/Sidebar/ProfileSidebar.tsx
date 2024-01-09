import { Form, useSubmit } from "@remix-run/react";

//mocked
const sidebarItems = [
	{
		label: "profile",
		icon: "🏠",
		isActive: true,
	},
	{
		label: "settings",
		icon: "✎",
		href: "/profile/settings",
		isActive: false,
	},
	{
		label: "support",
		icon: "☎",
		href: "/profile/settings",
		isActive: false,
	},
	{
		label: "logout",
		icon: "❌",
		href: "/logout",
		isActive: false,
	},
];

interface SidebarProps {
	section: string;
}

export const ProfileSidebar = ({ section }: SidebarProps) => {
	const submit = useSubmit();

	const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
		submit(e.target as HTMLButtonElement, {
			method: "GET",
		});
	};

	return (
		<Form
			onSubmit={(e) => handleClick(e)}
			className="w-12/12 md:w-3/12 min-h-full flex flex-row flex-wrap items-center justify-center md:flex md:flex-col md:items-center md:justify-start md:border-r-2 border-black dark:border-white p-1"
		>
			{sidebarItems.map((item, index) => {
				return (
					<button
						className={`text-sm md:text-2xl flex flex-row items-start justify-start gap-2 hover:bg-gray-400 cursor-pointer p-2 rounded-md min-full md:w-36 dark:hover:bg-slate-400`}
						key={index}
						name="sidebar"
						value={item.label}
						type="submit"
					>
						<span>{item.icon}</span>
						<span
							className={`${
								section === item.label ? "underline" : "no-underline"
							}`}
						>
							{item.label}
						</span>
					</button>
				);
			})}
		</Form>
	);
};
