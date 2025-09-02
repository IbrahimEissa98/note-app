import axios from "axios";

export const AuthApi = axios.create({
  baseURL: "https://note-sigma-black.vercel.app/api/v1/users",
});
