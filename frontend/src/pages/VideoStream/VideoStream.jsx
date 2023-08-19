import axios from 'axios';
import { UserContext } from '../../features/UserContext';
import './videoStream.css';
import { useContext, useState } from "react";
import LineChart from '../../features/LineChart';
import { useGetLastSession } from './hooks/useGetLastSession';
import Loading from '../../components/Loading/Loading';
const VideoStream = () => {
    const { user } = useContext(UserContext);
    const IFRAMEURL = `http://localhost:5051/${ user.id }`;
    const [isStart, setIsStart] = useState(false);
    const [iframeUrl, setIframeUrl] = useState('');
  
   

    const { data, isLoading, isError, isFetching, refetch } = useGetLastSession(user.id);
    

    const handleStart = () => {
        setIsStart(true);
        setIframeUrl(IFRAMEURL);
    }

    const handleStop = () => {
        axios.get(`http://localhost:5051/get_predected_emotion/${user.id}`).then((res) => {
            console.log(res);
            // if (res?.data?.emotions !== 'null') console.log(JSON.parse(res.data));
            setIsStart(false);
            setIframeUrl('');
            refetch();
        });
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
            {
                isLoading || isFetching ?
                    <Loading style={{ marginTop: "80px", height: "auto" }} />
                    : 
                    isError ?
                        null
                        :
                        <div className="last-session">
                            <h1>Last Session Analysis</h1>
                            <div className="chart">
                                <LineChart data={ data?.chartData } yLabels={ data.yLabels } />
                            </div>
                        </div>
            } 
       </div>
    );
}


export default VideoStream