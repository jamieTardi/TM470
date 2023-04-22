import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader } from "../../../components";
import Pill from "../../../components/general/pill";
import Pillcase from "../../../components/general/pillcase";
import styles from "../dashboard.module.scss";

const Cards = () => {
	const navigate = useNavigate();

	const handleNavigate = (id: string) => {
		navigate({
			pathname: "",
			search: createSearchParams({
				bookingId: id,
			}).toString(),
		});
	};

	return (
		<>
			{[1, 2, 3].map((el, i) => (
				<button onClick={() => handleNavigate(`${i}`)} className={styles.card} key={i}>
					<Card>
						<CardHeader className={styles.dashboard__cardHeader}>
							<Pillcase>
								<Pill value="low" icon="bookings">
									Booking
								</Pill>
								<Pill value="medium">Lake 1</Pill>{" "}
								<Pill value="high" icon="pound">
									Paid
								</Pill>
								<Pill value="low">Lake Exclusive</Pill>
								<Pill value="medium" icon="food">
									Food Package
								</Pill>{" "}
							</Pillcase>
						</CardHeader>
						<CardBody className={styles.dashboard__cardBody}>
							<div className={styles.bodyHeader}>
								<div>
									<span className="bold">Arriving:</span> 27/08/2022
								</div>
								<div>
									<span className="bold">Departing:</span> 01/09/2022
								</div>
							</div>

							<p>
								<span className="bold">Information: </span>
								<span className={styles.cardBodyText}>
									The customer Dave Jones is arriving on 27/02/2022 and has booked a lake exclusive booking. There is/is
									not a food package this week.
								</span>
							</p>
						</CardBody>
					</Card>
				</button>
			))}
		</>
	);
};

export default React.memo(Cards);
