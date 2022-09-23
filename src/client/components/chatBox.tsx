import { ReactComponentElement, useEffect, useState } from "react"
import { Message } from "./message"

export const ChatBox = () => {

    const [ messages, setMessages ] = useState<Array<string>>([]);
    const [ handleChange, setHanldeChange ] = useState('');

    useEffect(() => {
        fetch('/api/getMessages')
        .then(res => res.json)
        .then(data => {
            console.log(data)
        })
    }, [])
    
    const makeMessages = (messages: Array<string>) => {
        const res = [];
        for (const message of messages) {
            res.push(<Message message={message}></Message>);
        }
        return res;
    }

    const currentChat = makeMessages(messages);

    return(
        <div className="chatBox">
            <div className="chatInnerBox">
                {currentChat}
            </div>
            <div className="inputContainer">
                
                <input className="chatInput" value={handleChange} onChange={(e) => {
                    e.preventDefault();
                    setHanldeChange(e.target.value);
                }}/>

                <button className="chatSend" onClick={(e) => {
                    e.preventDefault();
                    messages.push(handleChange);
                    setMessages(messages);
                    setHanldeChange('');
                }}>Send</button>

            </div>
        </div>
    )
}