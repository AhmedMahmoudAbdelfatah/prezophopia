import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../features/UserContext";

export const usePostReactions = (post_id) => {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [type, setType] = useState(0);

    const postReaction = (reaction_type) => {
        return axios.post(
            `http://localhost:8080/api/post/like/${post_id}/${reaction_type}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.accessToken,
                },
            }
        );
    };

    const likeAction = async (event, postAction, reaction_type) => {
        await setType(reaction_type);
        if (!user?.accessToken) navigate("/signin");
        if (event.target.classList.contains("liked")) event.target.classList.remove("liked");
        else event.target.classList.add("liked");
        const { isError, error, data } = await postAction();
        if (isError) console.log("inside like action", error);
        else console.log(data);
    };

    const result = useQuery("post-reaction", () => postReaction(type), {
        enabled: false,
    });
    return { ...result, likeAction };
};
