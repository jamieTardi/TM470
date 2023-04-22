import React, { useCallback, useEffect } from "react";
import styles from "../lakeDrawer.module.scss";
import { DrawerContent, Input, Checkbox, Location, Loading } from "../../../";
import { useShowMap } from "../../../../hooks/useShowMap";

type TProps = {
	className: string;
	lake: TLake;
	setLake: React.Dispatch<React.SetStateAction<any>>;
	setIsDisabled?: React.Dispatch<React.SetStateAction<any>>;
	currentLake: TLake | undefined;
};

const Content = ({ className, lake, setLake, setIsDisabled, currentLake }: TProps) => {
	const showMap = useShowMap();
	const handleUpdateCheckbox = useCallback(
		(value: boolean, valueKey: string) => {
			setLake((prevLake: TLake) => ({ ...prevLake, specifics: { ...prevLake.specifics, [valueKey]: value } }));
		},
		[setLake]
	);

	const handleUpdateLocation = useCallback(
		(location: string[]) => {
			setLake((prevLake: TLake) => ({ ...prevLake, location: { ...prevLake.location, gps: location } }));
		},
		[setLake]
	);

	useEffect(() => {
		if (!lake.location || !lake.maxUsers || !lake.name || !lake.phone || !lake.depth || !lake.lakeRef) {
			setIsDisabled!(true);
			return;
		}
		setIsDisabled!(false);
	}, [lake.name, lake.location, lake.maxUsers, lake.phone, lake.depth, setIsDisabled, lake.lakeRef]);

	return (
		<DrawerContent className={className}>
			<div className={styles["drawer__content--form--group1"]}>
				<Input
					title="Lake Name"
					name="name"
					setValueUpdate={setLake}
					valueUpdate={lake}
					currentValue={currentLake?.name}
					required={true}
					className="input"
				/>
				<Input
					title="Lake contact number"
					name="phone"
					setValueUpdate={setLake}
					valueUpdate={lake}
					currentValue={currentLake?.phone}
					required={true}
					className="input"
				/>
			</div>
			<div className={styles["drawer__content--form--group2"]}>
				<Input
					title="Maximum guests"
					name="maxUsers"
					setValueUpdate={setLake}
					valueUpdate={lake}
					type="number"
					required={true}
					currentValue={currentLake?.maxUsers}
				/>
				<Input
					title="Approximate depth (in metres)"
					name="depth"
					setValueUpdate={setLake}
					valueUpdate={lake}
					type="number"
					required={true}
					className="input"
					currentValue={currentLake?.depth}
				/>
			</div>
			<div className={styles["drawer__content--form--group5"]}>
				<Input
					title="Lake Reference max 4 Letters (used for email references)"
					name="lakeRef"
					setValueUpdate={setLake}
					valueUpdate={lake}
					required={true}
					placeholder="e.g. BLU"
					inputLength={4}
					className="input"
					currentValue={currentLake?.lakeRef}
				/>
				<Input
					title="Lake email address (for customer replies)"
					name="email"
					setValueUpdate={setLake}
					valueUpdate={lake}
					required={true}
					type="email"
					currentValue={currentLake?.email}
				/>
				<Input
					title="Lake website (optional)"
					name="website"
					setValueUpdate={setLake}
					valueUpdate={lake}
					required={false}
					currentValue={currentLake?.website}
				/>
			</div>
			<h4 className={styles["drawer__content--form--title"]}>Lake Specifics</h4>
			<div className={styles.checkboxWrapper}>
				<div className={styles["drawer__content--form--group3"]}>
					<Checkbox
						label="Allows food packages"
						valueKey="hasFood"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.hasFood}
					/>
					<Checkbox
						label="Allows Dogs"
						valueKey="allowsDogs"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.allowsDogs!}
					/>
					<Checkbox
						label="Allows parking by swim"
						valueKey="allowsSwimParking"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.allowsSwimParking!}
					/>
					<Checkbox
						label="Allows Fires"
						valueKey="allowsFires"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.allowsFires!}
					/>
					<Checkbox
						label="Allows own bait"
						valueKey="allowsOwnBait"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.allowsOwnBait!}
					/>
					<Checkbox
						label="WiFi Avaliable"
						valueKey="hasWifi"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.hasWifi!}
					/>
				</div>
				<div className={styles["drawer__content--form--group4"]}>
					<Checkbox
						label="Allows individual bookings"
						valueKey="allowsIndividualBookings"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.allowsIndividualBookings!}
					/>
					<Checkbox
						label="Slings provided"
						valueKey="hasSlings"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.hasSlings!}
					/>
					<Checkbox
						label="Sells merchandise"
						valueKey="hasMerchandise"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.hasMerchandise!}
					/>
					<Checkbox
						label="Shower blocks provided"
						valueKey="hasShowers"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.hasShowers!}
					/>
					<Checkbox
						label="Toilets provided"
						valueKey="toiletsProvided"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.toiletsProvided!}
					/>
					<Checkbox
						label="Has a on site baliff"
						valueKey="hasBaliff"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.hasBaliff!}
					/>
					<Checkbox
						label="Allows BBQ's"
						valueKey="allowsBBQ"
						handleCheckboxChange={handleUpdateCheckbox}
						defaultChecked={currentLake?.specifics.allowsBBQ!}
					/>
				</div>
			</div>
			{showMap ? (
				<Location
					className={styles["drawer__content--form--group5"]}
					handleUpdateLocation={handleUpdateLocation}
					currentLocation={currentLake?.location.gps!}
				/>
			) : (
				<Loading />
			)}
		</DrawerContent>
	);
};

export default React.memo(Content);
