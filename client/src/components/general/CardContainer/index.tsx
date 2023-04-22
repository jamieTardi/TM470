import React from 'react';

type TProps = {
	children: React.ReactNode;
	className?: string;
};

const CardContainer = ({ children, className }: TProps) => {
	return <section className={className}>{children}</section>;
};

export default CardContainer;
