import axios from "axios";

export const api = axios.create({
	baseURL: 'https://league-of-slaves.herokuapp.com/api/',
})
