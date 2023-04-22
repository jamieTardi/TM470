import { useState, useEffect } from "react";

export const useShowMap = () => {
	const [showMap, setShowMap] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowMap(true);
		}, 1000);
	}, []);
	return showMap;
};
