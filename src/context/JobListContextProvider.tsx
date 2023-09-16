import { ReactNode, createContext, useEffect, useState } from "react";
import data from "../data/data.json";
import { Job, JobListContextType, JobState } from "../type/Job";

export const JobListContext = createContext<JobListContextType>({
	data: [],
	filteredJobs: [],
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

export function JobListContextProvider({ children }: Props) {
	const [state, setState] = useState<JobState>({
		data,
		filteredJobs: [],
		filters: new Set([]),
		loading: false,
		error: null,
	});

	useEffect(() => {
		const filteredJobs = state.filters.size === 0 ? [] : filtersJobs();
		setState((prev) => ({
			...prev,
			filteredJobs,
		}));
	}, [state.filters]);

	function filtersJobs(): Job[] {
		return state.data.filter((job) => {
			const filters = [...job.languages, ...job.tools];
			return filters.some((filter) => state.filters.has(filter));
		});
	}

	function handleClearFilters(): void {
		const emptyFilters = new Set<string>([]);
		setState((prev) => ({
			...prev,
			filters: emptyFilters,
			filteredJobs: [],
		}));
	}

	function handleAddFilter(filter: string): void {
		setState((prev) => ({
			...prev,
			filters: state.filters.add(filter),
			filteredJobs: filtersJobs(),
		}));
	}

	function handleRemoveFilter(filter: string): void {
		const removedFilter = new Set<string>([...state.filters]);
		removedFilter.delete(filter);

		setState((prev) => ({
			...prev,
			filters: removedFilter,
			filteredJobs: filtersJobs(),
		}));
	}

	return (
		<JobListContext.Provider
			value={{
				data: state.data,
				filteredJobs: state.filteredJobs,
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
