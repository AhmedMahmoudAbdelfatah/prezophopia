import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faEllipsisH, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePostReactions } from "./hooks/usePostReactions";
import Comments from "../Comments/Comments";
import { UserContext } from "../../features/UserContext";
import { useFeedsDetials } from "./hooks/useFeedsDetials";
import { getFeedsCountPosition } from "./utils/getFeedsCountPosition";
import { displayFeedsCount } from "./utils/displayFeedsCount";

export default function Post(props) {
    const [isComment, setIsComment] = useState(false);
    const [text, setText] = useState(props.text?.substring(0, 200));
    const [commentsCount, setCommentsCount] = useState(props.comments_count);

    const { likeAction, refetch, postReactionType, displayReactions, setDisplayReactions } = usePostReactions(props.id, +props.myFeed);
    
    const { feedsTypes, numberOfFeeds, postFeeds, changeFeeds } = useFeedsDetials(props.feeds);

    const { user } = useContext(UserContext);
    
    const navigate = useNavigate();

    const expandBody = (e) => {
        setText(props.text);
        e.target.style.display = "none";
    }

    const handleCommentClick = () => {
        if (!isComment) {
            if (!user?.accessToken) navigate('/signin')
            setIsComment(true);
        }
        else setIsComment(false);
    }

   
    const imageStyles = {
        backgroundImage: `url(http://localhost:8080/${props?.author?.image_url})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    return (
        <div class="post">
            <header>
                <div>
                   <div className="img" style={ props?.author?.image_url? imageStyles : null}>
                            {!props?.author?.image_url?
                                <FontAwesomeIcon icon={faUserAlt} style={{ height: "25px", color: "#414141" }} /> 
                                // : <img src={`http://localhost:8080/${user?.image_url}`} alt=""/>
                                : null
                            }
                    </div>
                    <Link className="link" to={`/profile/${props?.author?.id}`}><span>{ props?.author?.username }</span></Link>
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
                <div className="details">
                    <div className="feeds">
                        {
                            numberOfFeeds ? (
                                <>
                                    <div className="emojis">
                                        {
                                            feedsTypes.map((type) => {
                                                return (
                                                    <div className={`${postFeeds[type]?.class}`} key={type}>
                                                        { postFeeds[type]?.emoji }
                                                    </div> 
                                                );
                                            })
                                        }
                                    </div>
                                    <div className="feeds-number" style={{right: getFeedsCountPosition(numberOfFeeds, feedsTypes.length)}}> { displayFeedsCount(numberOfFeeds) } </div>
                                </>
                            ) : null
                        }
                    </div>
                    <div className="comments-shares">
                        <span>{commentsCount} comments</span>
                    </div>
                </div>
                <div className="actions">
                    <div role={"button"} className={`feed-container ${displayReactions? "hoverable" : ''}`} onMouseLeave={() => {
                        setDisplayReactions(true);
                    }}>
                        <div className="feed" onClick={({currentTarget}) => likeAction(currentTarget, refetch, postReactionType, changeFeeds)}>
                            <div className={postFeeds[postReactionType]?.class}>
                                { postFeeds[postReactionType]?.emoji }
                            </div>
                            <span>{ postFeeds[postReactionType]?.desc }</span>
                        </div>
                        <div className="reactions">
                            {
                                Object.entries(postFeeds).slice(2).map(([key, value]) => {
                                    return (
                                        <div className={`${value?.class}`} onClick={({currentTarget}) => likeAction(currentTarget, refetch, key, changeFeeds)} key={key}>
                                            { value?.emoji }
                                        </div>  
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div role={"button"} className="comment" onClick={handleCommentClick}> <FontAwesomeIcon icon={faComment} style={{height:"16px", marginRight: "5px"}}/> comment</div>
                    <div role={"button"} className="share"><FontAwesomeIcon icon={faShare} style={{height:"16px", marginRight: "5px"}}/> share</div>
                </div>
            </footer>
            {isComment ?
                <Comments post_id={props.id} image_url={user.image_url} setCommentsCount={ setCommentsCount } />
                : null}
        </div>
    );
}
