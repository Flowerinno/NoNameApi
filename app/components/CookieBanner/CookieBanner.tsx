import { useLocation, useNavigate } from "@remix-run/react";

export const CookieBanner = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const url = location.pathname;

	if (typeof window !== "undefined") {
		const isAgreed = window.localStorage.getItem("isAgreed");
		if (isAgreed === "true") return null;
	}

	const handleAgreement = (bool: boolean) => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("isAgreed", bool.toString());
			navigate(url, { replace: true, preventScrollReset: true });
		}
	};

	return (
		<div className="animate-fade-up bg-gray-500 text-yellow-50 w-11/12 md:w-8/12 z-50 p-4 md:p-10 absolute right-5 bottom-5 text-2xl md:text-4xl dark:bg-slate-500 dark:text-white flex flex-col items-center justify-around gap-5 rounded-md">
			<p className="text-sm md:text-2xl p-0 m-0">
				We use tracking cookies to understand how you use the product and help
				us improve it. Please accept cookies to help us improve.
			</p>
			<div className="flex flex-row justify-around gap-4 md:gap-10 text-sm md:text-2xl">
				<button
					className="border-2 outline-none p-2 rounded-md"
					type="button"
					onClick={() => handleAgreement(true)}
				>
					Accept cookies
				</button>
				<button
					className="border-2 outline-none p-2 rounded-md"
					type="button"
					onClick={() => handleAgreement(false)}
				>
					Decline cookies
				</button>
			</div>
		</div>
	);
};
