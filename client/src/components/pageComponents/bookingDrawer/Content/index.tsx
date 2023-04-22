import React from 'react';
import DrawerContent from '../../../general/Drawer/DrawerContent';
import styles from './content.module.scss';

type Props = {};

const Content = (props: Props) => {
	return (
		<DrawerContent className={styles.content}>
			<h4>
				<span className='bold'>Booking ID:</span> 123456
			</h4>

			<div className={styles.content__dates}>
				<h5>
					<span className='bold'>Arrival:</span> 01/02/2022
				</h5>
				<h5>
					<span className='bold'>Departure:</span> 08/02/2022
				</h5>
			</div>
			<div className={styles.content__dates}>
				<h5>
					<span className='bold'>Lake:</span> Bluewater
				</h5>
				<h5>
					<span className='bold'>Booking type:</span> Exclusive
				</h5>
			</div>
			<h3 className='bold'>Notes</h3>
			<p>
				This is where any special notes about the customer will be placed. Lorem
				ipsum dolor sit amet consectetur adipisicing elit. Voluptates, pariatur.
				Quibusdam exercitationem nulla illo odit facere? Explicabo perspiciatis
				qui laborum incidunt laboriosam esse, a molestias officia vero
				reprehenderit fuga quos nesciunt ad? Repellat delectus consequatur
				dolor, dolorem beatae quis dolores amet sed! Quae ipsam, esse incidunt
				iste cum nulla ipsa.
			</p>
		</DrawerContent>
	);
};

export default React.memo(Content);
