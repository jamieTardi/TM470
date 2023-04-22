import React, { useCallback } from "react";
import cx from "classnames";
import styles from "./nav.module.scss";
import Icon from "../../icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "../../index";

type TProps = {
	className?: string;
};

const Nav = ({ className }: TProps) => {
	const { pathname } = useLocation();

	const iconSize = "x-large";

	const navigate = useNavigate();
	const handleLogout = useCallback(() => {
		localStorage.removeItem("lake-email");
		localStorage.removeItem("lake-token");

		navigate("/logout");
	}, [navigate]);
	return (
		<nav className={cx(styles.nav, className)}>
			<ul className={styles.nav__icons}>
				<li className={cx({ [styles.selected]: pathname === "/dashboard" })}>
					<Tooltip content="Dashboard" direction="right">
						<Link to="/dashboard">
							<Icon type="dashboard" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li className={cx({ [styles.selected]: pathname.includes("bookings") })}>
					<Tooltip content="Bookings" direction="right">
						<Link to="/bookings">
							<Icon type="bookings" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li className={cx({ [styles.selected]: pathname.includes("customers") })}>
					<Tooltip content="Customers" direction="right">
						<Link to="/customers">
							<Icon type="customers" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li className={cx({ [styles.selected]: pathname.includes("lakes") })}>
					<Tooltip content="Lakes" direction="right">
						<Link to="/lakes">
							<Icon type="water" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li className={cx({ [styles.selected]: pathname.includes("staff") })}>
					<Tooltip content="Staff" direction="right">
						<Link to="/staff">
							<Icon type="staff" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li className={cx({ [styles.selected]: pathname.includes("overview") })}>
					<Tooltip content="Overview" direction="right">
						<Link to="/overview">
							<Icon type="overview" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
			</ul>
			<div>
				<div className={styles.nav__logout}>
					<Tooltip content="Logout" direction="right">
						<button onClick={handleLogout}>
							<Icon type="logout" size={iconSize} />
						</button>
					</Tooltip>
				</div>
			</div>
		</nav>
	);
};

export default React.memo(Nav);
