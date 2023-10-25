import Axios from "axios";

export const BASE_URL = "https://pt-me-exnl.onrender.com";
// export const BASE_URL = 'http://localhost:3001';

export const CLIENT = Axios.create({ baseURL: BASE_URL });
