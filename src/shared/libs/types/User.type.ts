import { Availability } from "./Availability.enum";

export type User = {
  card: UserCard;
  cv: UserCV;
};

export interface UserCard {
  availability: keyof typeof Availability;
  experience: number;
  id: number;
  image: string;
  name: string;
  location: Location;
  specialization: Specialization;
}

export type Specialization = {
  domain: string;
  id: number;
  name: string;
};
export interface UserCV {
	about: string;
  englishLevel: string;
  skills: Skill[]
  education: Education[]
  projects: Project[]
  certificates: Certificate[]
}

export type Skill = {
  id: number;
  name: string;
}

export type Location = {
  id: number;
  name: string;
  timeZone: string;
};
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
