import { Form } from "@remix-run/react";

export const Logout = () => {
	return (
		<Form method="POST" className="w-full h-full">
			<div className="flex flex-col gap-10 items-center justify-center w-full h-full p-3">
				<h3>Are you sure you want to log out ?</h3>
				<button
					type="submit"
					className="border-2 border-black dark:border-white text-sm md:text-2xl p-2 rounded-md w-24 cursor-pointer hover:bg-red-700"
				>
					YES
				</button>
			</div>
		</Form>
	);
};
