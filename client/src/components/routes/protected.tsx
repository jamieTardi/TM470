import { Navigate } from "react-router-dom";
import cx from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { FALSE } from "../../Redux/constant";
import Nav from "../general/Nav";
import TopBar from "../general/TopBar";
import styles from "./protected.module.scss";
import { useCurrentWidth } from "../../hooks/useCurrentWidth";
import MobileNav from "../MobileNav";
import { useEffect, useState } from "react";

type TProps = {
	children: any;
};

export const ProtectedRoute = ({ children }: TProps) => {
	const user = useSelector<RootState>((state) => state.auth.userAuth);
	const isMobile = useCurrentWidth() < 900;
	const [authUser, setAuthUser] = useState(true);
	useEffect(() => {
		if (user === FALSE) {
			setAuthUser(false);
			return;
		}
		setAuthUser(true);
	}, [user]);

	if (!authUser) {
		return <Navigate to="/login" />;
	}

	return (
		<div className={cx(styles.protected, "scrollable-blue")}>
			{isMobile ? <MobileNav /> : <Nav className={styles.protected__nav} />}
			<div className={styles.protected__content}>
				<TopBar />

				{children}
			</div>
		</div>
	);
};
