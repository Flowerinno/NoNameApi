import { E_Routes } from "~/types";

export const GettingStarted = () => {
	return (
		<div className="flex flex-col items-start min-h-screen w-11/12 p-2 gap-5 text-sm md:text-2xl">
			<h3 className="font-bold text-4xl">Getting Started</h3>
			<p>
				1. First of install the{" "}
				<a
					className="text-blue-500"
					href={E_Routes.npm_package}
					target="_blank"
				>
					nna-sdk npm package
				</a>
			</p>
			<pre className="border-2 p-2 rounded-md align-middle text-center text-sm">
				<code>npm install nna-sdk</code>
			</pre>
			<p className="text-red-300 text-sm">
				In order to use this SDK, you need to have an account. Grab your API key
				from the dashboard, create your logger service and you're ready to go!
			</p>
			<p className="text-sm">
				A little bit of Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Expedita eaque, dolore excepturi possimus mollitia labore sunt
				doloremque pariatur impedit quae, optio, dolor tenetur consequatur
				quidem in aliquid tempora officiis voluptates quis ipsa molestiae ea aut
				magnam! Rerum, incidunt officiis impedit quod id odio illum placeat aut
				temporibus! Mollitia ut assumenda porro consectetur cumque officia.
			</p>
			<p>2. Import the SDK</p>
			<pre className="border-2 p-2 rounded-md text-start text-sm whitespace-pre-wrap">
				<code>import NNApi from "nna-sdk/core/main"</code>
			</pre>
			<p>3. Initialize the SDK</p>
			<pre className="border-2 p-2 rounded-md text-start text-sm whitespace-pre-wrap">
				<code>const nna = NNApi("your_api_key", "created_logger_name")</code>
			</pre>
			<p>4. Start logging!</p>
			<pre className="w-full max-w-2xl border-2 p-2 rounded-md text-start text-sm whitespace-pre-wrap">
				<code className="w-44">{`async function demo() {
    try {
        // Potential error
    } catch (e) {
        await nna.captureException({message: 'Logged', level: "info"});
    }
}`}</code>
			</pre>
		</div>
	);
};
