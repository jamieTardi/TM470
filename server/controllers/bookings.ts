import { eachDayOfInterval, format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import bookings from "../models/bookings";
import customer from "../models/customer";
import lake from "../models/lake";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import handlebars from "handlebars";
import * as fs from "fs";
import user from "../models/user";

dotenv.config();

export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
	const { _id, customerId, lakeId } = req.body;

	try {
		const currentCustomer = await customer.findById(customerId);
		const currentLake = await lake.findById(lakeId);
		if (!currentCustomer || !currentLake) {
			return res.status(401).json({ message: "Customer or lake not found" });
		}
		await bookings.findByIdAndUpdate(_id, req.body);

		await customer.findByIdAndUpdate(customerId, {
			...currentCustomer,
		});
		res.status(200).json({ message: "Booking has been updated" });
	} catch (err) {
		res.status(500).json("Error updating the booking occured.");
	}
};

export const getBookings = async (req: Request, res: Response) => {
	const { date } = req.params;
	const monthNumber = new Date(date).getMonth() + 1;
	const yearNumber = new Date(date).getFullYear();

	try {
		const results = await bookings.find({
			$and: [
				{ $expr: { $eq: [{ $month: "$arrival" }, monthNumber] } },
				{ $expr: { $eq: [{ $year: "$arrival" }, yearNumber] } },
			],
		});
		res.status(200).json(results);
	} catch (err) {
		res.status(400).json({ message: err });
	}
};

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
	const { arrival, departure, cost, paid, placesBooked, customerId, lakeId, notes } = req.body.booking;
	const { isSendEmail, userId } = req.body;

	try {
		const currentCustomer = await customer.findById(customerId);
		const currentLake = await lake.findById(lakeId);
		let currentUser = await user.findById(userId);
		if (!currentCustomer || !currentLake || !currentUser) {
			return res.status(401).json({ message: "Customer or lake or user not found" });
		}
		if (currentUser.parentId) {
			currentUser = await user.findById(currentUser.parentId);
		}
		const refNo = currentLake.lakeRef + "-" + Math.random().toString(36).slice(7).toUpperCase();
		const newBooking = await bookings.create({
			arrival,
			departure,
			cost,
			refNo,
			bookingEmailSent: isSendEmail ? 1 : 0,
			paid,
			datesBooked: eachDayOfInterval({
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
		await customer.findByIdAndUpdate(customerId, {
			...currentCustomer,
			["currentCustomer.bookingHistory"]: {
				lastBookingDate: new Date(),
				previousBookings: currentCustomer.bookingHistory?.previousBookings.push({
					bookingId: newBooking._id,
					date: new Date(),
					lake: currentLake.name,
					cost: cost,
					arrival: arrival,
					departure: departure,
				}),
				totalSpend: currentCustomer.bookingHistory?.totalSpend + paid,
				previousNumberTrips: currentCustomer.bookingHistory?.previousNumberTrips
					? currentCustomer.bookingHistory?.previousNumberTrips + 1
					: 1,
			},
		});

		if (!isSendEmail) {
			return res.status(201).json("Booking has been added to the database");
		} else {
			sendInfoEmail({ ...req, newBooking, owner: currentUser }, res);
		}
	} catch (err) {
		console.log(err);
		return res.status(401).json({ message: "An error processing the booking has happened" });
	}
};

//Checks the avalibilty depending if its a lake exclusive or not
export const checkAvailability = async (req: Request, res: Response) => {
	const { arrival, departure, lakeId, customerId } = req.body;
	const currentLake = await lake.findById(lakeId);
	if (!currentLake) {
		res.status(400).json({ message: "Cannot find a lake, please make sure one is selected." });
	}
	try {
		const unavaliableArray = await bookings.find({
			$and: [{ arrival: arrival }, { departure: departure }, { lakeId: lakeId }],
		});

		if (unavaliableArray.length > 0) {
			if (customerId === unavaliableArray[0].customerId) {
				return res.status(200).json({ message: `This is the current booking for the selected customer.` });
			}

			const nonExclusiveTotal: number = unavaliableArray
				.map((item) => item.placesBooked)
				.reduce((previousValue, currentValue) => previousValue + currentValue);

			if (nonExclusiveTotal < currentLake?.maxUsers!) {
				return res.status(200).json({
					message: `This booking has a party, but there is <span class="bold">${
						currentLake?.maxUsers! - nonExclusiveTotal
					}</span> spaces avaliable.</br> </br> <span class="red-bold">NOT AVALIABLE FOR LAKE EXCLUSIVES </span>`,
					warning: true,
				});
			}
			return res.status(401).json({
				message: `<span class="red-bold">WARNING</span>  </br> </br>
				This Date Clashes!
				</br> </br> </br> 
				<span class="bold">Booking ID:</span>  <a href=/bookings?bookingDate=${arrival}&bookingId=${unavaliableArray[0]._id} target="_blank" class="underline">${unavaliableArray[0]._id}</a> </br> </br>  <span class="bold">Customer:</span> <a href=/customers?customerId=${unavaliableArray[0].customerId} target="_blank" class="underline">${unavaliableArray[0].customerId} </a>`,
			});
		} else {
			return res.status(200).json({
				message: `
					<span class="green-bold">DATES AVALIABLE</span>
					</br>	</br>
					These dates are currently avaliable on ${currentLake?.name}:
					</br></br></br> 
					<span class="bold">Arrival Date: </span> ${format(new Date(arrival), "eeee do MMMM yyyy")}  
					</br> 
					</br> 
					<span class="bold">Departure Date: </span> ${format(new Date(departure), "eeee do MMMM yyyy")}`,
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "There was an error getting that booking date. Please try again." });
	}
};

export const sendInfoEmail = async (req: any, res: Response) => {
	const { customerId, lakeId, placesBooked, refNo, cost, paid, arrival, _id } = req.body.booking;
	const { userId } = req.body;
	let owner = req.owner;
	let paymentDetails: any;
	const options = req.newBooking;
	try {
		const currentLake = await lake.findById(options ? options.lakeId : lakeId);
		const currentCustomer = await customer.findById(options ? options.customerId : customerId);

		if (owner) {
			paymentDetails = owner.paymentDetails;
		} else {
			let currentUser = await user.findById(userId);
			if (currentUser?.parentId) {
				const foundUser = await user.findById(currentUser.parentId);
				paymentDetails = foundUser?.paymentDetails;
			} else {
				paymentDetails = currentUser?.paymentDetails;
			}
		}

		//If the booking already exists find it, otherwise ignore this statement
		if (!options) {
			const currentBooking = await bookings.findById(_id);
			await bookings.findByIdAndUpdate(_id, {
				bookingEmailSent: currentBooking?.bookingEmailSent ? currentBooking?.bookingEmailSent + 1 : 1,
			});
		}

		if (!currentLake || !currentCustomer) {
			res.status(401).json({
				message: "There has been an error finding that lake or customer, please try again or contact the developer.",
			});
		}

		const isNotExclusive = placesBooked < currentLake?.maxUsers!;
		const transporter = nodemailer.createTransport({
			host: "smtp.zoho.eu",
			port: 465,
			auth: {
				user: process.env.MAIL_USERNAME,
				pass: process.env.MAIL_PASSWORD,
			},
		});

		fs.readFile("emails/bookingEmail.html", { encoding: "utf-8" }, function (err, html) {
			if (err) {
				return res
					.status(500)
					.json({ message: "An error happened while trying to send the email. Please refresh and try again." });
			} else {
				let template = handlebars.compile(html);
				let data = {
					email: currentLake?.email,
					website: currentLake?.website,
					name: `${currentCustomer?.firstName} ${currentCustomer?.lastName}`,
					lakeName: currentLake?.name,
					sortCode: paymentDetails?.sortCode,
					accNumber: paymentDetails?.accNumber,
					arrival: format(new Date(options ? options.arrival : arrival), "eeee do MMMM yyyy"),
					departure: format(new Date(options ? options.departure : arrival), "eeee do MMMM yyyy"),
					cost: options ? options.cost : cost,
					paid: options ? options.paid : paid,
					refNo: options ? options.refNo : refNo,
					bookingType: isNotExclusive ? "individual spots" : "lake exclusive",
					placesBooked: options ? options.placesBooked : placesBooked,
					remaining: options ? options.cost - options.paid : cost - paid,
					bookingId: options ? options._id : _id,
					customerLong: currentCustomer?.location?.gps[1],
					customerLat: currentCustomer?.location?.gps[0],
					lakeLong: currentLake?.location?.gps[1],
					lakeLat: currentLake?.location?.gps[0],
					foodPackage: currentLake?.specifics?.hasFood,
					dogs: currentLake?.specifics?.allowsDogs,
					fires: currentLake?.specifics?.allowsFires,
					bait: currentLake?.specifics?.allowsOwnBait,
					merchandise: currentLake?.specifics?.hasMerchandise,
					toilets: currentLake?.specifics?.toiletsProvided,
					bbq: currentLake?.specifics?.allowsBBQ,
					parking: currentLake?.specifics?.allowsSwimParking,
					wifi: currentLake?.specifics?.hasWifi,
					slings: currentLake?.specifics?.hasSlings,
					showers: currentLake?.specifics?.hasShowers,
					baliff: currentLake?.specifics?.hasBaliff,
					year: new Date().getFullYear(),
				};
				let mailList = [currentCustomer?.email!];
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
					} else {
						console.log("Email sent: " + info.response);
						return res.status(200).json("Booking confirmation email sent successfully. 📧");
					}
				});
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "The email failed to send, try refreshing or sending again." });
	}
};

export const getAllBookingsForYear = async (req: Request, res: Response) => {
	const { year, lakeId } = req.params;
	const currentLake = await lake.findById(lakeId);

	if (!currentLake) {
		return res.status(404).json({ message: "The lake id was not found" });
	}

	const allBookings = await bookings.find({
		$and: [{ datesBooked: { $gte: new Date(year) }, $lt: new Date(year + 1) }, { lakeId: lakeId }],
	});

	if (!allBookings) {
		res.status(200).json("There are no bookings for this year yet.");
	}
	let sortedDates: any = {
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
		.map((aBooking) =>
			aBooking.dates.map((date) => {
				return { date: date, places: aBooking.places };
			})
		)
		.flat()
		.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date))
		.map((el) => {
			switch (el.date.getMonth()) {
				case 0:
					sortedDates = { ...sortedDates, jan: [...sortedDates.jan, { date: el.date, places: el.places }] };
					break;
				case 1:
					sortedDates = { ...sortedDates, feb: [...sortedDates.feb, { date: el.date, places: el.places }] };
					break;
				case 2:
					sortedDates = { ...sortedDates, mar: [...sortedDates.mar, { date: el.date, places: el.places }] };
					break;
				case 3:
					sortedDates = { ...sortedDates, apr: [...sortedDates.apr, { date: el.date, places: el.places }] };
					break;
				case 4:
					sortedDates = { ...sortedDates, may: [...sortedDates.may, { date: el.date, places: el.places }] };
					break;
				case 5:
					sortedDates = { ...sortedDates, june: [...sortedDates.june, { date: el.date, places: el.places }] };
					break;
				case 6:
					sortedDates = { ...sortedDates, july: [...sortedDates.july, { date: el.date, places: el.places }] };
					break;
				case 7:
					sortedDates = { ...sortedDates, aug: [...sortedDates.aug, { date: el.date, places: el.places }] };
					break;
				case 8:
					sortedDates = { ...sortedDates, sept: [...sortedDates.sept, { date: el.date, places: el.places }] };
					break;
				case 9:
					sortedDates = { ...sortedDates, oct: [...sortedDates.oct, { date: el.date, places: el.places }] };
					break;
				case 10:
					sortedDates = { ...sortedDates, nov: [...sortedDates.nov, { date: el.date, places: el.places }] };
					break;
				case 11:
					sortedDates = { ...sortedDates, dec: [...sortedDates.dec, { date: el.date, places: el.places }] };
					break;
			}
		});
	res.status(200).json(sortedDates);
};
