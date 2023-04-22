"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCustomer = exports.searchCustomers = exports.deleteCustomer = exports.updateCustomer = exports.getCustomers = exports.createCustomer = void 0;
const customer_1 = __importDefault(require("../models/customer"));
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, nickName, phone, email, location, notes } = req.body;
    try {
        yield customer_1.default.create({
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
    }
    catch (err) {
        return res.status(404).json({ message: "Something went wrong" });
    }
});
exports.createCustomer = createCustomer;
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, filter, filterBy } = req.params;
    try {
        const results = yield customer_1.default.find({ assignedUsers: userId, [filterBy]: { $regex: "^" + filter, $options: "i" } });
        return res.status(200).json(results);
    }
    catch (_a) {
        return res.status(301).json({ message: "There were no lakes found" });
    }
});
exports.getCustomers = getCustomers;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    const findCustomer = yield customer_1.default.findById(customerId);
    if (!findCustomer) {
        return res.status(403).json({ message: "Lake has not been found, please try again." });
    }
    try {
        yield customer_1.default.findByIdAndUpdate(customerId, req.body);
        return res.status(201).json("Lake has been updated");
    }
    catch (err) {
        return res.status(403).json({ message: err });
    }
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    try {
        yield customer_1.default.findByIdAndDelete(customerId);
        res.status(200).json("Customer deleted");
    }
    catch (err) {
        res.status(401).json("Failed to delete lake, try again");
    }
});
exports.deleteCustomer = deleteCustomer;
const searchCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.params;
    const escapeRegex = (searchTerm) => {
        return searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    const regex = new RegExp(escapeRegex(searchTerm), "gi");
    try {
        const customers = yield customer_1.default.find({
            $or: [
                { firstName: { $regex: regex } },
                { nickName: { $regex: regex } },
                { lastName: { $regex: regex } },
                { email: { $regex: regex } },
                { phone: { $regex: regex } },
            ],
        });
        res.status(200).json(customers);
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
});
exports.searchCustomers = searchCustomers;
const getSingleCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    try {
        const singleCustomer = yield customer_1.default.findById(customerId);
        res.status(200).json(singleCustomer);
    }
    catch (err) {
        res.status(401).json("An error getting customers happened");
    }
});
exports.getSingleCustomer = getSingleCustomer;
