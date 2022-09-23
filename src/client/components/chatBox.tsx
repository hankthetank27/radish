import { useEffect, useState } from "react"
import { Message } from "./message"

interface Props {
  socket: any;
  id: string | undefined;
};

export const ChatBox = ({ socket, id }: Props) => {

  const [ messages, setMessages ] = useState<Array<any>>([]);
  const [ handleChange, setHanldeChange ] = useState('');

  const makeMessage = (message: string) => {
    return <Message message={message} />
  };

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (message: string) => {
        setMessages((prevMessages: Array<string>) => {
          return [...prevMessages, makeMessage(message)];
        });
      });

      socket.emit('join-room', id);
    };
  }, [socket]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/getMessages/${id}`)
      .then(res => res.json())
      .then(data => {
        const newMessages = [];
        for (const message of data) {
          newMessages.push(makeMessage(message));
        };
        setMessages(newMessages);
      });
  }, [id]);

  return (
    <div className="chatBox">
      <div className="chatInnerBox">
        {messages}
      </div>
      <div className="inputContainer">

        <input className="chatInput" value={handleChange} onChange={(e) => {
          e.preventDefault();
          setHanldeChange(e.target.value);
        }}/>

        <button className="chatSend" onClick={(e) => {
          e.preventDefault();
          socket.emit('send-message', handleChange, id)
          setHanldeChange('');
        }}>Send</button>

      </div>
    </div>
  )
}