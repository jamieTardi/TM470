import React, { useCallback } from "react";

import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Select } from "../../../components";

const options = [
	{ id: "firstName", label: "First Name" },
	{ id: "lastName", label: "Last Name" },
	{ id: "nickName", label: "Nick Name" },
	{ id: "email", label: "email" },
];

const FilterWrapper = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const selectedId = searchParams.get("filter");

	const handleChooseFilter = useCallback(
		(id: string) => {
			navigate({
				pathname: "",
				search: createSearchParams({
					filterBy: id,
					filter: selectedId ? selectedId : "",
				}).toString(),
			});
		},
		[navigate, selectedId]
	);

	return (
		<Select label="Select a filter" handleChange={handleChooseFilter}>
			{options.map((choice) => (
				<option key={choice.id} value={choice.id}>
					{choice.label}
				</option>
			))}
		</Select>
	);
};

export default React.memo(FilterWrapper);
