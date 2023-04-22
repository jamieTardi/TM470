import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import cx from "classnames";
import styles from "./lakeCards.module.scss";
import { Card, CardBody, CardHeader, Loading } from "../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import Content from "./Content";

const LakeCards = () => {
	const lakeSelector = useSelector<RootState>((state) => state.lakes) as any;
	const navigate = useNavigate();

	const handleNavigate = (id: string) => {
		navigate({
			pathname: "",
			search: createSearchParams({
				lakeId: id,
			}).toString(),
		});
	};

	if (lakeSelector.loading || !lakeSelector.lakes) {
		return <Loading />;
	}

	return lakeSelector.lakes.map((lake: TLake, i: number) => (
		<button onClick={() => handleNavigate(`${lake._id}`)} className={cx(styles.card, "no-border-background")} key={i}>
			<Card className="card-container">
				<CardHeader className={styles.card__cardHeader}>
					<h3>{lake.name}</h3>
					<h4>Reference: {lake.lakeRef}</h4>
				</CardHeader>
				<CardBody className={styles.card__cardBody}>
					<Content lake={lake} />
				</CardBody>
			</Card>
		</button>
	));
};

export default React.memo(LakeCards);
