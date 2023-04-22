import express from "express";

import { createLake, deleteLake, getLakes, updateLakes } from "../controllers/lakes";

const router = express.Router();

router.delete("/delete/:lakeId", deleteLake);
router.patch("/update/:lakeId", updateLakes);
router.post("/create", createLake);
router.get("/:userId", getLakes);

export default router;
