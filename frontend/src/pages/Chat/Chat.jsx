import { useContext } from 'react'
import { UserContext } from '../../features/UserContext';
import './chat.css'

const Chat = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <div className="chat">
            <iframe title='chat' src={`http://localhost:3001/${user?.accessToken}`}></iframe>
        </div>
    ) 
}

export default Chat
