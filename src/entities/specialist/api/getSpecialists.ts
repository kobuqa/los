import {User} from "../../../shared/libs/types/User.type";
import {api} from "../../../shared/api/instance";

export const fetchSpecialists = () =>  api.get<User[]>('/specialists')
