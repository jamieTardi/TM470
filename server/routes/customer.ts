import express from "express";

import {
	createCustomer,
	getCustomers,
	updateCustomer,
	deleteCustomer,
	searchCustomers,
	getSingleCustomer,
} from "../controllers/customer";

const router = express.Router();

router.get("/:userId/:filter/:filterBy", getCustomers);
router.get("/find/:customerId", getSingleCustomer);
router.post("/create", createCustomer);
router.patch("/update/:customerId", updateCustomer);
router.delete("/delete/:customerId", deleteCustomer);
router.get("/search/:searchTerm", searchCustomers);

export default router;
