export const timeOfDay = (): string => {
	const time = new Date().getHours();

	switch (true) {
		case time < 5:
			return "Good night";
		case time > 5 && time <= 12:
			return "Good morning";
		case time > 12 && time <= 18:
			return "Good afternoon";
		case time > 18:
			return "Good Evening";
		default:
			return "Good day";
	}
};
