import './comment.css'
import { useCommentReactions } from './hooks/useCommentReactions.js';
import { useFeedsDetials } from './hooks/useFeedsDetials.js'
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFeedsLeftPadding } from './utils/getFeedsLeftPadding';


const Comment = (props) => {

    const { likeAction, refetch, commentReactionType, displayReactions, setDisplayReactions } = useCommentReactions(props.id, props.myFeed);

    const { feedsTypes, numberOfFeeds, commentFeeds, changeFeeds } = useFeedsDetials(props.feeds);

    return (
        <section className="comment-container" key={props?.id}>
            <div className="img">
                {props?.author?.image_url ?
                    <img src={`http://localhost:8080/${props?.author?.imgUrl}`} alt=""  />
                    : <FontAwesomeIcon icon={faUserAlt} style={{ height: "18px", color: "#414141" }} /> 
                }
            </div>
            <div className="full-comment">
                <div className="text-container">
                    <div className="name">{ props?.author?.username }</div>
                    <div className="text">{props?.text} </div>
                    {
                        numberOfFeeds ? (
                            <div class="feeds">
                                <div style={{paddingLeft: `${getFeedsLeftPadding(feedsTypes.length)}`}}>
                                    <div className="emojis">
                                        {
                                            feedsTypes.map((type) => {
                                                return (
                                                    <div className={`${commentFeeds[type]?.class}`} key={type}>
                                                        { commentFeeds[type]?.emoji }
                                                    </div> 
                                                );
                                            })
                                        }
                                    </div>
                                    <div className="feeds-number" > { numberOfFeeds } </div>
                                </div>
                            </div>
                        ): null
                    }
                </div>
                <div className="comment-actions">
                    <div role={"button"} className={`comment-feed ${displayReactions? "hoverable" : ''}`} onMouseLeave={()=> setDisplayReactions(true)}>
                        <div className="feed" onClick={({currentTarget}) => likeAction(currentTarget, refetch, commentReactionType, changeFeeds)}>
                            <span className={`comment-${commentFeeds[commentReactionType]?.class}`}>{ commentFeeds[commentReactionType]?.desc }</span>
                        </div>
                        <div className="reactions">
                            {
                                Object.entries(commentFeeds).slice(2).map(([key, value]) => {
                                    return (
                                        <div className={`${value?.class}`} onClick={({currentTarget}) => likeAction(currentTarget, refetch, key, changeFeeds)} key={key}>
                                            { value?.emoji }
                                        </div>  
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div role={"button"} className="reply" > reply </div>
                </div>
            </div>
        </section>
    )
}

export default Comment
