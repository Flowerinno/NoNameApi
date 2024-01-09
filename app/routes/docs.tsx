import { Sidebar } from "~/components/Docs";
import { Main } from "~/components/Docs";

import { LoaderFunctionArgs, json, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { E_Routes } from "~/types";
import { MobileSidebar } from "~/components/Docs/Sidebar/MobileSidebar";
import { useEffect, useState } from "react";
import { Sections } from "~/components/Docs/Sidebar/enums";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const section = url.searchParams.get("section");

	return json({ section });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
	return json({ message: "Hello World" });
};

export default function Docs() {
	const [isMobile, setIsMobile] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const data = useLoaderData<typeof loader>();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsMobile(false);
			} else {
				setIsMobile(true);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Form className="flex flex-col items-center md:flex-row md:items-start justify-center w-full bg-gray-100  dark:bg-black dark:text-white">
			{isMobile ? (
				<MobileSidebar
					handleSidebar={handleSidebar}
					isOpen={isOpen}
					key={data?.section}
					activeSection={data?.section ?? E_Routes.docs}
				/>
			) : (
				<Sidebar activeSection={data?.section ?? E_Routes.docs} />
			)}
			<Main
				section={data?.section ?? Sections.introduction}
				isSidebarOpen={isOpen}
			/>
		</Form>
	);
}
