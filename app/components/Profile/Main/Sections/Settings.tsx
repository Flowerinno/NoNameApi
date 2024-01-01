import { Form } from "@remix-run/react";
import { useState } from "react";

const options = [
	{
		label: "set avatar",
		value: "avatar",
	},
	{
		label: "update API key",
		value: "api",
	},
	{
		label: "change password",
		value: "password",
	},
	{
		label: "delete account",
		value: "delete",
	},
];
export const Settings = () => {
	//TODO add user avatar
	const [avatar, setAvatar] = useState("");
	const [isKeyShouldBeUpdated, setIsKeyShouldBeUpdated] = useState(false);

	const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const img = e.target.files?.[0];
		if (!img) return;
		setAvatar(img.name);
	};

	const styles = {
		li: "w-full flex flex-col items-start border-2 border-black dark:border-white p-2 rounded-sm",
		button:
			"hover:text-green-500 hover:border-2 hover:border-green-500 p-1 rounded-md",
	};

	return (
		<Form className="flex flex-col items-center justify-center gap-5">
			<ul className="flex flex-col items-start justify-center gap-5 p-3">
				<li className={styles.li}>
					<label htmlFor="avatar">change avatar</label>
					<input
						className=" rounded-md w-full p-1"
						type="file"
						accept="image/png, image/jpeg, image/jpg"
						onChange={(e) => handleAvatarUpload(e)}
					/>
				</li>
				<li className="w-full flex flex-row items-center justify-between border-2 border-black dark:border-white p-2 rounded-sm">
					<label htmlFor="isKeyShouldBeUpdated">update api key</label>
					<input
						name="isKeyShouldBeUpdated"
						type="checkbox"
						checked={isKeyShouldBeUpdated}
						value={isKeyShouldBeUpdated.toString()}
						onChange={() => setIsKeyShouldBeUpdated(!isKeyShouldBeUpdated)}
					/>
				</li>
				<li className={styles.li}>
					<label htmlFor="password">change password</label>
					<input
						name="password"
						className="border-2 border-black bg-black text-black dark:text-white dark:border-white rounded-md w-full"
						type="text"
					/>
				</li>
				<li className={styles.li}>
					<button
						className="text-red-500"
						name="delete"
						type="button"
						onClick={() =>
							confirm(
								"You are about to delete your account, press OK to confirm"
							)
						}
					>
						delete my account TODO
					</button>
				</li>
			</ul>
			<button className="hover:text-green-500 hover:border-2 hover:border-green-500 p-1 rounded-md">
				save
			</button>
		</Form>
	);
};
