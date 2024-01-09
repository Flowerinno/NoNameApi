interface Props {
	value: string;
	title: string;
	activeSection: string;
}

export const SectionLink = ({ value, title, activeSection }: Props) => {
	const isActive = activeSection === value;

	return (
		<button
			className={`text-sm md:text-2xl p-2 border-2 border-gray-400 ${
				isActive && "text-red-400"
			} rounded-md hover:bg-slate-500 w-full animate-fade-down`}
			value={value}
			name="section"
			type="submit"
		>
			{title}
		</button>
	);
};
