import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "";

export const Axios = axios.create({
  baseURL: API_HOST,
})
