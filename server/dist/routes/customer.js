"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = require("../controllers/customer");
const router = express_1.default.Router();
router.get("/:userId/:filter/:filterBy", customer_1.getCustomers);
router.get("/find/:customerId", customer_1.getSingleCustomer);
router.post("/create", customer_1.createCustomer);
router.patch("/update/:customerId", customer_1.updateCustomer);
router.delete("/delete/:customerId", customer_1.deleteCustomer);
router.get("/search/:searchTerm", customer_1.searchCustomers);
exports.default = router;
