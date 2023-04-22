import React from "react";
import { timeOfDay } from "../../../utils/timeOfDay";
import Icon from "../../icon";
import styles from "./topbar.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import Loading from "../Loading";
import { format } from "date-fns";

const TopBar = () => {
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const isLoading = useSelector<RootState>((state) => state.auth.loading) as Boolean;

	const greeting = !isLoading ? `${timeOfDay()} ${user.firstName}` : <Loading />;
	return (
		<section className={styles.topbar}>
			<div className={styles.topbar__date}>
				<span>{greeting}</span>
				<span>{format(new Date(), "eeee do MMMM yyyy")} </span>
			</div>
			<div className={styles.topbar__search}>
				<input className={styles.topbar__search__input} type="text" placeholder="Search..." />
			</div>
			<div className={styles.topbar__icon}>
				<Icon type="alert" size="medium" colour="blue" />
			</div>
		</section>
	);
};

export default React.memo(TopBar);
