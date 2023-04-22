import React from 'react';
import cx from 'classnames';
import styles from './cardHeader.module.scss';

type TProps = {
	className?: string;
	children: React.ReactNode;
};

const CardHeader = ({ className, children }: TProps) => {
	return <div className={cx(styles['card-header'], className)}>{children}</div>;
};

export default CardHeader;
