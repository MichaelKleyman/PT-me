import Axios from "axios";


export const BASE_URL = "https://super-ant-cummerbund.cyclic.app";
// export const BASE_URL = "http://localhost:3001";

export const CLIENT = Axios.create({ baseURL: BASE_URL });
