import axios from "axios";
import { useEffect, useState } from "react";

const getPosts = async (setPosts) => {
    try {
        const response = await axios.get("http://localhost:8080/api/post/all", {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
        });
        setPosts(response.data.data);
        console.log(response.data.data);
    } catch (error) {
        console.log(error);
    }
};

export default function usePosts(key, initial) {
    const [posts, setPosts] = useState();
    useEffect(() => {
        getPosts(setPosts);
    }, []);

    return posts;
}
