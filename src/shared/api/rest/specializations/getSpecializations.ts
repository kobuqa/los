import {api} from "../../instance";
import {SpecializationDto} from "./specialization.dto";

interface SpecializationResponse extends SpecializationDto {
	id: number;
}

export const getSpecializations = () => api.get<SpecializationResponse[]>('/specializations')
