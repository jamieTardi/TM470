import React from "react";
import { cardKeyTranslation } from "../../../../utils/cardKeyTranslation";
import Icon from "../../../icon";
import styles from "./content.module.scss";
import cx from "classnames";

type TProps = {
	lake: TLake;
};

const Content = ({ lake }: TProps) => {
	return (
		<div className={styles.content}>
			<div className={styles.content__top}>
				<div>
					<span className="bold">Lake contanct number: </span>
					<span>{lake.phone}</span>
				</div>
				<div>
					<span className="bold">Maximum anglers: </span>
					<span>{lake.maxUsers}</span>
				</div>
				<div>
					<span className="bold">Lake Depth: </span>
					<span>{lake.depth}m</span>
				</div>
				<div>
					<span className="bold">Lake Location: </span>
					<span>
						Longtitude: {lake.location.gps[0]} Latitude: {lake.location.gps[1]}
					</span>
				</div>
			</div>
			<div className={styles.content__icons}>
				{Object.entries(lake.specifics).map(([key, value], i) => (
					<React.Fragment key={key}>
						{value && (
							<div key={key} className={cx(styles["content__icons--icon"], { left: i % 2 === 0 })}>
								<Icon type={cardKeyTranslation(key).icon} size="small" colour="blue" />
								<span>{cardKeyTranslation(key).text}</span>
							</div>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default React.memo(Content);
