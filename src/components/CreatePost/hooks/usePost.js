import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../../features/UserContext";

const sendPost = (formData, accessToken) => {
    return axios.post("http://localhost:8080/api/post/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + accessToken,
        },
    });
};

const transformPost = (post) => {
    const formData = new FormData();
    Object.entries(post).forEach(([key, value]) => {
        if (key !== "images") formData.append(key, value);
    });
    if (post.images)
        post.images.forEach((image) => {
            formData.append("images", image);
        });
    return formData;
};

export const usePost = (post) => {
    const [user] = useContext(UserContext);
    const formData = transformPost(post);
    const result = useQuery("create-post", () => sendPost(formData, user.accessToken), {
        cacheTime: 0,
        enabled: false,
    });
    return result;
};
