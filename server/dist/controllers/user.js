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
exports.getUser = exports.loginUser = exports.generateNewUser = exports.createUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../middleware/auth");
dotenv_1.default.config();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password, phoneNo, myLakes, role, email, parentId } = req.body;
    const existingUser = yield user_1.default.findOne({ email: email });
    if (existingUser) {
        console.log("User exists already");
        res.status(500).json({ message: "Email address already exists, please use another one." });
        return;
    }
    try {
        const defaultPassword = password ? password : "default1234";
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(defaultPassword, salt);
        yield user_1.default.create({
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
        res.status(201).json("User Created");
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" + err });
    }
});
exports.createUser = createUser;
const generateNewUser = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password, phoneNo, myLakes, role, email, parentId } = userDetails;
    const existingUser = yield user_1.default.findOne({ email: email });
    if (existingUser) {
        console.log("User exists already");
        return;
    }
    const defaultPassword = password ? password : "default1234";
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(defaultPassword, salt);
    yield user_1.default.create({
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
});
exports.generateNewUser = generateNewUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.query;
    const currentUser = yield user_1.default.findOne({ email });
    if (!currentUser) {
        return res.status(401).json({ data: "There was an error finding your details." });
    }
    if (typeof password !== "string" || typeof email !== "string") {
        return;
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, currentUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({
            data: "The password you have enetered is incorrect, try again or contact an admin.",
        });
    }
    const token = (0, auth_1.generateAccessToken)(email);
    res.json({
        token: `Bearer ${token}`,
    });
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const currentUser = yield user_1.default.findOne({ email });
    if (!currentUser) {
        res.status(401).json({ data: "An error has occured please login in again." });
    }
    const returnedUser = {
        _id: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id,
        firstName: currentUser === null || currentUser === void 0 ? void 0 : currentUser.firstName,
        lastName: currentUser === null || currentUser === void 0 ? void 0 : currentUser.lastName,
        email: currentUser === null || currentUser === void 0 ? void 0 : currentUser.email,
        phoneNo: currentUser === null || currentUser === void 0 ? void 0 : currentUser.phoneNo,
        createdOn: currentUser === null || currentUser === void 0 ? void 0 : currentUser.createdOn,
        parentId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.parentId,
        role: currentUser === null || currentUser === void 0 ? void 0 : currentUser.role,
        myLakes: currentUser === null || currentUser === void 0 ? void 0 : currentUser.myLakes,
    };
    res.status(200).json(returnedUser);
});
exports.getUser = getUser;
