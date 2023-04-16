import axios from "axios";
import { useState } from "react";

const setComments = async (setValue, post_id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/comment/all/${post_id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
        });
        setValue(response.data);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
};

export default function useComments(post_id) {
    const [value, setValue] = useState([]);
    return [value, setComments, setValue];
}
