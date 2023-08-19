import './replay.css'
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';



const Replay = (props) => {
    const imageStyles = {
        backgroundImage: `url(http://localhost:8080/${props?.author?.image_url})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    return (
        <section className="replay-container" key={props?.id}>
             <div className="img" style={ props?.author?.image_url? imageStyles : null}>
                {!props?.author?.image_url?
                    <FontAwesomeIcon icon={faUserAlt} style={{ height: "14px", color: "#414141" }} /> 
                    // : <img src={`http://localhost:8080/${user?.image_url}`} alt=""/>
                    : null
                }
             </div>
            <div className="full-replay">
                <div className="text-container">
                    <div className="name"><Link to={`/profile/${props?.author?.id}`}>{ props?.author?.username }</Link></div>
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
