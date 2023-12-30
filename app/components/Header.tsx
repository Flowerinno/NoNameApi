import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import darkMode from "../assets/svg/darkMode.svg";
import lightMode from "../assets/svg/lightMode.svg";

export const Header = () => {
	const [themeIcon, setThemeIcon] = useState("");
	const handleTheme = () => {
		if (typeof window !== "undefined") {
			const root = document.documentElement;
			const cache = window.localStorage.getItem("theme");
			if (cache) {
				root.classList.remove(cache === "dark" ? "light" : "dark");
				root.classList.add(cache);
				setThemeIcon(cache === "dark" ? lightMode : darkMode);
				window.localStorage.setItem(
					"theme",
					cache === "dark" ? "light" : "dark"
				);
				return;
			}
			const theme = root.classList.contains("dark") ? "light" : "dark";
			root.classList.remove(theme === "dark" ? "light" : "dark");
			root.classList.add(theme);
			setThemeIcon(theme === "dark" ? lightMode : darkMode);
			window.localStorage.setItem("theme", theme);
		}
	};

	useEffect(() => {
		handleTheme();
	}, []);

	return (
		<div className="bg-gray-100 flex flex-row align-middle justify-between w-full p-10 dark:bg-black dark:text-white">
			<Link
				to="/"
				className="flex items-center text-2xl p-1 md:text-4xl text-green-400 cursor-pointer border-transparent border-2 hover:border-green-400 hover:border-2 rounded-md hover:p-1"
			>
				LOGO
			</Link>
			<div className="flex flex-col align-middle justify-center md:flex md:flex-row md:align-middle md:justify-evenly md:gap-5 ">
				<button
					className="text-2xl md:text-4xl hover:scale-110 flex align-middle justify-center"
					onClick={handleTheme}
				>
					<img
						className="w-5 h-5 md:w-10 md:h-10 text-center"
						src={themeIcon}
						alt="theme"
					/>
				</button>
				<Link className="text-2xl md:text-4xl hover:scale-110" to="/login">
					sign in
				</Link>
				<Link className="text-2xl md:text-4xl hover:scale-110" to="/register">
					sign up
				</Link>
			</div>
		</div>
	);
};
