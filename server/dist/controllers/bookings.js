"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getAllBookingsForYear = exports.sendInfoEmail = exports.checkAvailability = exports.createBooking = exports.getBookings = exports.updateBooking = void 0;
const date_fns_1 = require("date-fns");
const bookings_1 = __importDefault(require("../models/bookings"));
const customer_1 = __importDefault(require("../models/customer"));
const lake_1 = __importDefault(require("../models/lake"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const handlebars_1 = __importDefault(require("handlebars"));
const fs = __importStar(require("fs"));
const user_1 = __importDefault(require("../models/user"));
dotenv_1.default.config();
const updateBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, customerId, lakeId } = req.body;
    try {
        const currentCustomer = yield customer_1.default.findById(customerId);
        const currentLake = yield lake_1.default.findById(lakeId);
        if (!currentCustomer || !currentLake) {
            return res.status(401).json({ message: "Customer or lake not found" });
        }
        yield bookings_1.default.findByIdAndUpdate(_id, req.body);
        yield customer_1.default.findByIdAndUpdate(customerId, Object.assign({}, currentCustomer));
        res.status(200).json({ message: "Booking has been updated" });
    }
    catch (err) {
        res.status(500).json("Error updating the booking occured.");
    }
});
exports.updateBooking = updateBooking;
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.params;
    const monthNumber = new Date(date).getMonth() + 1;
    const yearNumber = new Date(date).getFullYear();
    try {
        const results = yield bookings_1.default.find({
            $and: [
                { $expr: { $eq: [{ $month: "$arrival" }, monthNumber] } },
                { $expr: { $eq: [{ $year: "$arrival" }, yearNumber] } },
            ],
        });
        res.status(200).json(results);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.getBookings = getBookings;
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { arrival, departure, cost, paid, placesBooked, customerId, lakeId, notes } = req.body.booking;
    const { isSendEmail, userId } = req.body;
    try {
        const currentCustomer = yield customer_1.default.findById(customerId);
        const currentLake = yield lake_1.default.findById(lakeId);
        let currentUser = yield user_1.default.findById(userId);
        if (!currentCustomer || !currentLake || !currentUser) {
            return res.status(401).json({ message: "Customer or lake or user not found" });
        }
        if (currentUser.parentId) {
            currentUser = yield user_1.default.findById(currentUser.parentId);
        }
        const refNo = currentLake.lakeRef + "-" + Math.random().toString(36).slice(7).toUpperCase();
        const newBooking = yield bookings_1.default.create({
            arrival,
            departure,
            cost,
            refNo,
            bookingEmailSent: isSendEmail ? 1 : 0,
            paid,
            datesBooked: (0, date_fns_1.eachDayOfInterval)({
                start: new Date(new Date(arrival).setHours(new Date(arrival).getHours() + 6)),
                end: new Date(new Date(departure).setHours(new Date(departure).getHours() - 6)),
            }),
            emailsSent: 0,
            placesBooked,
            customerId,
            notes,
            lakeId,
            createdOn: new Date(),
        });
        yield customer_1.default.findByIdAndUpdate(customerId, Object.assign(Object.assign({}, currentCustomer), { ["currentCustomer.bookingHistory"]: {
                lastBookingDate: new Date(),
                previousBookings: (_a = currentCustomer.bookingHistory) === null || _a === void 0 ? void 0 : _a.previousBookings.push({
                    bookingId: newBooking._id,
                    date: new Date(),
                    lake: currentLake.name,
                    cost: cost,
                    arrival: arrival,
                    departure: departure,
                }),
                totalSpend: ((_b = currentCustomer.bookingHistory) === null || _b === void 0 ? void 0 : _b.totalSpend) + paid,
                previousNumberTrips: ((_c = currentCustomer.bookingHistory) === null || _c === void 0 ? void 0 : _c.previousNumberTrips)
                    ? ((_d = currentCustomer.bookingHistory) === null || _d === void 0 ? void 0 : _d.previousNumberTrips) + 1
                    : 1,
            } }));
        if (!isSendEmail) {
            return res.status(201).json("Booking has been added to the database");
        }
        else {
            (0, exports.sendInfoEmail)(Object.assign(Object.assign({}, req), { newBooking, owner: currentUser }), res);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "An error processing the booking has happened" });
    }
});
exports.createBooking = createBooking;
//Checks the avalibilty depending if its a lake exclusive or not
const checkAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { arrival, departure, lakeId, customerId } = req.body;
    const currentLake = yield lake_1.default.findById(lakeId);
    if (!currentLake) {
        res.status(400).json({ message: "Cannot find a lake, please make sure one is selected." });
    }
    try {
        const unavaliableArray = yield bookings_1.default.find({
            $and: [{ arrival: arrival }, { departure: departure }, { lakeId: lakeId }],
        });
        if (unavaliableArray.length > 0) {
            if (customerId === unavaliableArray[0].customerId) {
                return res.status(200).json({ message: `This is the current booking for the selected customer.` });
            }
            const nonExclusiveTotal = unavaliableArray
                .map((item) => item.placesBooked)
                .reduce((previousValue, currentValue) => previousValue + currentValue);
            if (nonExclusiveTotal < (currentLake === null || currentLake === void 0 ? void 0 : currentLake.maxUsers)) {
                return res.status(200).json({
                    message: `This booking has a party, but there is <span class="bold">${(currentLake === null || currentLake === void 0 ? void 0 : currentLake.maxUsers) - nonExclusiveTotal}</span> spaces avaliable.</br> </br> <span class="red-bold">NOT AVALIABLE FOR LAKE EXCLUSIVES </span>`,
                    warning: true,
                });
            }
            return res.status(401).json({
                message: `<span class="red-bold">WARNING</span>  </br> </br>
				This Date Clashes!
				</br> </br> </br> 
				<span class="bold">Booking ID:</span>  <a href=/bookings?bookingDate=${arrival}&bookingId=${unavaliableArray[0]._id} target="_blank" class="underline">${unavaliableArray[0]._id}</a> </br> </br>  <span class="bold">Customer:</span> <a href=/customers?customerId=${unavaliableArray[0].customerId} target="_blank" class="underline">${unavaliableArray[0].customerId} </a>`,
            });
        }
        else {
            return res.status(200).json({
                message: `
					<span class="green-bold">DATES AVALIABLE</span>
					</br>	</br>
					These dates are currently avaliable on ${currentLake === null || currentLake === void 0 ? void 0 : currentLake.name}:
					</br></br></br> 
					<span class="bold">Arrival Date: </span> ${(0, date_fns_1.format)(new Date(arrival), "eeee do MMMM yyyy")}  
					</br> 
					</br> 
					<span class="bold">Departure Date: </span> ${(0, date_fns_1.format)(new Date(departure), "eeee do MMMM yyyy")}`,
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "There was an error getting that booking date. Please try again." });
    }
});
exports.checkAvailability = checkAvailability;
const sendInfoEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, lakeId, placesBooked, refNo, cost, paid, arrival, _id } = req.body.booking;
    const { userId } = req.body;
    let owner = req.owner;
    let paymentDetails;
    const options = req.newBooking;
    try {
        const currentLake = yield lake_1.default.findById(options ? options.lakeId : lakeId);
        const currentCustomer = yield customer_1.default.findById(options ? options.customerId : customerId);
        if (owner) {
            paymentDetails = owner.paymentDetails;
        }
        else {
            let currentUser = yield user_1.default.findById(userId);
            if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.parentId) {
                const foundUser = yield user_1.default.findById(currentUser.parentId);
                paymentDetails = foundUser === null || foundUser === void 0 ? void 0 : foundUser.paymentDetails;
            }
            else {
                paymentDetails = currentUser === null || currentUser === void 0 ? void 0 : currentUser.paymentDetails;
            }
        }
        //If the booking already exists find it, otherwise ignore this statement
        if (!options) {
            const currentBooking = yield bookings_1.default.findById(_id);
            yield bookings_1.default.findByIdAndUpdate(_id, {
                bookingEmailSent: (currentBooking === null || currentBooking === void 0 ? void 0 : currentBooking.bookingEmailSent) ? (currentBooking === null || currentBooking === void 0 ? void 0 : currentBooking.bookingEmailSent) + 1 : 1,
            });
        }
        if (!currentLake || !currentCustomer) {
            res.status(401).json({
                message: "There has been an error finding that lake or customer, please try again or contact the developer.",
            });
        }
        const isNotExclusive = placesBooked < (currentLake === null || currentLake === void 0 ? void 0 : currentLake.maxUsers);
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.zoho.eu",
            port: 465,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        fs.readFile("emails/bookingEmail.html", { encoding: "utf-8" }, function (err, html) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            if (err) {
                return res
                    .status(500)
                    .json({ message: "An error happened while trying to send the email. Please refresh and try again." });
            }
            else {
                let template = handlebars_1.default.compile(html);
                let data = {
                    email: currentLake === null || currentLake === void 0 ? void 0 : currentLake.email,
                    website: currentLake === null || currentLake === void 0 ? void 0 : currentLake.website,
                    name: `${currentCustomer === null || currentCustomer === void 0 ? void 0 : currentCustomer.firstName} ${currentCustomer === null || currentCustomer === void 0 ? void 0 : currentCustomer.lastName}`,
                    lakeName: currentLake === null || currentLake === void 0 ? void 0 : currentLake.name,
                    sortCode: paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.sortCode,
                    accNumber: paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.accNumber,
                    arrival: (0, date_fns_1.format)(new Date(options ? options.arrival : arrival), "eeee do MMMM yyyy"),
                    departure: (0, date_fns_1.format)(new Date(options ? options.departure : arrival), "eeee do MMMM yyyy"),
                    cost: options ? options.cost : cost,
                    paid: options ? options.paid : paid,
                    refNo: options ? options.refNo : refNo,
                    bookingType: isNotExclusive ? "individual spots" : "lake exclusive",
                    placesBooked: options ? options.placesBooked : placesBooked,
                    remaining: options ? options.cost - options.paid : cost - paid,
                    bookingId: options ? options._id : _id,
                    customerLong: (_a = currentCustomer === null || currentCustomer === void 0 ? void 0 : currentCustomer.location) === null || _a === void 0 ? void 0 : _a.gps[1],
                    customerLat: (_b = currentCustomer === null || currentCustomer === void 0 ? void 0 : currentCustomer.location) === null || _b === void 0 ? void 0 : _b.gps[0],
                    lakeLong: (_c = currentLake === null || currentLake === void 0 ? void 0 : currentLake.location) === null || _c === void 0 ? void 0 : _c.gps[1],
                    lakeLat: (_d = currentLake === null || currentLake === void 0 ? void 0 : currentLake.location) === null || _d === void 0 ? void 0 : _d.gps[0],
                    foodPackage: (_e = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _e === void 0 ? void 0 : _e.hasFood,
                    dogs: (_f = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _f === void 0 ? void 0 : _f.allowsDogs,
                    fires: (_g = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _g === void 0 ? void 0 : _g.allowsFires,
                    bait: (_h = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _h === void 0 ? void 0 : _h.allowsOwnBait,
                    merchandise: (_j = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _j === void 0 ? void 0 : _j.hasMerchandise,
                    toilets: (_k = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _k === void 0 ? void 0 : _k.toiletsProvided,
                    bbq: (_l = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _l === void 0 ? void 0 : _l.allowsBBQ,
                    parking: (_m = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _m === void 0 ? void 0 : _m.allowsSwimParking,
                    wifi: (_o = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _o === void 0 ? void 0 : _o.hasWifi,
                    slings: (_p = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _p === void 0 ? void 0 : _p.hasSlings,
                    showers: (_q = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _q === void 0 ? void 0 : _q.hasShowers,
                    baliff: (_r = currentLake === null || currentLake === void 0 ? void 0 : currentLake.specifics) === null || _r === void 0 ? void 0 : _r.hasBaliff,
                    year: new Date().getFullYear(),
                };
                let mailList = [currentCustomer === null || currentCustomer === void 0 ? void 0 : currentCustomer.email];
                let htmlToSend = template(data);
                let mailOptions = {
                    from: process.env.MAIL_USERNAME,
                    to: mailList,
                    subject: "Booking Confirmation",
                    html: htmlToSend,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("Email sending error: " + error);
                        return res.status(500).json({ message: "The email failed to send, try refreshing or sending again." });
                    }
                    else {
                        console.log("Email sent: " + info.response);
                        return res.status(200).json("Booking confirmation email sent successfully. 📧");
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "The email failed to send, try refreshing or sending again." });
    }
});
exports.sendInfoEmail = sendInfoEmail;
const getAllBookingsForYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, lakeId } = req.params;
    const currentLake = yield lake_1.default.findById(lakeId);
    if (!currentLake) {
        return res.status(404).json({ message: "The lake id was not found" });
    }
    const allBookings = yield bookings_1.default.find({
        $and: [{ datesBooked: { $gte: new Date(year) }, $lt: new Date(year + 1) }, { lakeId: lakeId }],
    });
    if (!allBookings) {
        res.status(200).json("There are no bookings for this year yet.");
    }
    let sortedDates = {
        jan: [],
        feb: [],
        mar: [],
        apr: [],
        may: [],
        june: [],
        july: [],
        aug: [],
        sept: [],
        oct: [],
        nov: [],
        dec: [],
    };
    allBookings
        .map((aBooking) => {
        return { dates: aBooking.datesBooked, places: aBooking.placesBooked };
    })
        .map((aBooking) => aBooking.dates.map((date) => {
        return { date: date, places: aBooking.places };
    }))
        .flat()
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        .map((el) => {
        switch (el.date.getMonth()) {
            case 0:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { jan: [...sortedDates.jan, { date: el.date, places: el.places }] });
                break;
            case 1:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { feb: [...sortedDates.feb, { date: el.date, places: el.places }] });
                break;
            case 2:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { mar: [...sortedDates.mar, { date: el.date, places: el.places }] });
                break;
            case 3:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { apr: [...sortedDates.apr, { date: el.date, places: el.places }] });
                break;
            case 4:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { may: [...sortedDates.may, { date: el.date, places: el.places }] });
                break;
            case 5:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { june: [...sortedDates.june, { date: el.date, places: el.places }] });
                break;
            case 6:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { july: [...sortedDates.july, { date: el.date, places: el.places }] });
                break;
            case 7:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { aug: [...sortedDates.aug, { date: el.date, places: el.places }] });
                break;
            case 8:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { sept: [...sortedDates.sept, { date: el.date, places: el.places }] });
                break;
            case 9:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { oct: [...sortedDates.oct, { date: el.date, places: el.places }] });
                break;
            case 10:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { nov: [...sortedDates.nov, { date: el.date, places: el.places }] });
                break;
            case 11:
                sortedDates = Object.assign(Object.assign({}, sortedDates), { dec: [...sortedDates.dec, { date: el.date, places: el.places }] });
                break;
        }
    });
    res.status(200).json(sortedDates);
});
exports.getAllBookingsForYear = getAllBookingsForYear;
