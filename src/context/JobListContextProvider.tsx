import { ReactNode, createContext, useEffect, useState } from "react";
import data from "../data/data.json";
import { Job } from "../type/Job";

type JobListContextType = {
	data: Job[];
	filters: Set<string>;
	loading: boolean;
	error: null | string;
	handleClearFilters: () => void;
	handleAddFilter: (filter: string) => void;
	handleRemoveFilter: (filter: string) => void;
};

export const JobListContext = createContext<JobListContextType>({
	data: [],
	filters: new Set<string>(),
	loading: false,
	error: null,
	handleClearFilters: () => {},
	handleAddFilter: () => {},
	handleRemoveFilter: () => {},
});

type Props = {
	children: ReactNode;
};

type JobState = {
	data: Job[];
	filters: Set<string>;
	loading: boolean;
	error: null | string;
};

export function JobListContextProvider({ children }: Props) {
	const [state, setState] = useState<JobState>({
		data,
		filters: new Set([]),
		loading: false,
		error: null,
	});

	useEffect(() => {
		const filteredJobs = filtersJobs();
		setState((prev) => ({
			...prev,
			data: filteredJobs.length ? filteredJobs : data,
		}));
	}, [state.filters]);

	function filtersJobs(): Job[] {
		const filteredJobs: Job[] = [];
		for (const element of state.filters) {
			for (const job of state.data) {
				if (job.languages.includes(element) || job.tools.includes(element)) {
					filteredJobs.push(job);
				}
			}
		}
		return filteredJobs;
	}

	function handleClearFilters(): void {
		const emptyFilters = new Set<string>([]);
		setState((prev) => ({
			...prev,
			filters: emptyFilters,
			data,
		}));
	}

	function handleAddFilter(filter: string): void {
		setState((prev) => ({
			...prev,
			filters: state.filters.add(filter),
			data: filtersJobs(),
		}));
	}

	function handleRemoveFilter(filter: string): void {
		const removedFilter = new Set<string>([...state.filters]);
		removedFilter.delete(filter);

		setState((prev) => ({
			...prev,
			filters: removedFilter,
			data: filtersJobs(),
		}));
	}

	return (
		<JobListContext.Provider
			value={{
				data: state.data,
				filters: state.filters,
				loading: state.loading,
				error: state.error,
				handleClearFilters: handleClearFilters,
				handleAddFilter,
				handleRemoveFilter,
			}}
		>
			{children}
		</JobListContext.Provider>
	);
}
