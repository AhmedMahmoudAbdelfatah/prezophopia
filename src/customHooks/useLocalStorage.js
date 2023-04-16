import { useEffect, useState } from "react";

function getSavedValue(key, initial) {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;
    return initial;
}

export default function useLocalStorage(key, initial) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initial);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return [value, setValue];
}
