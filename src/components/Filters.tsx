import { useContext } from "react";
import { Tag } from ".";
import { JobListContext } from "../context/JobListContextProvider";
import styles from "./Filters.module.css";

export default function Filters() {
	const { filters, handleClearFilters, handleRemoveFilter } =
		useContext(JobListContext);

	if (!Array.from(filters).length) return null;

	return (
		<div className={styles.wrapper}>
			<div className={styles.filters}>
				<div className={styles.tags}>
					{Array.from(filters).map((filter) => (
						<Tag
							key={filter}
							value={filter}
							canClose
							handleRemove={() => handleRemoveFilter(filter)}
						/>
					))}
				</div>
				<button
					className={styles.clear}
					type="button"
					onClick={handleClearFilters}
				>
					Clear
				</button>
			</div>
		</div>
	);
}
