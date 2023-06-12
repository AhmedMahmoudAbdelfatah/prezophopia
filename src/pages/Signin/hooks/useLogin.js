import { useContext } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../../features/UserContext.jsx";
import axios from "axios";

const SIGNIN_URL = "http://localhost:8080/api/auth/signin";

const login = (email, password) => {
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

const onSuccess = (user, setUser) => {
    setUser(user?.data);
    localStorage.setItem("user", JSON.stringify(user.data));
};

export const useLogin = (email, password) => {
    const [, setUser] = useContext(UserContext);
    const result = useQuery("login", () => login(email, password), {
        onSuccess: (data) => onSuccess(data, setUser),
        cacheTime: 0,
        enabled: false,
    });
    return result;
};
