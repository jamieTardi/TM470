type TCardKeyTranslation = {
	text: string;
	icon: string;
};

export const cardKeyTranslation = (key: string): TCardKeyTranslation => {
	switch (key) {
		case "hasFood":
			return { text: "Allows Food Package", icon: "food" };
		case "allowsDogs":
			return { text: "Allows Dogs", icon: "dog" };
		case "allowsFires":
			return { text: "Allows Fires", icon: "fire" };
		case "allowsSwimParking":
			return { text: "Allows Swim Parking", icon: "parking" };
		case "allowsOwnBait":
			return { text: "Allows Own Bait", icon: "fishing" };
		case "hasWifi":
			return { text: "WiFi Avaliable", icon: "wifi" };
		case "allowsIndividualBookings":
			return { text: "Allows Individual Bookings", icon: "bookings" };
		case "hasSlings":
			return { text: "Slings Provided", icon: "fishing" };
		case "hasMerchandise":
			return { text: "Sells Merchandise", icon: "pound" };
		case "hasShowers":
			return { text: "Shower Block", icon: "shower" };
		case "toiletsProvided":
			return { text: "Toilet Block", icon: "toilet" };
		case "hasBaliff":
			return { text: "On Site Baliff", icon: "staff" };
		case "allowsBBQ":
			return { text: "Allows BBQ's", icon: "bbq" };
		default:
			return { text: "unknown", icon: "staff" };
	}
};
