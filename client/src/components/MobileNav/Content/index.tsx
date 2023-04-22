import React, { useCallback } from "react";
import cx from "classnames";
import styles from "./content.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Icon, Tooltip } from "../../";

type TProps = {
	className?: string;
};

const Content = ({ className }: TProps) => {
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
				<li>
					<Tooltip content="Dashboard" direction="right">
						<Link to="/dashboard" className={styles.nav__link}>
							<h2>Dashboard</h2>
							<Icon type="dashboard" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li>
					<Tooltip content="Bookings" direction="right">
						<Link to="/bookings" className={styles.nav__link}>
							<h2>Bookings</h2>
							<Icon type="bookings" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li>
					<Tooltip content="Customers" direction="right">
						<Link to="/customers" className={styles.nav__link}>
							<h2>Customers</h2>
							<Icon type="customers" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li>
					<Tooltip content="Lakes" direction="right">
						<Link to="/lakes" className={styles.nav__link}>
							<h2>My Lakes</h2>
							<Icon type="water" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li>
					<Tooltip content="Staff" direction="right">
						<Link to="/staff" className={styles.nav__link}>
							<h2>Staff</h2>
							<Icon type="staff" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
				<li>
					<Tooltip content="Overview" direction="right">
						<Link to="/overview" className={styles.nav__link}>
							<h2>Availability Overview</h2>
							<Icon type="overview" size={iconSize} />
						</Link>
					</Tooltip>
				</li>
			</ul>
			<div>
				<div className={styles.nav__logout}>
					<Tooltip content="Logout" direction="right">
						<button onClick={handleLogout} className={styles.nav__link}>
							<h2>Logout</h2>
							<Icon type="logout" size={iconSize} />
						</button>
					</Tooltip>
				</div>
			</div>
		</nav>
	);
};

export default React.memo(Content);
