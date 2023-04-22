import React from 'react';
import cx from 'classnames';
import styles from './cardBody.module.scss';

type TProps = {
	children: React.ReactNode;
	className?: string;
};

const CardBody = ({ children, className }: TProps) => {
	return <div className={cx(styles['card-body'], className)}>{children}</div>;
};

export default CardBody;
