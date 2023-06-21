import { useQuery } from "react-query";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../features/UserContext";

const SIGNIN_URL = "http://localhost:8080/api/auth/signin";


export const useLogin = (email, password) => {
    const { setUser } = useContext(UserContext);

    const login = () => {
        return axios.post(
            SIGNIN_URL,
            JSON.stringify({
                email,
                password,
            }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );
    };

    const result = useQuery("login", login, {
        onSuccess: (data) => setUser(data?.data?.data),
        cacheTime: 0,
        enabled: false,
    });
    
    return result;
};
