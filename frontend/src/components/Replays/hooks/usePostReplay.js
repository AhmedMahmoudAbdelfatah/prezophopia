import { useContext, useState } from "react";
import { UserContext } from "../../../features/UserContext";
import axios from "axios";
import { useQuery } from "react-query";

export const usePostReplay = (comment_id, setCommentsCount, getReplays) => {
    const [replay, setReplay] = useState("");
    const { user } = useContext(UserContext);

    const postReplay = () => {
        console.log("replay", replay);
        return axios.post(
            `http://localhost:8080/api/comment/replay/write/${comment_id}`,
            {
                text: replay,
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
        // setCommentsCount((prev) => {
        //     return prev + 1;
        // });
        setReplay("");
        getReplays();
        console.log(data);
    };

    const result = useQuery("post-replay", postReplay, {
        enabled: false,
        cacheTime: 0,
        onSuccess,
    });

    const handlePostReplay = (e) => {
        e.preventDefault();
        if (replay) {
            result.refetch();
        }
    };

    return { ...result, replay, setReplay, handlePostReplay };
};
