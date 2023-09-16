export type Job = {
	company: string;
	contract: string;
	featured: boolean;
	id: number;
	languages: string[];
	level: string;
	location: string;
	logo: string;
	new: boolean;
	position: string;
	postedAt: string;
	role: string;
	tools: string[];
};

export type JobState = {
	data: Job[];
	filteredJobs: Job[];
	filters: Set<string>;
	loading: boolean;
	error: null | string;
};

export type JobListContextType = {
	data: Job[];
	filteredJobs: Job[];
	filters: Set<string>;
	loading: boolean;
	error: null | string;
	handleClearFilters: () => void;
	handleAddFilter: (filter: string) => void;
	handleRemoveFilter: (filter: string) => void;
};
