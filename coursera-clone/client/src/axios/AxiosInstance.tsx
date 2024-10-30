import axios from "axios";

const baseURL='http://localhost:3000';
const AxiosInstance=axios.create({
    baseURL:baseURL,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        accept:"application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
    }
})

export default AxiosInstance