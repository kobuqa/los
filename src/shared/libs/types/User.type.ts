

export type User = {
	id: number;
	name: string;
	specializationId: number;
	level: string;
	locationId: number;
	skillIds: number[];
	about: string;
	englishLevel: string;
	projects: Project[];
	education: Education[];
	certificates: Certificate[];
	availability: string;
}
export interface Project {
	id: number;
	title: string;
	description: string;
	role: string;
	techStack: string;
	language: string;
	team: string;
	startDate: Date;
	endDate: Date;
}

export interface Education {
	id: number;
	organisationName: string;
	type: string;
	specialization: string;
	title: string;
	startDate: Date;
	endDate: Date;
}

export interface Certificate {
	id: number;
	title: string;
	description: string;
	url: string;
	image: string;
	gettingDate: Date;
}
