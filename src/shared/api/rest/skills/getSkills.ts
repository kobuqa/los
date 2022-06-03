import {api} from "../../instance";
import {SkillDto} from "./skill.dto";

interface SkillsResponse extends SkillDto {
	id: number;
}

export const getSkills = () => api.get<SkillsResponse[]>('/skills')
