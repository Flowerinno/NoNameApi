import { destroySession, getSession } from "../session/session.server";
import { prisma } from "../db/db.server";
import { ERRORS, STATUS_CODE } from "./types";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const authenticateUser = async (request: Request): Promise<Boolean> => {
	const session = await getSession(request.headers.get("Cookie"));

	if (!session.get("userId")) {
		return false;
	}

	return true;
};

export const loginUser = async (request: Request) => {
	const formData = await request.formData();

	if (!formData.get("email") || !formData.get("password")) {
		return {
			status: STATUS_CODE.BAD_REQUEST,
			message: ERRORS.BAD_REQUEST,
		};
	}

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return {
			status: STATUS_CODE.NOT_FOUND,
			message: ERRORS.NOT_FOUND,
		};
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return {
			status: STATUS_CODE.UNAUTHORIZED,
			message: ERRORS.UNAUTHORIZED,
		};
	}

	const session = await commitUserSession(user);

	return {
		status: 200,
		message: "Logged in",
		session,
	};
};

export const logoutUser = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (!session) {
		return;
	}

	await destroySession(session);

	return {
		status: 200,
		message: "Logged out",
	};
};

export const registerUser = async (request: Request) => {
	const formData = await request.formData();

	if (
		!formData.get("email") ||
		!formData.get("password") ||
		!formData.get("name")
	) {
		return {
			status: STATUS_CODE.BAD_REQUEST,
			message: ERRORS.BAD_REQUEST,
			isError: true,
		};
	}

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const name = formData.get("name") as string;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (user) {
		return {
			status: STATUS_CODE.NOT_FOUND,
			message: ERRORS.USER_EXISTS,
			isError: true,
		};
	}

	const hash = await bcrypt.hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			name,
			email: email,
			password: hash,
		},
	});

	if (newUser) {
		const session = await commitUserSession(newUser);

		return {
			status: 201,
			message: "Suceessfully registered",
			session,
			isError: false,
		};
	}

	return {
		status: STATUS_CODE.INTERNAL_SERVER_ERROR,
		message: ERRORS.INTERNAL_SERVER_ERROR,
		isError: true,
	};
};

export const commitUserSession = async (user: User) => {
	const session = await getSession();

	session.set("userId", user.id);
	session.set("name", user.name);
	session.set("email", user.email);
	session.set("isSubscribed", user.isSubscribed);

	return session;
};
