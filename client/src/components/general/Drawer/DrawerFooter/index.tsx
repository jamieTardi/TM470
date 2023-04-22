import React from 'react';
import styles from '../drawer.module.scss';
import cx from 'classnames';

type TProps = {
	children: React.ReactNode;
	className?: string;
};

const DrawerFooter = ({ children, className }: TProps) => {
	return (
		<footer className={cx(styles.drawerFooter, className)}>{children}</footer>
	);
};

export default React.memo(DrawerFooter);
