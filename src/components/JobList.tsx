import { useContext } from "react";
import { JobListContext } from "../context/JobListContextProvider";
import { Job } from "../type/Job";
import styles from "./JobList.module.css";
import JobListItem from "./JobListItem";

export default function JobList() {
	const { data: jobs } = useContext(JobListContext);

	return (
		<section className={styles.wrapper}>
			{jobs.map((job: Job) => (
				<JobListItem key={job.id} {...job} />
			))}
		</section>
	);
}
