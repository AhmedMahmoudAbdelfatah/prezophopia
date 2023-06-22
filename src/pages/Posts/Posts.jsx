import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "../../components/Post/Post";
import "./posts.css"
import CreatePost from "../../components/CreatePost/CreatePost";
import { useContext, useState } from "react";

import { UserContext } from "../../features/UserContext";
import { usePosts } from "./hooks/usePosts";
import Loading from "../../components/Loading/Loading";


export default function Posts(props) {
    const { data: posts, refetch:getPosts, isLoading, isFetching, isFetchedAfterMount } = usePosts(props?.id);
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(UserContext);

    const open = () => setIsOpen(true);
    const close = () => {
        setIsOpen(false);
        getPosts();
    }


    return (
        <div>
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
                    {
                        isLoading || (isFetching && !isFetchedAfterMount)?
                            <Loading />
                            :
                            <div className="posts">
                                {
                                    posts?.map(p => <Post {...p} key={p.id} />)
                                }
                            </div>
                    }
                    {isOpen ? <CreatePost close={close} /> : null}
                </div>
            </div>
        </div>
    );
}
