import axios from "axios";

const BASE_URL = "http://localhost:3500";
// const BASE_URL = "https://4038-2001-569-52c4-d700-d0a6-395c-1831-ccdb.ngrok-free.app";

export default axios.create({
    baseURL: BASE_URL,
});

// to get the refresh token
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});