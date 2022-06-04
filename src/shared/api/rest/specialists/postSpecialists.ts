import {SpecialistDto} from "./specialist.dto";
import {api} from "../../instance";

export const postSpecialists = (skills: SpecialistDto[]) => api.post('/specialists', skills)
