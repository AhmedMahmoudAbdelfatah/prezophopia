import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../features/UserContext";
import { useQuery } from "react-query";




export const useGetComments = (post_id) => {
    const { user } = useContext(UserContext);
    const getComments = () => {
        return axios.get(`http://localhost:8080/api/comment/all/${post_id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + (user?.accessToken),
            },
        });
    };


    const result = useQuery(['get-comments', post_id], getComments, {
        select: (response) => {
            return response?.data?.data;
        },
        onSuccess: (data) => {
            console.log(data);
        },
        // refetchOnWindowFocus: false,
    });
    return result;
    
}