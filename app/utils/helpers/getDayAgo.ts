export const getDayAgo = (days = 1) =>
	new Date(Date.now() - days * 24 * 60 * 60 * 1000);
