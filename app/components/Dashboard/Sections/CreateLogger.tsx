import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

type FetcherData = {
	message: string;
};

export const CreateLogger = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const fetcher = useFetcher();
	const fetcherData = fetcher.data as FetcherData;

	useEffect(() => {
		if (fetcherData) {
			if (fetcherData.message) {
				setErrorMessage(fetcherData.message);
			}
		}
	}, [fetcherData]);

	return (
		<fetcher.Form
			method="POST"
			action="/create/logger"
			className="flex flex-col items-center justify-center gap-5 text-sm md:text-2xl"
		>
			{errorMessage && <h3 className="text-center">{errorMessage}</h3>}
			<label htmlFor="logger_name" className="text-center">
				Fill out the name of your application (must be unique)
			</label>
			<input
				className="border-2 rounded-md p-2 text-black"
				type="text"
				required
				name="logger_name"
				id="logger_name"
			/>
			<button type="submit" className="border-2 rounded-md p-1 w-40">
				create logger
			</button>
		</fetcher.Form>
	);
};
