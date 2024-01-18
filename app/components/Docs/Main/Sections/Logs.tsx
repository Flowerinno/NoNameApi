export const Logs = () => {
	return (
		<div className="flex flex-col items-start min-h-screen w-11/12 p-2 gap-5 text-sm md:text-2xl">
			<h3 className="font-bold text-4xl">Logs</h3>
			<p>1. Restrictions</p>
			<p className="text-sm">
				A single account could create up to 10 loggers. For increased number of
				loggers visit support section in your profile and contact to increase
				your limit.
			</p>
			<p className="text-sm">
				Logger service name must be unique. Consist only of alphabetical
				characters. Max length is 20 characters, min is 3.
			</p>
		</div>
	);
};
