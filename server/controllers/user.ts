import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import user from '../models/user';
import { User } from '../Types/users';
import dotenv from 'dotenv';
import { generateAccessToken } from '../middleware/auth';

dotenv.config();

export const getAllUsers = async (req: Request, res: Response) => {};

export const createUser = async (req: Request, res: Response) => {
	const {
		firstName,
		lastName,
		password,
		phoneNo,
		myLakes,
		role,
		email,
		parentId,
	} = req.body;

	const existingUser = await user.findOne({ email: email });
	if (existingUser) {
		console.log('User exists already');
		res
			.status(500)
			.json({
				message: 'Email address already exists, please use another one.',
			});
		return;
	}

	try {
		const defaultPassword = password ? password : 'default1234';
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(defaultPassword, salt);

		await user.create({
			firstName,
			lastName,
			email,
			password: hash,
			parentId,
			phoneNo,
			createdOn: Date.now(),
			role,
			myLakes,
		});
		res.status(201).json('User Created');
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong' + err });
	}
};

export const generateNewUser = async (userDetails: User) => {
	const {
		firstName,
		lastName,
		password,
		phoneNo,
		myLakes,
		role,
		email,
		parentId,
	} = userDetails;
	const existingUser = await user.findOne({ email: email });
	if (existingUser) {
		console.log('User exists already');
		return;
	}

	const defaultPassword = password ? password : 'default1234';
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(defaultPassword, salt);

	await user.create({
		firstName,
		lastName,
		email,
		password: hash,
		parentId,
		phoneNo,
		createdOn: Date.now(),
		role,
		myLakes,
	});
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.query;
	const currentUser = await user.findOne({ email });

	if (!currentUser) {
		return res
			.status(401)
			.json({ data: 'There was an error finding your details.' });
	}
	if (typeof password !== 'string' || typeof email !== 'string') {
		return;
	}
	const isPasswordCorrect = await bcrypt.compare(
		password,
		currentUser.password,
	);
	if (!isPasswordCorrect) {
		return res.status(401).json({
			data: 'The password you have enetered is incorrect, try again or contact an admin.',
		});
	}
	const token = generateAccessToken(email);
	res.json({
		token: `Bearer ${token}`,
	});
};

export const getUser = async (req: Request, res: Response) => {
	const { email } = req.params;
	const currentUser = await user.findOne({ email });

	if (!currentUser) {
		res
			.status(401)
			.json({ data: 'An error has occured please login in again.' });
	}

	const returnedUser = {
		_id: currentUser?._id,
		firstName: currentUser?.firstName,
		lastName: currentUser?.lastName,
		email: currentUser?.email,
		phoneNo: currentUser?.phoneNo,
		createdOn: currentUser?.createdOn,
		parentId: currentUser?.parentId,
		role: currentUser?.role,
		myLakes: currentUser?.myLakes,
	};

	res.status(200).json(returnedUser);
};
