import { createContext, useState } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext(null);

const getUser = () => {
    let cookieUser = Cookies.get("user");
    if (cookieUser) {
        cookieUser = JSON.parse(cookieUser);
        return cookieUser;
    }
    return {};
} 

const UserContextProvider = (props) => {
    const [user, setValue] = useState(getUser());
    const navigate = useNavigate();
    
    const setUser = (user) => {
        console.log(user);
        let userString = JSON.stringify(user);
        if (userString) {
            Cookies.set("user", userString, {
                expires: 7,
                secure: true,
            });
           setValue(user);
        }
    }

    const logout = () => {
        Cookies.remove("user");
        setValue('');
        navigate('/');
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>{ props.children }</UserContext.Provider>
    )
}

export default UserContextProvider
