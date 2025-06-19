import axios from "axios";

const API = axios.create({
  baseURL: "http://api.library.test/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
