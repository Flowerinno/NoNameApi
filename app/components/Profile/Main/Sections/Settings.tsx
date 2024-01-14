import { useFetcher, useSubmit } from "@remix-run/react";
import { useState } from "react";

export const Settings = () => {
	const submit = useSubmit();
	const fetcher = useFetcher();
	const [isKeyShouldBeUpdated, setIsKeyShouldBeUpdated] = useState(false);

	const styles = {
		li: "w-full flex flex-col items-start gap-1 border-2 border-black dark:border-white p-2 rounded-sm",
		button:
			"hover:text-green-500 hover:border-2 hover:border-green-500 p-1 rounded-md",
	};

	const deleteHanlder = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = confirm(
			"You are about to delete your account, press OK to confirm"
		);

		if (response) {
			submit(e.currentTarget, {
				method: "POST",
				action: "/delete",
			});
		}
	};

	const data = fetcher.data as { message: string };
	return (
		<>
			{fetcher.data && <h2 className="font-bold">{data.message}</h2>}
			<fetcher.Form
				action="/settings"
				method="POST"
				className="flex flex-col items-center justify-center gap-5 w-full"
			>
				<ul className="flex flex-col items-start justify-center gap-5 p-3 w-8/12">
					<li
						className="w-full flex flex-row items-center justify-between border-2 border-black dark:border-white p-2 rounded-sm cursor-pointer"
						onClick={() => setIsKeyShouldBeUpdated(!isKeyShouldBeUpdated)}
					>
						<span className="cursor-pointer">update api key</span>
						<input
							name="isKeyShouldBeUpdated"
							type="checkbox"
							onChange={() => null}
							checked={isKeyShouldBeUpdated}
							value={isKeyShouldBeUpdated.toString()}
						/>
					</li>
					<li className={styles.li}>
						<label htmlFor="password">change password</label>
						<input
							name="password"
							className="border-2 border-black bg-black text-black dark:text-white dark:border-white rounded-md w-full p-1"
							type="text"
							placeholder="new password"
						/>
					</li>
				</ul>

				<button
					className="border-2 border-transparent hover:text-green-500 hover:border-2 hover:border-green-500 p-1 rounded-md w-24"
					type="submit"
				>
					save
				</button>
			</fetcher.Form>
			<fetcher.Form
				onSubmit={(e) => {
					deleteHanlder(e);
				}}
			>
				<button className="text-red-500 p-1" name="delete" type="submit">
					delete my account
				</button>
			</fetcher.Form>
		</>
	);
};
