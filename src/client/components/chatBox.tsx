import { useEffect, useState } from "react"
import { Message } from "./message"
import io from 'socket.io-client'

export const ChatBox = () => {

  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [handleChange, setHanldeChange] = useState('');

  const makeMessage = (message: string) => {
    return <Message message={message} />
  };

  useEffect(() => {
    setSocket(io('http://localhost:3000/'));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (message: string) => {
        setMessages((prevMessages: Array<string>) => {
          const newMessages = [...prevMessages, makeMessage(message)];
          return newMessages;
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    fetch('http://localhost:3000/api/getMessages')
      .then(res => res.json())
      .then(data => {
        const newMessages = [];
        for (const message of data) {
          newMessages.push(makeMessage(message));
        }
        setMessages(newMessages);
      })
  }, []);

  return (
    <div className="chatBox">
      <div className="chatInnerBox">
        {messages}
      </div>
      <div className="inputContainer">

        <input className="chatInput" value={handleChange} onChange={(e) => {
          e.preventDefault();
          setHanldeChange(e.target.value);
        }} />

        <button className="chatSend" onClick={(e) => {
          e.preventDefault();
          socket.emit('send-message', handleChange)
          setHanldeChange('');
        }}>Send</button>

      </div>
    </div>
  )
}