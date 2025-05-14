
import axios from 'axios';

export const userLogout = async () => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true } 
    );
    return response.data;
};
