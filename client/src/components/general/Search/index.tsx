import React, { useRef } from "react";
import styles from "./search.module.scss";
import { DebounceInput } from "react-debounce-input";
import Loading from "../Loading";
import cx from "classnames";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

type TProps = {
	handleUpdateSearch: Function;
	children: React.ReactNode;
	isLoading: boolean;
	showMenu: boolean;
	className?: string;
	searchTerm?: string | null;
};

const Search = ({ handleUpdateSearch, children, isLoading, showMenu, className, searchTerm }: TProps) => {
	const wrapperRef = useRef(null);
	const isOutsideBox = useOutsideClick(wrapperRef);

	return (
		<div className={styles.search} ref={wrapperRef}>
			<DebounceInput
				className={cx(styles.search__input, className)}
				debounceTimeout={400}
				minLength={2}
				type="text"
				placeholder="Search..."
				value={searchTerm ? searchTerm : ""}
				onChange={(e) => handleUpdateSearch(e.target.value)}
			/>
			{isLoading ? (
				<div className={cx(styles.search__list, { loading: isLoading })}>
					<span>
						<Loading /> ...Loading results
					</span>
				</div>
			) : (
				<>{showMenu && !isOutsideBox && <ul className={cx(styles.search__list)}>{children}</ul>}</>
			)}
		</div>
	);
};

export default React.memo(Search);
