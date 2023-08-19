import { useQuery } from "react-query";
import axios from "axios";

const RESGITER_URL = "http://localhost:8080/api/auth/signup";
const register = (email, password, username) => {
    return axios.post(
        RESGITER_URL,
        JSON.stringify({
            email,
            password,
            username,
        }),
        {
            headers: { "Content-Type": "application/json" },
        }
    );
};

export const useRegister = (email, password, username) => {
    const result = useQuery("login", () => register(email, password, username), {
        cacheTime: 0,
        enabled: false,
    });
    return result;
};
