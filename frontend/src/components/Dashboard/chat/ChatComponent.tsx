import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatComponent = ({ chatId, userId }: { chatId: number, userId: number }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Conectar al servidor de WebSockets
    const socketConnection = io('http://localhost:4000', {
      query: { chatId, userId },
    });
    setSocket(socketConnection);

    // Escuchar nuevos mensajes
    socketConnection.on('newMessage', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketConnection.disconnect(); // Desconectar cuando el componente se desmonte
    };
  }, [chatId, userId]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Enviar el mensaje al servidor a través de socket
      socket.emit('sendMessage', { chatId, userId, message: messageInput });
      setMessageInput(''); // Limpiar el campo de mensaje
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={handleMessageChange}
        placeholder="Escribe un mensaje..."
        className="message-input"
      />
      <button onClick={handleSendMessage} className="send-button">
        Enviar
      </button>

      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 400px;
          width: 300px;
          border: 1px solid #ccc;
          padding: 10px;
          background-color: #fff;
        }
        .messages {
          flex-grow: 1;
          overflow-y: auto;
          margin-bottom: 10px;
        }
        .message {
          padding: 5px;
          border-bottom: 1px solid #ddd;
        }
        .message-input {
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          width: 100%;
        }
        .send-button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
        .send-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ChatComponent;
