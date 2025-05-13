import axios from 'axios'

const url = import.meta.env.VITE_API_URL;
console.log(url, "baseurl");

const axiosInstance = axios.create({
    baseURL: url || 'http://localhost:3000',
    withCredentials: true
});

export default axiosInstance;  
