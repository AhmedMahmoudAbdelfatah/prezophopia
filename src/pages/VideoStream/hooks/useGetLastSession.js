import axios from "axios";
import { useQuery } from "react-query";

export const useGetLastSession = (id) => {
    const getData = () => {
        return axios.get(`http://localhost:5051/get_user_latest_data/${id}`);
    }

    const select = ({ data }) => {
        let temp = JSON.parse(data.emotions) ?? [];
        const labels = new Set();
        const emotions = [];
        const map = {
            0: 2,
            1: 1,
            2: 3,
            3: 6,
            4: 4,
            5: 7,
            6: 5
        }
        const yLabels = {
            1: "disgust",
            2: "angry",
            3: "fear",
            4: "sad",
            5: "natural",
            6: "happy",
            7: "surprise",
        };
        temp.forEach(([label, emotion]) => {
            labels.add(label);
            emotions.push(map[+emotion]);
        });

        return {
            ...data,
            yLabels,
            chartData: {
                labels: Array.from(labels),
                datasets: [
                    {
                        label: "emotion per frame",
                        data: emotions,
                    },
                ],
            },
        };
    };

    const result = useQuery("get-last-session", getData, {
        select,
        onSuccess: (data) => console.log(data),
        refetchOnWindowFocus: false,
    })
    return result;
};