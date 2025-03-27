import axios from "axios";

const BASE_URL = "https://api.escuelajs.co" + "/api" + "/v1";

const instance = axios.create({
  baseURL: BASE_URL,
});
export default instance;
