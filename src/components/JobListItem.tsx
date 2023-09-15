import { useContext } from "react";
import { Badge, Tag } from ".";
import { JobListContext } from "../context/JobListContextProvider";
import { Job } from "../type/Job";
import styles from "./JobListItem.module.css";

export default function JobListItem({
	company,
	logo,
	new: newFeature,
	featured,
	position,
	postedAt,
	contract,
	location,
	languages,
	tools,
}: Omit<Job, "id">) {
	const { handleAddFilter } = useContext(JobListContext);
	const tecnologies = new Set([...languages, ...tools]);
	const newJobClassName = newFeature
		? `${styles.card} ${styles.cardNew}`
		: styles.card;

	return (
		<article className={newJobClassName}>
			<div className={styles.header}>
				<img className={styles.logo} src={logo} alt={company} />
				<div className={styles.information}>
					<header className={styles.company}>
						<h3 className={styles.brand}>{company}</h3>
						<div className={styles.features}>
							<Badge isNew={newFeature} show={newFeature} value="New!" />
							<Badge show={featured} value="Featured" />
						</div>
					</header>
					<div className={styles.content}>
						<h2 className={styles.title}>{position}</h2>
						<ul className={styles.specs}>
							<li className={styles.spec}>{postedAt}</li>
							<li className={styles.spec}>{contract}</li>
							<li className={styles.spec}>{location}</li>
						</ul>
					</div>
				</div>
			</div>
			<div className={styles.separator} />
			<footer className={styles.footer}>
				<div className={styles.tags}>
					{Array.from(tecnologies).map((tecnology) => (
						<Tag
							key={tecnology}
							value={tecnology}
							handleAdd={() => {
								console.log("hel");
								handleAddFilter(tecnology);
							}}
						/>
					))}
				</div>
			</footer>
		</article>
	);
}
