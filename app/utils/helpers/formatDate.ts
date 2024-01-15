export const formatDate = (date: Date, withTime: boolean = true) => {
	const dateObj = new Date(date);
	const day = dateObj.getDate().toString().padStart(2, "0");
	const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
	const year = dateObj.getFullYear();
	const formattedDate = `${day}/${month}/${year}`;
	const dateWithTime = `${formattedDate} ${dateObj.toLocaleTimeString()}`;
	return withTime ? dateWithTime : formattedDate;
};
