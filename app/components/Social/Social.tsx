import { Form } from "@remix-run/react";
import googleLogo from "../../assets/images/google.png";
import githubWhiteLogo from "../../assets/images/github-white.png";

type currentProviders = "google" | "github";

interface SocialProps {
	provider: currentProviders;
}

const Logos = {
	google: googleLogo,
	github: githubWhiteLogo,
};

export const Social = ({ provider }: SocialProps) => {

	return (
		<Form
			action={`/auth/${provider}`}
			className="flex flex-col items-center justify-center text-2xl bg-gray-100  dark:bg-black dark:text-white"
			method="POST"
		>
			<button
				className="w-12 h-12 rounded-md bg-black dark:bg-transparent"
				type="submit"
				name="intent"
				value={provider}
			>
				<img
					className="rounded-md bg-transparent z-50"
					src={Logos[provider as currentProviders]}
					alt="google button"
				/>
			</button>
		</Form>
	);
};
