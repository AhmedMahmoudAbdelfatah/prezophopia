import './comments.css'
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetComments } from './hooks/useGetComments';
import { usePostComment } from './hooks/usePostComment';
import Comment from "../Comment/Comment"
import Loading from '../Loading/Loading';


const Comments = (props) => {
    const { data:comments, refetch:getComments, isFetchedAfterMount, isLoading, isFetching } = useGetComments(props.post_id);
    
    const { comment, setComment, handlePostComment } = usePostComment(props.post_id, props.setCommentsCount, getComments);

    const imageStyles = {
        backgroundImage: `url(http://localhost:8080/${props?.image_url})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }
    
    return (
        <section className="comments">
            <form className="comment" onSubmit={handlePostComment}>
                <div className="img" style={ props?.image_url? imageStyles : null}>
                            {!props?.image_url?
                                <FontAwesomeIcon icon={faUserAlt} style={{ height: "25px", color: "#414141" }} /> 
                                // : <img src={`http://localhost:8080/${user?.image_url}`} alt=""/>
                                : null
                            }
                        </div>
                <div className="input-container">
                    <input type="text" onChange={(e) => setComment(e.target?.value ?? "")} value={ comment } />
                    <div>
                        { comment && <button type='submit'>post</button>}
                    </div>
                </div>
            </form>
            {
                isLoading || (isFetching && !isFetchedAfterMount) ?
                    <Loading style={{height: "auto"}} /> :
                    (comments?.length ?
                        comments.map((comment) => {
                            return (
                                <Comment {...comment} key={ comment.id } />
                            )
                        })
                        : null
                    )
            }
        </section>
    )
}

export default Comments
