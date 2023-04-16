import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faImage, faVideo, faFile } from "@fortawesome/free-solid-svg-icons";
import "../styles/createPost.css";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


export default function CreatePost(props) {
    const [post, setPost] = useState({});
    const [enable_inputs, set_enable_inputs] = useState(true);
    const submit_ref = useRef();
    useEffect(() => {
        if (post.images?.length || post.video || post.file || post.text) submit_ref.current.disabled = false;
        else submit_ref.current.disabled = true;
        if (post.images?.length || post.video || post.file) set_enable_inputs(false);
        else set_enable_inputs(true);
        // console.log(post, "effect");
    }, [post]);

    const handleFileSelect = (e, type = 'file') => {
        if (type === 'images') setPost((pre_post) => {
            return { ...pre_post, images: [...e.target.files].slice(0, 9) };
        });
        else if (type === 'video') setPost((pre_post) => {
            return { ...pre_post, video: e.target.files[0] };
        });
        else if (type === 'file') setPost((pre_post) => {
            return { ...pre_post, file: e.target.files[0] };
        });
    };

    const hadleTextArea = (e) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(post).forEach(([key, value]) => {
            if (key !== "images") formData.append(key, value);
        });
        if (post.images) post.images.forEach(image => {
            formData.append("images", image); 
        });
        // for (let [key, value] of formData.entries()) console.log(key, value);
        try {
            // console.log('Bearer ' + JSON.parse(localStorage.getItem("user"))?.accessToken);
            const response = await axios.post('http://localhost:8080/api/post/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("user"))?.accessToken,
                },
            });
            console.log(response);
            props.onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return createPortal(
        <div className='CP-container'>
            <div className="popup">
                <header>
                    <h1>Create a post</h1>
                    <div className="close" onClick={props.onClose}> <FontAwesomeIcon icon={faTimes} /></div>
                </header>
                <form onSubmit={handleSubmit}>
                    <textarea name="postText" placeholder="What's in your mind?" onChange={hadleTextArea}></textarea>
                    {post.images ? (
                        <div className='imgs'>
                            {post.images.map((image, i) => {
                                const imagerc = URL.createObjectURL(image);
                                return (
                                    <div className='img' key={image.lastModified}>
                                        <img src={imagerc} alt="" />
                                        <button type='button' className='remove-img' onClick={() => removeImg(i, image.lastModified)} ><FontAwesomeIcon icon={faTimes} /></button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                    {post.video ? (
                        <div className="container">
                            <div className='video'>
                                <video src={URL.createObjectURL(post?.video)} controls></video>
                                <button type='button' className='remove-video' onClick={removeVideo} ><FontAwesomeIcon icon={faTimes} /></button>
                            </div>
                        </div>
                    ) : null}
                    {/* {post.file ? (
                        <PdfPlayer file = { post.file } />
                    ) : null} */}
                    <div>
                        <div className='options'>
                            <div onClick={(e) => e.currentTarget.className === "enabled" && e.currentTarget.lastElementChild.click()} className={enable_inputs ? "enabled" : ""}>
                                <FontAwesomeIcon icon={faImage} />
                                <input type="file" name='image' id='image' accept='image/*' multiple onChange={(e) => handleFileSelect(e, 'images')} />
                            </div>
                            <div onClick={(e) => e.currentTarget.className === "enabled" && e.currentTarget.lastElementChild.click()} className={enable_inputs ? "enabled" : ""}>
                                <FontAwesomeIcon icon={faVideo} />
                                <input type="file" name='video' id='video' accept='video/*' onChange={(e) => handleFileSelect(e, 'video')} />
                            </div>
                            <div onClick={(e) => e.currentTarget.className === "enabled" && e.currentTarget.lastElementChild.click()} className={enable_inputs ? "enabled" : ""}>
                                <FontAwesomeIcon icon={faFile} />
                                <input type="file" name='file' id='file' accept='.pdf' onChange={(e) => handleFileSelect(e, 'file')} />
                            </div>
                        </div>
                        <button type='submit' disabled ref={submit_ref}>Post</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("create-post")
    );
}
