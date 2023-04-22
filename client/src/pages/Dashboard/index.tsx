import Cards from "./Cards";
import styles from "./dashboard.module.scss";
import Weather from "./Weather";
import Graph from "./Graph";
import BookingDrawer from "../../components/pageComponents/bookingDrawer";
import { useSearchParams } from "react-router-dom";
import cx from "classnames";
import { CardContainer } from "../../components";
import React from "react";
import MiniCardWrapper from "./MiniCardWrapper";

const Dashboard = () => {
	const [searchParams] = useSearchParams();
	const bookingId = searchParams.get("bookingId");

	return (
		<div className={styles.dashboard}>
			<section className={cx(styles.dashboard__main, "scrollable-blue")}>
				<div className={styles.dashboard__main__weather}>
					<Weather />
				</div>
				<div className={styles.dashboard__main__graph}>
					<Graph />
				</div>

				<div className={styles.dashboard__main__graph2}>
					<Graph />
				</div>

				<CardContainer className={cx(styles.dashboard__main__miniCards)}>
					<MiniCardWrapper />
				</CardContainer>

				<CardContainer className={cx(styles.dashboard__main__cards)}>
					<Cards />
				</CardContainer>
			</section>

			{bookingId && (
				<>
					<div className="overlay" />
					<BookingDrawer />
				</>
			)}
		</div>
	);
};

export default React.memo(Dashboard);
