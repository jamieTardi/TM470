import { Request, Response } from "express";
import lake from "../models/lake";

export const getLakes = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		const results = await lake.find({ assignedUsersId: userId }).sort({ name: 1 });
		return res.status(200).json(results);
	} catch {
		return res.status(301).json({ message: "There were no lakes found" });
	}
};

export const createLake = async (req: Request, res: Response) => {
	const { name, phone, maxUsers, ownerId, depth, specifics, location, lakeRef, email, website } = req.body;
	const existingLake = await lake.findOne({ name });

	if (existingLake) {
		return res.status(401).json({ message: "This lake already exists, please adjust the name" });
	}
	try {
		await lake.create({
			name,
			phone,
			maxUsers,
			lakeRef,
			email,
			website,
			ownerId,
			assignedUsersId: [ownerId],
			depth,
			specifics: {
				hasFood: specifics.hasFood,
				allowsDogs: specifics.allowsDogs,
				allowsFires: specifics.allowsFires,
				allowsSwimParking: specifics.allowsSwimParking,
				allowsOwnBait: specifics.allowsOwnBait,
				hasWifi: specifics.hasWifi,
				allowsIndividualBookings: specifics.allowsIndividualBookings,
				hasSlings: specifics.hasSlings,
				hasMerchandise: specifics.hasMerchandise,
				hasShowers: specifics.hasShowers,
				toiletsProvided: specifics.toiletsProvided,
				hasBaliff: specifics.hasBaliff,
				allowsBBQ: specifics.allowsBBQ,
			},
			location: { gps: location.gps },
		});

		return res.status(201).json("Lake has been created");
	} catch (err) {
		return res.status(404).json({ message: err });
	}
};

export const updateLakes = async (req: Request, res: Response) => {
	const { lakeId } = req.params;
	const findLake = await lake.findById(lakeId);

	if (!findLake) {
		return res.status(403).json({ message: "Lake has not been found, please try again." });
	}
	try {
		await lake.findByIdAndUpdate(lakeId, req.body);
		return res.status(201).json("Lake has been updated");
	} catch (err) {
		return res.status(403).json({ message: err });
	}
};

export const deleteLake = async (req: Request, res: Response) => {
	const { lakeId } = req.params;
	try {
		await lake.findByIdAndDelete(lakeId);
		res.status(200).json("Lake deleted");
	} catch (err) {
		res.status(401).json("Failed to delete lake, try again");
	}
};
