import { getRoles } from "@testing-library/react";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Pill } from "../../";
import { titleCase } from "../../../utils/toTitleCase";
import Icon from "../../icon";
import styles from "./staffCard.module.scss";

type TProps = {
	staff: IUser;
};

const StaffCard = ({ staff }: TProps) => {
	const getStaffImage = (): string => {
		let staffImage;
		switch (staff.role) {
			case "owner":
				staffImage = "images/boss.png";
				break;
			case "admin":
				staffImage = "images/admin.png";
				break;
			default:
				staffImage = "images/fisherman.png";
		}
		return staffImage;
	};
	return (
		<div className={styles.staffCard}>
			<div className={styles["staffCard__card-header"]}>
				<img
					className={styles["staffCard__card-img"]}
					src="https://images.pexels.com/photos/5538276/pexels-photo-5538276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					alt="fisherman"
				/>
			</div>
			<div className={styles["staffCard__card-body"]}>
				<Pill value="maintenance">{titleCase(staff.role)}</Pill>
				<div className={styles["staffCard__card-title-container"]}>
					<h4 className={styles["staffCard__card-title"]}>
						{titleCase(staff.firstName)} {titleCase(staff.lastName)}
					</h4>
					<button>
						<Icon type="open" size="small" colour="black" />
					</button>
				</div>
				<div className={styles["staffCard__details"]}>
					<img src="images/telephone.png" alt="phone" />
					<p>
						<span className="bold">Phone:</span> <a href={`tel:${staff.phoneNo}`}>{staff.phoneNo}</a>
					</p>
				</div>
				<div className={styles["staffCard__details"]}>
					<img src="images/email.png" alt="email" />
					<p>
						<span className="bold">Email:</span>{" "}
						<a href={`mailto:${staff.email}`} className="underline" target="_blank" rel="noopener noreferrer">
							{staff.email}
						</a>
					</p>
				</div>
				<div className={styles["staffCard__details"]}>
					<img src="images/lake.png" alt="lake" />
					<p>
						<span className="bold">My Lakes:</span> Bluewater
					</p>
				</div>
				<div className={styles["staffCard__user"]}>
					<img src={getStaffImage()} alt="user" />
					<div className={styles["staffCard__user-info"]}>
						<h5>
							<span className="bold">Role:</span> {titleCase(staff.role)}
						</h5>
						<small>
							<span className="bold">Joined:</span>{" "}
							{formatDistanceToNow(staff.createdOn ? new Date(staff.createdOn) : new Date())} ago
						</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(StaffCard);
