import { useEffect, useState } from "react";
import Emoji from "a11y-react-emoji/lib/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faHeart } from "@fortawesome/free-solid-svg-icons";
export const useFeedsDetials = (initialFeeds) => {
    const [numberOfFeeds, setNumberOfFeeds] = useState(0);
    const [feedsTypes, setFeedsTypes] = useState();
    const [feeds, setFeeds] = useState(initialFeeds);

    const commentFeeds = {
        0: {
            class: "",
            desc: "like",
            emoji: <FontAwesomeIcon icon={faThumbsUp} />,
        },
        1: {
            class: "",
            desc: "like",
            emoji: <FontAwesomeIcon icon={faThumbsUp} />,
        },
        2: {
            class: "like",
            desc: "like",
            emoji: <FontAwesomeIcon icon={faThumbsUp} />,
        },
        3: {
            class: "love",
            desc: "love",
            emoji: <FontAwesomeIcon icon={faHeart} />,
        },
        4: {
            class: "laughing",
            desc: "Haha",
            emoji: <Emoji symbol="&#x1F602;" />,
        },
        5: {
            class: "sad",
            desc: "sad",
            emoji: <Emoji symbol="&#x1F622;" />,
        },
        6: {
            class: "angry",
            desc: "angry",
            emoji: <Emoji symbol="&#x1F620;" />,
        },
    };

    useEffect(() => {
        // console.log(feeds);
        delete feeds[0];
        delete feeds[1];
        setNumberOfFeeds(
            Object.entries(feeds).reduce((prev, [key, value]) => {
                return prev + value;
            }, 0)
        );
        setFeedsTypes(Object.keys(feeds).sort((a, b) => a - b));
    }, [feeds]);

    const changeFeeds = (feedType, value) => {
        setFeeds((prev) => {
            const newObj = { ...prev };
            newObj[feedType] = (prev[feedType] ?? 0) + value;
            if (!newObj[feedType] || newObj[feedType] < 0) delete newObj[feedType];
            return newObj;
        });
    };

    return { numberOfFeeds, feedsTypes, commentFeeds, changeFeeds };
};
