import React from "react";
import { titleCase } from "../../../../utils/toTitleCase";
import Input from "../../../forms/Input";
import Select from "../../../forms/Select";
import DrawerContent from "../../../general/Drawer/DrawerContent";

type TProps = {
	staffMember: IUser;
	setStaffMember: React.Dispatch<React.SetStateAction<IUser>>;
};

const Content = ({ staffMember, setStaffMember }: TProps) => {
	const options: TRole[] = ["admin", "baliff"];

	return (
		<DrawerContent>
			<h2>Add Details</h2>
			<div>
				<Input
					title="First Name"
					name="firstName"
					setValueUpdate={setStaffMember}
					valueUpdate={staffMember}
					// currentValue={currentLake?.name}
					required={true}
					className="input"
					type="input"
				/>
				<Input
					title="Last Name"
					name="lastName"
					setValueUpdate={setStaffMember}
					valueUpdate={staffMember}
					// currentValue={currentLake?.name}
					required={true}
					className="input"
					type="input"
				/>
			</div>
			<div>
				<Input
					title="Email"
					name="email"
					setValueUpdate={setStaffMember}
					valueUpdate={staffMember}
					// currentValue={currentLake?.name}
					required={true}
					className="input"
					type="email"
				/>
				<Input
					title="Phone Number"
					name="phoneNo"
					setValueUpdate={setStaffMember}
					valueUpdate={staffMember}
					// currentValue={currentLake?.name}
					required={true}
					className="input"
				/>
			</div>
			<div>
				<Select
					label="Select a filter"
					handleChange={(id: TRole) => setStaffMember({ ...staffMember, role: id })}
					defaultValue={staffMember.role}
				>
					{options.map((choice) => (
						<option key={choice} value={choice}>
							{titleCase(choice)}
						</option>
					))}
				</Select>
			</div>
		</DrawerContent>
	);
};

export default React.memo(Content);
