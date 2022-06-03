import {SkillDto} from "./skill.dto";
import {api} from "../../instance";

export const postSkills = (skills: SkillDto[]) => api.post('/skills', skills)
