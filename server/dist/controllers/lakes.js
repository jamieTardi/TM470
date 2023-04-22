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
exports.deleteLake = exports.updateLakes = exports.createLake = exports.getLakes = void 0;
const lake_1 = __importDefault(require("../models/lake"));
const getLakes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const results = yield lake_1.default.find({ assignedUsersId: userId }).sort({ name: 1 });
        return res.status(200).json(results);
    }
    catch (_a) {
        return res.status(301).json({ message: "There were no lakes found" });
    }
});
exports.getLakes = getLakes;
const createLake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, maxUsers, ownerId, depth, specifics, location, lakeRef, email, website } = req.body;
    const existingLake = yield lake_1.default.findOne({ name });
    if (existingLake) {
        return res.status(401).json({ message: "This lake already exists, please adjust the name" });
    }
    try {
        yield lake_1.default.create({
            name,
            phone,
            maxUsers,
            lakeRef,
            email,
            website,
            ownerId,
            assignedUsersId: [ownerId],
            depth,
            specifics: {
                hasFood: specifics.hasFood,
                allowsDogs: specifics.allowsDogs,
                allowsFires: specifics.allowsFires,
                allowsSwimParking: specifics.allowsSwimParking,
                allowsOwnBait: specifics.allowsOwnBait,
                hasWifi: specifics.hasWifi,
                allowsIndividualBookings: specifics.allowsIndividualBookings,
                hasSlings: specifics.hasSlings,
                hasMerchandise: specifics.hasMerchandise,
                hasShowers: specifics.hasShowers,
                toiletsProvided: specifics.toiletsProvided,
                hasBaliff: specifics.hasBaliff,
                allowsBBQ: specifics.allowsBBQ,
            },
            location: { gps: location.gps },
        });
        return res.status(201).json("Lake has been created");
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
});
exports.createLake = createLake;
const updateLakes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lakeId } = req.params;
    const findLake = yield lake_1.default.findById(lakeId);
    if (!findLake) {
        return res.status(403).json({ message: "Lake has not been found, please try again." });
    }
    try {
        yield lake_1.default.findByIdAndUpdate(lakeId, req.body);
        return res.status(201).json("Lake has been updated");
    }
    catch (err) {
        return res.status(403).json({ message: err });
    }
});
exports.updateLakes = updateLakes;
const deleteLake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lakeId } = req.params;
    try {
        yield lake_1.default.findByIdAndDelete(lakeId);
        res.status(200).json("Lake deleted");
    }
    catch (err) {
        res.status(401).json("Failed to delete lake, try again");
    }
});
exports.deleteLake = deleteLake;
