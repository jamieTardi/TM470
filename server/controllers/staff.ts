import { Request, Response } from "express";
import user from "../models/user";

export const getStaff = async (req: Request, res: Response) => {
	const { parentId } = req.params;
	try {
		const staff = await user.find({ parentId: parentId });
		const owner = await user.findById(parentId);

		if (!owner) {
			return res.status(500).json({ message: "No lake owner was found" });
		}
		staff.push(owner);
		return res.status(200).json(staff);
	} catch {
		return res.status(301).json({ message: "There were no staff found" });
	}
};
