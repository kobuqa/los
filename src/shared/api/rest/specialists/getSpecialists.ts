import { User } from './../../../libs/types/User.type';
import {api} from "../../instance";

export const getSpecialists = () => api.get<User[]>('/specialists')
