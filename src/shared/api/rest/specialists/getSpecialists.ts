import {api} from "../../instance";
import {SpecialistDto} from "./specialist.dto";

export interface SpecialistResponse extends SpecialistDto {
	id: number;
}

export const getSpecialists = () => api.get<SpecialistResponse[]>('/specialists')
