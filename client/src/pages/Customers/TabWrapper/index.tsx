import React, { useCallback } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs } from "../../../components";
import { letters } from "../../../constants";

type Props = {};

const TabWrapper = (props: Props) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const selectedId = searchParams.get("filter");
	const selectedFilter = searchParams.get("filterBy");

	const handleNewSearch = useCallback(
		(letter: string) => {
			navigate({
				pathname: "",
				search: createSearchParams({
					filter: letter,
					filterBy: selectedFilter ? selectedFilter : "firstName",
				}).toString(),
			});
		},
		[navigate, selectedFilter]
	);

	return (
		<Tabs>
			{letters.map((letter, i) => (
				<Tab
					key={letter}
					start={i === 0}
					end={i === letters.length - 1}
					handleSelection={() => handleNewSearch(letter)}
					tabId={letter}
					selectedId={selectedId ? selectedId : "A"}
				>
					{letter}
				</Tab>
			))}
		</Tabs>
	);
};

export default React.memo(TabWrapper);
