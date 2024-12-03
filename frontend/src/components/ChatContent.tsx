import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USERS_API_URL = `${API_BASE_URL}/users`; // URL para obtener el fullName de los usuarios

if (!API_BASE_URL) {
  throw new Error("La variable de entorno NEXT_PUBLIC_API_BASE_URL no está definida.");
}

interface Message {
  sender: { fullName: string } | null;
  content: string;
  createdAt: string;
}

const ChatContent = ({ chatId }: { chatId: number }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  // Obtener el userId y userType del localStorage
  const userId = localStorage.getItem('user_id'); // Asumiendo que el userId está guardado como string
 
  // Verificar si userId o userType no están definidos
  if (!userId ) {
    throw new Error('El userId no está presente en el localStorage.');
  }

  // Función para obtener el fullName del usuario según el ID
  const getUserFullName = async (userId: number) => {
    try {
      const response = await axios.get(`${USERS_API_URL}`);
      const user = response.data.find((user: { id: number }) => user.id === userId);
      return user ? user.fullName : 'Unknown';
    } catch (error) {
      console.error('Error fetching user data:', error);
      return 'Unknown';
    }
  };

  useEffect(() => {
    // Función para obtener los mensajes al cargar el chat
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chats/${chatId}/messages`);
        console.log('Received messages:', response.data);
        const messagesWithSender = await Promise.all(
          response.data.map(async (message: any) => {
            // Obtener el fullName del sender
            const fullName = await getUserFullName(message.senderId);
            return {
              ...message,
              sender: { fullName },
            };
          })
        );
        setMessages(messagesWithSender);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Llamar a fetchMessages inicialmente
    fetchMessages();

    // Establecer un intervalo para actualizar los mensajes cada 30 segundos
    const interval = setInterval(fetchMessages, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [chatId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        // Enviar el mensaje al servidor a través de una solicitud POST
        const response = await axios.post(`${API_BASE_URL}/chats/${chatId}/messages`, {
          senderId: parseInt(userId, 10),  // Usamos el userId del localStorage
          content: newMessage,
        });

        console.log('Mensaje enviado:', response.data);

        // Obtener el fullName del usuario
        const senderFullName = await getUserFullName(Number(userId));  // Convertir userId a número
        const newMessageData = {
          sender: { fullName: senderFullName },
          content: newMessage,
          createdAt: new Date().toISOString(),
        };

        // Agregar el mensaje enviado al estado local (mensajes)
        setMessages((prevMessages) => [
          ...prevMessages,
          newMessageData,
        ]);

        // Limpiar el campo de entrada
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-bold">Chat</h2>
      <div className="space-y-4 mt-4">
        {messages.map((message, idx) => (
          <div key={idx} className="p-2 bg-gray-200 rounded-lg">
            <div className="font-semibold">{message.sender?.fullName || 'Unknown'}</div>
            <div>{message.content}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          className="border p-2 w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="ml-2 bg-blue-500 text-white p-2" onClick={handleSendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatContent;
