export enum ERRORS {
	UNAUTHORIZED = "Unauthorized",
	FORBIDDEN = "Forbidden",
	NOT_FOUND = "Not Found",
	INVALID_CREDENTIALS = "Invalid email or password",
	USER_NOT_FOUND = "Couldn't find the user",
	BAD_REQUEST = "Bad Request",
	INTERNAL_SERVER_ERROR = "Internal Server Error",
	USER_EXISTS = "User already exists",
}

export enum STATUS_CODE {
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	BAD_REQUEST = 400,
	INTERNAL_SERVER_ERROR = 500,
}
