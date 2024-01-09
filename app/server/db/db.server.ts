import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

let prisma: PrismaClient;

declare global {
	var __prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	if (!global.__prisma) {
		global.__prisma = new PrismaClient();
	}
	prisma = global.__prisma;
}

export { prisma };

//add admin

prisma.user
	.findUnique({
		where: {
			email: "admin@gmail.com",
		},
	})
	.then((user) => {
		if (user) {
			console.log("Admin already exists");
			return;
		}

		prisma.user.create({
			//admin
			data: {
				email: "admin@gmail.com",
				name: "Aleksandr",
				password: bcrypt.hashSync("1234", 10),
				role: "ADMIN",
			},
		});

		prisma.user.create({
			//non-admin
			data: {
				email: "user@gmail.com",
				name: "Test",
				password: bcrypt.hashSync("1234", 10),
			},
		});
	});
