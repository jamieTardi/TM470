import express from "express";

import { getStaff } from "../controllers/staff";

const router = express.Router();

router.get("/:parentId", getStaff);

export default router;
