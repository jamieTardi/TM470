export interface User {
	firstName: string;
	lastName: string;
	password: string;
	email: string;
	parentId?: string;
	createdOn?: Date;
	lastLogin?: Date;
	phoneNo: string;
	role: "admin" | "owner" | "baliff";
	myLakes: TLake[] | [];
}

type TLake = {
	_id: string;
	name: string;
	phone: string;
	ownerId: string;
	maxUsers: number;
	depth: number;
	specifics: TLakeSpecfics;
	location: TLocation;
	notes?: string;
};

type TLakeSpecfics = {
	hasFood: boolean;
	allowsDogs: boolean;
	allowsFires: boolean;
	allowsSwimParking: boolean;
	allowsOwnBait: boolean;
	hasWifi: boolean;
	allowsIndividualBookings: boolean;
	hasSlings: boolean;
	hasMerchandise: boolean;
	hasShowers: boolean;
	toiletsProvided: boolean;
	hasBaliff: boolean;
};

type TLocation = {
	gps: number[];
};

type TLogin = {
	email: string;
	password: string;
};

type TSubscription = {
	type: string;
	default: "basic";
	enum: ["complex", "premium", "basic"];
	isSubscribed: boolean;
};
