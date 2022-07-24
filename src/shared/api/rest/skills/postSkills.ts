import {SkillDto} from "./skill.dto";
import {api} from "../../instance";

export const postSkills = (skill: SkillDto) => api.post('/skills', skill)
