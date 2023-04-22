import React, { forwardRef, memo, HTMLProps } from 'react';
import cx from 'classnames';
import styles from './button.module.scss';
import Icon from '../../icon/index';
import { Loading } from '../../index';

type TOwnProps = {
	variant?: string;
	type?: 'button' | 'submit' | 'reset';
	buttonSize?: 'default' | 'small';
	icon?: string;
	isLoading?: boolean;
	iconPosition?: 'left' | 'right';
	children: React.ReactNode;
};
type TComponentProps = TOwnProps & HTMLProps<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, TComponentProps>(
	(
		{
			children,
			className,
			type = 'button',
			buttonSize = 'default',
			isLoading = false,
			icon = '',
			iconPosition = 'left',
			disabled = false,
			variant = 'default',
			...props
		},
		ref,
	) => {
		return (
			<button
				type={type}
				disabled={isLoading || disabled}
				className={cx(styles.button, className)}
				data-isloading={isLoading}
				data-variant={variant}
				data-size={buttonSize}
				data-iconposition={iconPosition}
				ref={ref}
				{...props}
				data-hasicon={!!icon}>
				{icon && (
					<Icon
						type={icon}
						data-testid='icon'
						size='small'
						className='button__icon'
					/>
				)}
				<span className='button__content'>{children}</span>
				{isLoading && (
					<Loading
						size='16px'
						data-testid='loading'
						className='button__loading'
					/>
				)}
			</button>
		);
	},
);

export default memo(Button);
