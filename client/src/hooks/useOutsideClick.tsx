import { useEffect, useState } from "react";

type ValidRefTarget = {
	contains(target: EventTarget | null): any;
};

export const useOutsideClick = (ref: React.RefObject<ValidRefTarget>): boolean => {
	const [isOutside, setIsOutSide] = useState(false);
	useEffect(() => {
		setIsOutSide(false);
		const handleClickOutside = (event: Event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOutSide(true);
			} else {
				setIsOutSide(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
	return isOutside;
};
