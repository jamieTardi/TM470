import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from './graph.module.scss';
import 'chart.js/auto';

const data = {
	label: 'Customers Paid',
	labels: ['Not Paid', 'Paid'],
	datasets: [
		{
			data: [300, 50],
			labels: ['On track', 'Remaining'],
			backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
			hoverOffset: 4,
		},
	],
};

const WeekAhead = () => {
	return (
		<section className={styles.graph}>
			<h2>Customers paid for the season</h2>
			<div className={styles.graph__graphContainer}>
				<div className={styles.graph__graphContainer__graph}>
					<Doughnut data={data} />
				</div>
				<div className={styles.graph__graphContainer__table}>
					<h4>Number of customers paid</h4>
					<ul>
						<li>
							<span>Paid:</span> 50
						</li>
						<li>
							<span>Awaiting payment:</span> 300
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default React.memo(WeekAhead);
