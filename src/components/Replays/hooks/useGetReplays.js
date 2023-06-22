import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../features/UserContext";
import { useQuery } from "react-query";

export const useGetReplays = (comment_id) => {
    const { user } = useContext(UserContext);
    const getReplays = () => {
        return axios.get(`http://localhost:8080/api/comment/replay/get/all/${comment_id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user?.accessToken,
                },
            }
        );
    };

    const result = useQuery(["get-replays", comment_id], getReplays, {
        select: (response) => {
            return response?.data?.data;
        },
        onSuccess: (data) => {
            console.log(data);
        },
        // refetchOnWindowFocus: false,
    });
    return result;
};
