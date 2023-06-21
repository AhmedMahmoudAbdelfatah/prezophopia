import { UserContext } from '../../features/UserContext';
import './videoStream.css';
import { useContext, useState } from "react";
const VideoStream = () => {
    const { user } = useContext(UserContext);
    const IFRAMEURL = `http://localhost:5051/${ user.id }`;
    const [isStart, setIsStart] = useState(false);
    const [iframeUrl, setIframeUrl] = useState('');

    const handleStart = () => {
        setIsStart(true);
        setIframeUrl(IFRAMEURL);
    }

    const handleStop = () => {
        setIsStart(false);
        setIframeUrl('');
    }
    
    return (
        <div className="video-stream">
            <div className="iframe-container">
                <iframe src={iframeUrl} frameBorder="0" title="ai"></iframe>
            </div>
            <div className='btn-container'>
                {
                    isStart ?
                        <button type="button" onClick={handleStop}> Stop </button>
                        :
                        <button type="button" onClick={handleStart}> Start </button>
                }
            </div>
       </div>
    );
}


export default VideoStream