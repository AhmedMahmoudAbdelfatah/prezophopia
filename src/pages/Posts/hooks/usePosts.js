import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../../features/UserContext";


export const usePosts = (id) => {
    const { user } = useContext(UserContext);
    const getPosts = () => {
        const URL = id
            ? `http://localhost:8080/api/profile/posts/all/${id}`
            : "http://localhost:8080/api/post/all";
        return axios.get(URL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user?.accessToken
            },
        });
    }

    const result = useQuery('get-posts', getPosts, {
        select: (respone) => {
            return respone?.data?.data;
        },
        onSuccess: (data) => {
            console.log(data);
        },
        // refetchOnWindowFocus: false
    });

    return result;
}