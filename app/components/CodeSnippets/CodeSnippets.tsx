import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { useEffect } from "react";
hljs.registerLanguage("javascript", javascript);

interface Props {
	label: string;
	code: string;
}

export const CodeSnippets = ({ label, code }: Props) => {
	const highlightedCode = hljs.highlight(code, {
		language: "javascript",
	}).value;

	if (!code) return null;

	useEffect(() => {}, [highlightedCode]);
	return (
		<div className="flex flex-col items-start justify-start gap-2">
			<h3>{label}</h3>
			<div
				id="code"
				className="whitespace-pre p-3 border-2 rounded-md w-11/12"
				dangerouslySetInnerHTML={{ __html: highlightedCode }}
			></div>
		</div>
	);
};
