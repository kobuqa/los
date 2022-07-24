import { User } from '../../../libs/types/User.type';
import {api} from "../../instance";

export const getSpecialistById = (id:string) => api.get<User[]>(`/specialists/${id}`)
