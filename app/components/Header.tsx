import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import darkMode from "../assets/svg/darkMode.svg";
import lightMode from "../assets/svg/lightMode.svg";
import { getSession } from "~/utils";

export const Header = () => {
	const [themeIcon, setThemeIcon] = useState("");

	const isAuthenticated = getSession();

	const handleTheme = (isClicked: boolean = false) => {
		if (typeof window !== "undefined") {
			const root = document.documentElement;
			const cache = window.localStorage.getItem("theme");

			if (cache) {
				root.classList.add(cache);
				setThemeIcon(cache === "dark" ? lightMode : darkMode);
				if (!isClicked) return;
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

	const styles = {
		link: "text-sm md:text-2xl hover:scale-110",
	};

	return (
		<div className="bg-gray-100 flex flex-row align-middle justify-between w-full p-10 dark:bg-black dark:text-white">
			<Link
				to="/"
				className="flex items-center text-sm p-1 md:text-2xl text-pink-500 cursor-pointer border-transparent border-2 hover:border-pink-500 hover:border-2 rounded-md hover:p-1"
			>
				NNA
			</Link>
			<div className="flex flex-row items-center justify-evenly gap-2 md:gap-5 ">
				<button
					className="text-sm md:text-2xl hover:scale-110 flex align-middle justify-center"
					onClick={() => handleTheme(true)}
				>
					<img
						className="w-5 h-5 md:w-10 md:h-10 text-center"
						src={themeIcon}
						alt="theme"
					/>
				</button>
				<Link className={styles.link} to="/docs">
					docs
				</Link>
				{!isAuthenticated && (
					<>
						<Link className={styles.link} to="/login">
							sign in
						</Link>
						<Link className={styles.link} to="/register">
							sign up
						</Link>
					</>
				)}
			</div>
		</div>
	);
};
