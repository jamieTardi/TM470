import React, { useState } from "react";
import cx from "classnames";
import styles from "./mobileNav.module.scss";
import Icon from "../icon";
import Drawer from "../general/Drawer";
import DrawerHeader from "../general/Drawer/DrawerHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import DrawerContent from "../general/Drawer/DrawerContent";
import Content from "./Content";

type Props = {};

const MobileNav = (props: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	if (!isOpen) {
		return (
			<button className={cx(styles.mobileNav, { [styles.open]: isOpen })} onClick={() => setIsOpen(true)}>
				<Icon type="menu" size="x-large" />
			</button>
		);
	}
	return (
		<Drawer className={styles.mobileDrawer}>
			<DrawerHeader handleClose={() => setIsOpen(false)} className={styles.mobileDrawer__header} colour="white">
				Hi {user.firstName}!
			</DrawerHeader>
			<DrawerContent>
				<Content />
			</DrawerContent>
		</Drawer>
	);
};

export default React.memo(MobileNav);
