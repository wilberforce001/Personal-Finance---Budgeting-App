import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000", // backend server
});

// Attach token automatically if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Beaer ${token}`;
    }
    return req;
});

export default API;