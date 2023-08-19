import './replays.css'
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetReplays } from './hooks/useGetReplays';
import { usePostReplay } from './hooks/usePostReplay';
import Replay from "../Replay/Replay"
import Loading from '../Loading/Loading';
import { useContext } from 'react';
import { UserContext } from '../../features/UserContext';


const Replays = (props) => {
    const { data:replays, refetch:getReplays, isFetchedAfterMount, isLoading, isFetching } = useGetReplays(props.id);
    
    const { replay, setReplay, handlePostReplay } = usePostReplay(props.id, props.setCommentsCount, getReplays);
    
    const { user } = useContext(UserContext);

    const imageStyles = {
        backgroundImage: `url(http://localhost:8080/${user?.image_url})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    return (
        <section className="replays">
            <form className="replay" onSubmit={handlePostReplay}>
                <div className="img" style={ user?.image_url? imageStyles : null}>
                            {!user?.image_url?
                                <FontAwesomeIcon icon={faUserAlt} style={{ height: "16px", color: "#414141" }} /> 
                                // : <img src={`http://localhost:8080/${user?.image_url}`} alt=""/>
                                : null
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
