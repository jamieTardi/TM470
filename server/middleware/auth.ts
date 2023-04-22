import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const generateAccessToken = (email: string) => {
	return jwt.sign({ email }, process.env.TOKEN_SECRET!, { expiresIn: "86400s" });
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		return res.status(401);
	}

	jwt.verify(token, process.env.TOKEN_SECRET!, (err, decoded) => {
		if (err) {
			return res.status(403);
		}
		// @ts-ignore
		req.tokenData = decoded;
		next();
	});
};
