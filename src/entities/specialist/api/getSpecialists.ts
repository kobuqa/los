import axios from "axios";
import {User} from "../../../shared/libs/types/User.type";

export const fetchSpecialists = () =>  axios.get<User[]>('http://vk.com')
