const plans = [
	{
		id: 0,
		label: "Free",
		price: 0,
		features: [
			"1 user",
			"2 GB of storage",
			"Help center access",
			"Email support",
		],
	},
	{
		id: 1,
		label: "Pro",
		price: 15,
		features: [
			"5 users",
			"10 GB of storage",
			"Help center access",
			"Priority email support",
		],
	},
	{
		id: 2,
		label: "Enterprise",
		price: 29,
		features: [
			"Unlimited users",
			"30 GB of storage",
			"Help center access",
			"Phone & email support",
		],
	},
];

export const getPlans = () => {
	return plans;
};

export const getPlanById = (id: number) => {
	return plans.find((plan) => plan.id === id);
};
