import {SpecializationDto} from "./specialization.dto";
import {api} from "../../instance";

export const postSpecializations = (skills: SpecializationDto[]) => api.post('/specializations', skills)
