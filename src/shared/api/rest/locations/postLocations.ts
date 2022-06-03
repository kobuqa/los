import {LocationDto} from "./location.dto";
import {api} from "../../instance";

export const postLocations = (locations: LocationDto[]) => api.post('/locations', locations)
