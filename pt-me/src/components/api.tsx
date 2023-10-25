import Axios from "axios";

export const BASE_URL = "https://www.ptme.us/";
// export const BASE_URL = 'http://localhost:3001';

export const CLIENT = Axios.create({ baseURL: BASE_URL });
