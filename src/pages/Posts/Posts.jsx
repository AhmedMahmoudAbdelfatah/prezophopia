import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "../../components/Post/Post";
import "./posts.css"
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useContext, useState } from "react";
import usePosts from "../../customHooks/usePosts";
import { UserContext } from "../../features/UserContext";


export default function Posts() {
    const posts = usePosts();
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);
    const [user] = useContext(UserContext);


    return (
        <div>
            <Navbar />
            <div className="posts-main">
                <div className="posts-wraper">
                    <div className="start-post">
                        <div className="img">
                            {!user?.imgUrl?
                                <FontAwesomeIcon icon={faUserAlt} style={{ height: "25px", color: "#414141" }} /> 
                                : <img src={`http://localhost:8080/${user?.imgUrl}`} alt=""/>
                            }
                        </div>
                        <div className="start" onClick={open}>Start a post</div>
                    </div>
                    <div className="posts">
                        {
                            posts?.map(p => <Post {...p} key={p.id} />)
                        }
                    </div>
                    {isOpen? <CreatePost close={close} /> : null}
                </div>
            </div>
        </div>
    );
}
