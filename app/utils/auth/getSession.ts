import Cookies from "js-cookie";

export const getSession = () => {
	return Cookies.get("__session") ? true : false;
};
