import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}` + "/api" + "/v1";

const instance = axios.create({
  baseURL: BASE_URL,
});
export default instance;
