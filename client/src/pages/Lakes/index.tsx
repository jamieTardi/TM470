import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../Redux/store";
import { LakeCards, Tooltip } from "../../components/index";
import LakeDrawer from "../../components/pageComponents/LakeDrawer";
import { Button } from "../../components/index";
import { fetchLakes } from "../../Redux/slices/lakeSlice";
import styles from "./lakesHome.module.scss";
import cx from "classnames";
import Icon from "../../components/icon";

const LakesHome = () => {
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const [searchParams] = useSearchParams();
	const lakeId = searchParams.get("lakeId");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleNewLake = useCallback(() => {
		navigate({
			pathname: "",
			search: createSearchParams({
				lakeId: "new",
			}).toString(),
		});
	}, [navigate]);

	useEffect(() => {
		if (!user._id || !Object.keys(user).length) {
			return;
		}
		dispatch(fetchLakes(user.parentId ? user.parentId : user._id));
	}, [dispatch, user]);

	return (
		<>
			<div className={cx(styles.lakes)}>
				<div className={styles.lakes__top}>
					<h1>Lakes for {user.firstName}</h1>
					<Tooltip direction="left" content="Add a new lake">
						<Button variant="success" onClick={handleNewLake}>
							<Icon type="plus" size="x-large" />
						</Button>
					</Tooltip>
				</div>
				<div className={styles.lakes__cards}>
					<LakeCards />
				</div>
			</div>
			{lakeId && (
				<>
					<div className="overlay" />
					<LakeDrawer />
				</>
			)}
		</>
	);
};

export default React.memo(LakesHome);
