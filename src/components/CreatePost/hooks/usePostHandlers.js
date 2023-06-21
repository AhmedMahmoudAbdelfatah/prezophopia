import { useEffect, useRef, useState } from "react";
import { usePost } from "./usePost";

export const usePostHandlers = () => {
    const [post, setPost] = useState({});
    const [enable_inputs, set_enable_inputs] = useState(true);
    const submit_ref = useRef();

    const { refetch } = usePost(post);

    useEffect(() => {
        if (post.images?.length || post.video || post.file || post.text)
            submit_ref.current.disabled = false;
        else submit_ref.current.disabled = true;

        if (post.images?.length || post.video || post.file) set_enable_inputs(false);
        else set_enable_inputs(true);
        // console.log(post, "effect");
    }, [post]);

    const handleFileSelect = (e, type = "file") => {
        if (type === "images")
            setPost((pre_post) => {
                return { ...pre_post, images: [...e.target.files].slice(0, 9) };
            });
        else if (type === "video")
            setPost((pre_post) => {
                return { ...pre_post, video: e.target.files[0] };
            });
        else if (type === "file")
            setPost((pre_post) => {
                return { ...pre_post, file: e.target.files[0] };
            });
    };

    const handleTextArea = (e) => {
        setPost((pre_post) => {
            return { ...pre_post, text: e.target.value };
        });
    };

    const removeImg = (index, key) => {
        console.log(index, key);
        if (key !== post.images[index]?.lastModified) return;
        setPost((pre_post) => {
            pre_post.images.splice(index, 1);
            return { ...pre_post, images: pre_post.image };
        });
    };

    const removeVideo = () => {
        // console.log(post);
        setPost((pre_post) => {
            return { ...pre_post, video: "" };
        });
    };

  

    const handleSubmit = async (e, close) => {
        e.preventDefault();
        const { error, isError } = await refetch();
        if (isError) console.log(error);
        else close();
    };

    return {
        post,
        enable_inputs,
        submit_ref,
        handleFileSelect,
        handleTextArea,
        removeImg,
        removeVideo,
        handleSubmit,
    };
};
