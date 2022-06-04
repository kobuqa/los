import { Availability } from "../types/Availability.enum";
import {SpecialistLevel} from "../types/SpecialistLevel.enum";

export const levelMapper = (level: keyof typeof SpecialistLevel) => (
	{
		[SpecialistLevel.Junior]: 'Junior',
		[SpecialistLevel.Middle]: 'Middle',
		[SpecialistLevel.Senior]: 'Senior',
		[SpecialistLevel.Teamlead]: 'Team Lead',
		[SpecialistLevel.Techlead]: 'Tech Lead',
		[SpecialistLevel.Architect]: 'Architect',
	}[SpecialistLevel[level]]
)

export const availabilityMapper = (level: keyof typeof Availability) => (
	{
		[Availability.None]: 'None',
		[Availability.PartTime]: 'Part Time',
		[Availability.FullTime]: 'Full Time',

	}[Availability[level]]
)

