import Cookies from "js-cookie";

/**
 * @description Get session
 * @returns {boolean}
 */

export const getSession = () => {
	return Cookies.get("__session") ? true : false;
};
