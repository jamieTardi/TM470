export const filterByTranslation = (filter: string): string => {
	switch (filter) {
		case "firstName":
			return "First Name";
		case "lastName":
			return "Last Name";
		case "nickName":
			return "Nick Name";
		default:
			return "Email";
	}
};
