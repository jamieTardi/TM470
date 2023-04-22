interface IUser {
	_id?: string;
	firstName: string;
	lastName: string;
	password?: string;
	email: string;
	parentId?: string;
	createdOn?: Date;
	lastLogin?: Date;
	phoneNo: string;
	role: TRole;
	myLakes: TLake[] | [];
}

type TRole = "admin" | "owner" | "baliff";

type TLake = {
	_id: string;
	name: string;
	phone: string;
	email: string;
	ownerId: string;
	maxUsers: number;
	depth: number;
	specifics: TLakeSpecfics;
	location: TLocation;
	notes?: string;
	lakeRef: string;
	website?: string;
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
	allowsBBQ: boolean;
};

type TLocation = {
	gps: number[];
};

type TLogin = {
	email: string;
	password: string;
};
