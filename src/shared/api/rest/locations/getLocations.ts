import {api} from "../../instance";
import {LocationDto} from "./location.dto";

interface LocationsResponse extends LocationDto {
	id: number;
}

export const getLocations = () => api.get<LocationsResponse[]>('/locations')
