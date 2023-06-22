import './replay.css'
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Replay = (props) => {
    return (
        <section className="replay-container" key={props?.id}>
            <div className="img">
                {props?.author?.image_url ?
                    <img src={`http://localhost:8080/${props?.author?.imgUrl}`} alt=""  />
                    : <FontAwesomeIcon icon={faUserAlt} style={{ height: "14px", color: "#414141" }} /> 
                }
            </div>
            <div className="full-replay">
                <div className="text-container">
                    <div className="name">{ props?.author?.username }</div>
                    <div className="text">{props?.text} </div>
                    
                </div>
                <div className="replay-actions">
                    <div role={"button"} className={`replay-feed`}>
                        <div className="feed"> like </div>
                    </div>
                    <div role={"button"} className="reply" > reply </div>
                </div>
            </div>
        </section>
    )
}

export default Replay
