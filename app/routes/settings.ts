import { json, redirect, ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request, params }: ActionFunctionArgs) => {
	console.log(params);
	const formData = await request.formData();
	const isKeyShouldBeUpdated = formData.get("isKeyShouldBeUpdated");
	const password = formData.get("password");

	if (isKeyShouldBeUpdated === "true") {
		//update api key
	}

	if (password) {
		//update password if not the same as the existing one
	}

	console.log(isKeyShouldBeUpdated, password);
	return json({ message: "Hello world!" });
};
