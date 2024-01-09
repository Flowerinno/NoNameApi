interface userData {
	userId?: string;
	name?: string;
	email?: string;
	apiKey?: string;
}

interface ProfileProps {
	userData?: userData;
}

const styles = {
	li: "w-full flex md:flex-row md:items-center gap-2 justify-between border-2 border-black dark:border-white p-2 rounded-sm cursor-pointer flex-col items-start",
};

export const Profile = ({ userData }: ProfileProps) => {
	const copy = async () => {
		await navigator.clipboard.writeText(userData?.apiKey ?? "");
		alert("copied to clipboard");
	};

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<ul className="flex flex-col items-start justify-center gap-5 p-3">
				<li className={styles.li}>
					<span>name</span>
					<span className="font-bold">{userData?.name}</span>
				</li>
				<li className={styles.li}>
					<span>email</span>
					<span className="font-bold">{userData?.email}</span>
				</li>
				<li className="w-full flex flex-col items-start justify-between border-2 border-black dark:border-white p-2 rounded-sm cursor-pointer">
					<span>api key (click to copy)</span>
					<span
						onClick={() => copy()}
						className="align-middle underline underline-offset-8 text-red-700"
					>
						{userData?.apiKey}
					</span>
				</li>
			</ul>
		</div>
	);
};
