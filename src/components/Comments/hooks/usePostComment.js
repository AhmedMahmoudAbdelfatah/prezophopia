import { useContext, useState } from "react";
import { UserContext } from "../../../features/UserContext";
import axios from "axios";
import { useQuery } from "react-query";

export const usePostComment = (post_id, setCommentsCount, getComments) => {
    const [comment, setComment] = useState("");
    const { user } = useContext(UserContext);

    const postComment = () => {
        return axios.post(
            "http://localhost:8080/api/comment/write",
            {
                post_id: +post_id,
                text: comment,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user?.accessToken,
                },
            }
        );
    };

    const onSuccess = (data) => {
        setCommentsCount((prev) => {
            return prev + 1;
        });
        setComment("");
        getComments();
    }

    const result = useQuery("post-comment", postComment, {
        enabled: false,
        cacheTime: 0,
        onSuccess
    });

    const handlePostComment = (e) => {
        e.preventDefault();
        if (comment) {
            result.refetch();
        }
    };

    return { ...result, comment, setComment, handlePostComment };
};
