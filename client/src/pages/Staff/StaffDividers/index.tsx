import React from "react";
import StaffCard from "../../../components/pageComponents/StaffCard";
import styles from "./staffDividers.module.scss";

type TProps = {
	staff: IUser[];
};

const StaffDivider = ({ staff }: TProps) => {
	const owners = staff.filter((staffMember) => staffMember.role === "owner");
	const admins = staff.filter((staffMember) => staffMember.role === "admin");
	const baliffs = staff.filter((staffMember) => staffMember.role === "baliff");
	return (
		<section className={styles.staffDividers}>
			<div>
				<div className={styles.staffDividers__header}>
					<h3>Lake Owner</h3>
				</div>
				<div className={styles["staffDividers__card-container"]}>
					{owners.map((staffMember) => (
						<StaffCard key={staffMember._id} staff={staffMember} />
					))}
				</div>
			</div>
			{Boolean(admins.length) && (
				<div>
					<div className={styles.staffDividers__header}>
						<h3>Lake Admins</h3>
					</div>
					<div className={styles["staffDividers__card-container"]}>
						{admins.map((staffMember) => (
							<StaffCard key={staffMember._id} staff={staffMember} />
						))}
					</div>
				</div>
			)}
			{Boolean(baliffs.length) && (
				<div>
					<div className={styles.staffDividers__header}>
						<h3>Lake Baliffs</h3>
					</div>
					<div className={styles["staffDividers__card-container"]}>
						{baliffs.map((staffMember) => (
							<StaffCard key={staffMember._id} staff={staffMember} />
						))}
					</div>
				</div>
			)}
		</section>
	);
};

export default React.memo(StaffDivider);
