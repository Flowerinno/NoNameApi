export const snippets = {
	1: `npm install @no-name-api/sdk`,
	2: `import {NNApi} from '@no-nam-api/sdk'; \n\nexport const nna = new NNApi();
	function demo() {
		try {
			// potential error
		} catch (error) {
			nna.captureException(error, 'level/description');
		}
	}`,
};
