import { Banner, Filters, JobList } from "./components";
import { JobListContextProvider } from "./context/JobListContextProvider";

export default function App() {
	return (
		<main>
			<JobListContextProvider>
				<Banner />
				<Filters />
				<JobList />
			</JobListContextProvider>
		</main>
	);
}
