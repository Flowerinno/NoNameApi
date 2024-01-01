import GithubIcon from "../../../../assets/images/github.png";
import LinkedInIcon from "../../../../assets/images/linkedin.png";
import DiscordIcon from "../../../../assets/images/discord.png";

const links = [
	{
		name: "GitHub",
		link: "https://github.com/Flowerinno",
		icon: GithubIcon,
	},
	{
		name: "LinkedIn",
		link: "https://www.linkedin.com/in/aleksandr-kononov-56b804222/",
		icon: LinkedInIcon,
	},
	{
		name: "Discord",
		link: "Berger#3012",
		icon: DiscordIcon,
	},
];

export const Support = () => {
	return (
		<div className="flex flex-col gap-10 items-center justify-start w-full h-full p-3 text-sm md:text-2xl dark:text-white">
			<h3>For any support or improvements:</h3>
			<ul className="flex flex-col gap-5 p-3">
				{links.map((link, index) => {
					return (
						<li key={index} className="cursor-pointer">
							<img
								src={link.icon}
								alt=""
								className="w-8 h-8 inline-block mr-2 bg-white z-20 rounded-md"
							/>
							<a href={link.link} target="_blank">
								{link.name}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
