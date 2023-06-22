import './replays.css'
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetReplays } from './hooks/useGetReplays';
import { usePostReplay } from './hooks/usePostReplay';
import Replay from "../Replay/Replay"
import Loading from '../Loading/Loading';


const Replays = (props) => {
    const { data:replays, refetch:getReplays, isFetchedAfterMount, isLoading, isFetching } = useGetReplays(props.id);
    
    const { replay, setReplay, handlePostReplay } = usePostReplay(props.id, props.setCommentsCount, getReplays);

    
    return (
        <section className="replays">
            <form className="replay" onSubmit={handlePostReplay}>
                <div className="img">
                    {props?.image_url ?
                        <img src={`http://localhost:8080/${props.image_url}`} alt=""  />
                        : <FontAwesomeIcon icon={faUserAlt} style={{ height: "16px", color: "#414141" }} /> 
                    }
                </div>
                <div className="input-container">
                    <input type="text" onChange={(e) => setReplay(e.target?.value ?? "")} value={ replay } />
                    <div>
                        { replay && <button type='submit'>post</button>}
                    </div>
                </div>
            </form>
            {
                isLoading || (isFetching && !isFetchedAfterMount) ?
                    <Loading style={{height: "auto"}} /> :
                    (replays?.length ?
                        replays.map((replay) => {
                            return (
                                <Replay {...replay} key={ replay.id } />
                            )
                        })
                        : null
                    )
            }
        </section>
    )
}

export default Replays
