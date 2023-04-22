import express from "express";
import { getAllUsers, createUser, loginUser, getUser } from "../controllers/user";
import { validateToken } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/create-user", createUser);
router.get("/login", loginUser);
router.get("/auth/:email", validateToken, getUser);

export default router;
