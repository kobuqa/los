import {SpecialistDto} from "../specialists/specialist.dto";
import {api} from "../../instance";

export const postSpecialists = (specialist: SpecialistDto) => api.post('/specialists', specialist)
