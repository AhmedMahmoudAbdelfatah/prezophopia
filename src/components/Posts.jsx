import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "./Post";
import "../styles/posts.css"
import Navbar from "./Navbar";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import usePosts from "../customHooks/usePosts";



export default function Posts() {
    const posts = usePosts();
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const [imgUrl, setImageUrl] = useState("");

    useEffect(() => {
        const url = localStorage.getItem("imgUrl");
        setImageUrl(url ? url : "");
    }, [imgUrl]);


    return (
        <div>
            <Navbar />
            <div className="posts-main">
                <div className="posts-wraper">
                    <div className="start-post">
                        <div className="img">
                            {!imgUrl?
                                <FontAwesomeIcon icon={faUserAlt} style={{ height: "25px", color: "#414141" }} /> 
                                : <img src={`http://localhost:8080/${imgUrl}`} alt=""/>
                            }
                        </div>
                        <div className="start" onClick={onOpen}>Start a post</div>
                    </div>
                    <div className="posts">
                        {
                            posts?.map(p => <Post {...p} key={p.id} />)
                        }
                    </div>
                    {isOpen? <CreatePost onClose={onClose} /> : null}
                </div>
            </div>
        </div>
    );
}
