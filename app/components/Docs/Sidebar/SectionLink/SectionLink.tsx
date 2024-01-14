interface Props {
	value: string;
	title: string;
	activeSection: string;
}

export const SectionLink = ({ value, title, activeSection }: Props) => {
	const isActive = activeSection === value;

	return (
		<button
			className={`text-sm md:text-2xl border-2 md:rounded-tl-none md:rounded-bl-none md:rounded-tr-2xl md:rounded-br-lg border-gray-400 p-1 ${
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
