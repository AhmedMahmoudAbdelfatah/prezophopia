import React from 'react'
import { useSelector } from "react-redux";
import moment from 'moment';
import { HiOutlineCheckCircle } from "react-icons/hi";
import {RiCheckboxCircleFill} from 'react-icons/ri';

const Message = ({myInfo, message, currentfriend, scrollRef, typingMessage })=>{
  //  const { myInfo } = useSelector(state => state.auth);
  //const  = JSON.parse(localStorage.getItem('userInfo'));
//   console.log("message conversation: "+message[0].text);
    return (
        <>
            <div className='message-show'>
                {
                    message && message.length > 0 ? message.map((m, index) =>
                        m.senderId === myInfo.id ? <div key={index} ref={scrollRef} className="my-message">
                            <div className="image-message">
                                <div className="my-text">
                                    <p className='message-text my'>{m.text === '' ? <img src={`./uploads/sentImages/${m.image}`} alt='image' /> : m.text}</p>
                                    {/*
                                        index === message.length - 1 && m.senderId === myInfo.id ?
                                            m.status === 'seen' ? <img className='img' src={`./uploads/images/${currentfriend.image}`} alt="" /> : m.status === 'delivared' ? <span><RiCheckboxCircleFill /></span> : <span><HiOutlineCheckCircle /></span> : ''
                */}
                                </div>

                            </div>
                            <div className="time">
                                {moment(m.createdAt).startOf('mini').fromNow()}
                            </div>
                        </div> : <div key={index} ref={scrollRef} className="fd-message">
                            <div className="image-message-time">
                                 {
                                        currentfriend?.image_url?
                                        <img src={`http://localhost:8080/${currentfriend.image_url}`} alt="current" />
                                        : <img src="noprofil.jpeg" alt="user"/>
                                    }
                                <div className="message-time">
                                    <div className="fd-text">
                                        <p className='message-text fd'>{m.text === '' ? <img src={`./uploads/sentImages/${m.image}`} alt='image' /> : m.text}</p>
                                    </div>
                                    <div className="time">
                                    {moment(m.createdAt).startOf('mini').fromNow()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <div className='friend_connect'>
                         {
                            currentfriend?.image_url?
                            <img src={`http://localhost:8080/${currentfriend.image_url}`} alt="current" />
                            : <img src="noprofil.jpeg" alt="user"/>
                        }
                        <h3>{currentfriend.username} connect you</h3>
                        <span>{moment(currentfriend.createdAt).startOf('mini').fromNow()}</span>
                    </div>
                                }

            </div>
            {
                typingMessage && typingMessage.message && typingMessage.senderId === currentfriend.id ?
                <div className="typing-message">
                    <div className="fd-message">
                        <div className="image-message-time">
                            <img src={`http://localhost:8080/${currentfriend.image_url}`} alt="current-fiend" />
                            <div className="message-time">
                                <div className="fd-text">
                                    <p className='message-text'>Typing message....</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :''
            }

        </>
    );
}

export default Message;