import cx from 'classnames';
import React from 'react';
import styles from './icon.module.scss';

type TProps = {
	size?: string;
	type: string;
	variant?: string;
	title?: string;
	className?: string;
	colour?: string;
};

const Icon = ({
	size = 'medium',
	type,
	title = '',
	variant = '',
	className = '',
	colour = 'white',
}: TProps) => {
	const prefix = '/icons/';

	const iconUrl = `${prefix}${type}-${size}.svg`;

	return (
		<span
			className={cx(styles.icon, className)}
			data-variant={variant}
			data-size={size}
			data-type={type}
			data-colour={colour}
			data-testid='icon-container'>
			<img src={iconUrl} alt='' data-testid='image' />
			{!!title && (
				<span data-testid='title' className={cx(styles.icon__title, 'sr-only')}>
					{title}
				</span>
			)}
		</span>
	);
};

export default React.memo(Icon);
