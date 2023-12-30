import apiImage from "~/assets/images/api.png";
import keyImage from "~/assets/images/key.png";
import accountImage from "~/assets/images/account.png";
import stonksImage from "~/assets/images/stonks.png";
import React from "react";

export const Cards = () => {
	const images = [
		{
			src: accountImage,
			alt: "account",
			title: "account",
		},
		{
			src: keyImage,
			alt: "key",
			title: "key",
		},
		{
			src: apiImage,
			alt: "api",
			title: "request",
		},
		{
			src: stonksImage,
			alt: "stonks",
			title: "stonks!",
		},
	];
	return (
		<div className="w-full flex flex-col align-middle items-center justify-center md:flex md:items-center md:flex-row md:justify-around gap-5 dark:bg-slate-50 text-black p-2">
			{images.map((image, index) => {
				return (
					<React.Fragment key={index}>
						<div className="w-full z-50 flex flex-col items-center justify-center md:justify-end">
							<span className="align-middle">{image.title}</span>
							<img
								className="object-contain w-6 h-6 md:w-8 md:h-8 self-center"
								src={image.src}
								alt={image.alt}
							/>
						</div>
						{index !== images.length - 1 && (
							<div className="text-2xl hidden md:block dark:text-black">→</div>
						)}
						{index !== images.length - 1 && (
							<div className="text-2xl md:hidden dark:text-black ">↓</div>
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
};
