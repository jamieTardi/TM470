import React, { FunctionComponent } from 'react';
import styles from './loading.module.scss';

type TLoadingProps = {
	message?: string;
	className?: string;
	size?: string;
};

const Loading: FunctionComponent<TLoadingProps> = ({
	message,
	size = '22px',
	className,
}: TLoadingProps) => {
	return (
		<span className={className}>
			<svg
				data-testid='spinner'
				className={styles.spinner}
				width={size}
				height={size}
				viewBox='0 0 66 66'
				xmlns='http://www.w3.org/2000/svg'
				shapeRendering='geometricPrecision'>
				<circle
					className={styles.path}
					fill='none'
					strokeWidth='6'
					strokeLinecap='round'
					cx='33'
					cy='33'
					r='30'
				/>
			</svg>
			{message && (
				<span
					className={styles.message}
					role='alert'
					aria-busy='true'
					aria-live='polite'>
					{message}
				</span>
			)}
		</span>
	);
};

export default React.memo(Loading);
