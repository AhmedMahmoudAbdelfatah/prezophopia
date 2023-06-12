import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faEllipsisH, faThumbsUp, faComment, faShare} from "@fortawesome/free-solid-svg-icons";
import "./post.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useComments from "../../customHooks/useComments";
import { usePostReactions } from "./hooks/usePostReactions";

export default function Post(props) {
    const [comments, setComments, handle] = useComments();
    const [isComment, setIsComment] = useState(false);
    const [comment, setComment] = useState("");
    const [text, setText] = useState(props.text?.substring(0, 200));

    const { likeAction, refetch } = usePostReactions(props.id);
    

    const expandBody = (e) => {
        setText(props.text);
        e.target.style.display = "none";
    }

    const handleCommentClick = () => {
        if (!isComment) {
            setIsComment(true);
            setComments(handle, props.id);
        }
        else setComment(false);
    }

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (comment) {
            try {
                const response = await axios.post("http://localhost:8080/api/comment/write", {
                    post_id: props.id,
                    text: comment
                } , {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
                    },
                });
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div class="post" key={props.id}>
            <header>
                <div>
                    <div className="img"><FontAwesomeIcon icon={faUserAlt} style={{ height: "25px", color: "#414141" }} /></div>
                    <Link className="link"><span>{ props?.author?.username }</span></Link>
                </div>
                <div className="img"><FontAwesomeIcon icon={faEllipsisH} style={{ height: "20px", color: "#65676B"}} /></div>
            </header>
            <div className="post-body">
                {text}
                {text.length !== props.text.length?
                    <span onClick={expandBody}>...see more</span> :
                    null
                } 
            </div>
            <section className="files-section">
                {props.images_url ? props.images_url.map((images_url, index) => {
                    return <img src={`http://localhost:8080/${images_url}`} alt="" key={index}/>
                }) : null}

                {props.vedio_url ? <video src={ `http://localhost:8080/${props.vedio_url}`} controls /> : null}
            </section>
            <footer>
                {/* <div class="details">
                    <div class="feeds">wdawd and 500 others</div>
                    <div class="comments-shares">
                        <span>52 comments</span>
                        <span>10 shares</span>
                    </div>
                </div> */}
                <div className="actions">
                    <div role={"button"} className={`feed ${props.myFeed > 0? "liked" : ""}`} onClick={(e) => likeAction(e, refetch, 1)}> <FontAwesomeIcon icon={faThumbsUp} style={{height:"16px", marginRight: "5px"}} /> like</div>
                    <div role={"button"} className="comment" onClick={handleCommentClick}> <FontAwesomeIcon icon={faComment} style={{height:"16px", marginRight: "5px"}}/> comment</div>
                    <div role={"button"} className="share"><FontAwesomeIcon icon={faShare} style={{height:"16px", marginRight: "5px"}}/> share</div>
                </div>
            </footer>
            {isComment ?
                <section className="comments">
                    <form className="comment" onSubmit={handlePostComment}>
                        <div className="img">
                            {props?.author?.image_url ?
                                <img src={`http://localhost:8080/${props.author.imgUrl}`} alt=""  />
                                : <FontAwesomeIcon icon={faUserAlt} style={{ height: "25px", color: "#414141" }} /> 
                            }
                        </div>
                        <div className="input-container">
                            <input type="text" onChange={(e) => setComment(e.target?.value || "")} value={ comment } />
                            <div>
                                { comment && <button type='submit'>post</button>}
                            </div>
                        </div>
                    </form>
                    {comments?.length ?
                        comments.map((comment) => {
                            return <div>{ comment }</div>
                        })
                        : null
                    }
                </section>
                : null}
        </div>
    );
}
