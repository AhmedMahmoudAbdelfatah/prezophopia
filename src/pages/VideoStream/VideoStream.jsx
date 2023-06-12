import React, { useEffect, useRef } from 'react'
// import { useMediaDevice } from './hooks/useMediaDevice';
import { io } from 'socket.io-client'

const VideoStream = () => {
    // const videoRef = useRef(null);
    // const canvasRef = useRef(null);
    // const image = useMediaDevice(videoRef, canvasRef, 10);
    const socket = useRef();

    useEffect(() => {
        console.log("hello");
        socket.current = io('/');
        console.log("hello1");
        socket.current.on("connect", (data) => {
            console.log("connected data: ", data);
        });
    }, []);

    // useEffect(() => {
    //     socket.current.emit("image", { image });
        
    //     return () => socket.current.off("image");
    // }, [image]);

    // useEffect(() => {
    //     socket.current.on("recieve_img", (data) => {
    //         console.log(data);
    //     });

    //     return () => socket.current.off("recieve_img");
    // }, [socket])

    return (
        <div>
        {/* <video ref={videoRef} width="640" height="480" autoPlay  style={{display: "none"}}/>
        <canvas ref={canvasRef} width="640" height="480" style={{display: "none"}}/> */}
        </div>
    );
}

export default VideoStream
