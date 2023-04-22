import { Request, Response } from "express";
import customer from "../models/customer";

export const createCustomer = async (req: Request, res: Response) => {
	const { firstName, lastName, nickName, phone, email, location, notes } = req.body;

	try {
		await customer.create({
			firstName: firstName,
			lastName: lastName,
			nickName: nickName,
			phone: phone,
			email: email,
			notes: notes,
			assignedUsersId: [],
			createdOn: Date.now(),
			location: {
				gps: location.gps,
			},
		});
		return res.status(201).json("Customer has been added to the database");
	} catch (err) {
		return res.status(404).json({ message: "Something went wrong" });
	}
};

export const getCustomers = async (req: Request, res: Response) => {
	const { userId, filter, filterBy } = req.params;

	try {
		const results = await customer.find({ assignedUsers: userId, [filterBy]: { $regex: "^" + filter, $options: "i" } });
		return res.status(200).json(results);
	} catch {
		return res.status(301).json({ message: "There were no lakes found" });
	}
};

export const updateCustomer = async (req: Request, res: Response) => {
	const { customerId } = req.params;
	const findCustomer = await customer.findById(customerId);

	if (!findCustomer) {
		return res.status(403).json({ message: "Lake has not been found, please try again." });
	}
	try {
		await customer.findByIdAndUpdate(customerId, req.body);
		return res.status(201).json("Lake has been updated");
	} catch (err) {
		return res.status(403).json({ message: err });
	}
};

export const deleteCustomer = async (req: Request, res: Response) => {
	const { customerId } = req.params;
	try {
		await customer.findByIdAndDelete(customerId);
		res.status(200).json("Customer deleted");
	} catch (err) {
		res.status(401).json("Failed to delete lake, try again");
	}
};

export const searchCustomers = async (req: Request, res: Response) => {
	const { searchTerm } = req.params;
	const escapeRegex = (searchTerm: string) => {
		return searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	};

	const regex = new RegExp(escapeRegex(searchTerm), "gi");
	try {
		const customers = await customer.find({
			$or: [
				{ firstName: { $regex: regex } },
				{ nickName: { $regex: regex } },
				{ lastName: { $regex: regex } },
				{ email: { $regex: regex } },
				{ phone: { $regex: regex } },
			],
		});
		res.status(200).json(customers);
	} catch (err) {
		res.status(404).json({ message: err });
	}
};

export const getSingleCustomer = async (req: Request, res: Response) => {
	const { customerId } = req.params;
	try {
		const singleCustomer = await customer.findById(customerId);

		res.status(200).json(singleCustomer);
	} catch (err) {
		res.status(401).json("An error getting customers happened");
	}
};
