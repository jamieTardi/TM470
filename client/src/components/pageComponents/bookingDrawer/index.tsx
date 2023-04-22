import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../forms/Button";
import Pill from "../../general/pill";
import Pillcase from "../../general/pillcase";
import Icon from "../../icon";
import { Drawer, DrawerHeader, DrawerFooter, Tooltip } from "../../index";
import styles from "./bookingDrawer.module.scss";
import Content from "./Content";

const BookingDrawer = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [linkTxt, setLinkTxt] = useState("Copy Link");

	const handleLinkCopy = useCallback(() => {
		navigator.clipboard.writeText(window.location.href);
		setLinkTxt("Copied! 🎉");
		setTimeout(() => {
			setLinkTxt("Copy Link");
		}, 3000);
	}, []);

	const handleClearParams = () => {
		searchParams.delete("bookingId");
		setSearchParams(searchParams);
	};
	return (
		<Drawer className={styles.bookingDrawer}>
			<DrawerHeader handleClose={handleClearParams} className={styles.bookingDrawer__header}>
				<Pillcase className={styles.bookingDrawer__header__pills}>
					<Pill value="low" icon="bookings" colour="black">
						Booking
					</Pill>
					<Pill value="medium" colour="black">
						Lake 1
					</Pill>{" "}
					<Pill value="high" icon="pound" colour="black">
						Paid
					</Pill>
					<Pill value="low" colour="black">
						Lake Exclusive
					</Pill>
					<Pill value="medium" icon="food" colour="black">
						Food Package
					</Pill>{" "}
				</Pillcase>
				<div className={styles.bookingDrawer__header__contact}>
					<h2 className="bold">Dave Jones</h2>
					<Tooltip content={linkTxt} direction="left">
						<button onClick={handleLinkCopy} className="iconBtn">
							<Icon type="link" colour="black" />
						</button>
					</Tooltip>
				</div>
				<div className={styles.bookingDrawer__header__contact}>
					<h5>
						<span className="bold">Phone No: </span>
						<a href="tel:012345 5667788">012345 5667788</a>
					</h5>
					<h5>
						<span className="bold">Email: </span>
						<a href="mailto:dave.jones@gmail.com" target="_blank" rel="noopener noreferrer">
							dave.jones@gmail.com
						</a>
					</h5>
				</div>
			</DrawerHeader>
			<Content />
			<DrawerFooter>
				<Pillcase>
					<Button variant="success">Email Reminder</Button>
					<Button variant="destructive" onClick={handleClearParams}>
						Close
					</Button>
				</Pillcase>
			</DrawerFooter>
		</Drawer>
	);
};

export default React.memo(BookingDrawer);
