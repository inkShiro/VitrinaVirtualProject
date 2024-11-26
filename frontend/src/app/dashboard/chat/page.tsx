"use client"
import ChatComponent from '@/components/Dashboard/chat/ChatComponent';
import { useSearchParams } from 'next/navigation';

const ChatPage = () => {
  const searchParams = useSearchParams();

  // Obtener parámetros de la URL
  const chatId = searchParams.get('chatId');
  const userId = searchParams.get('userId');

  if (!chatId || !userId) {
    return <p>Cargando...</p>; // Mostrar mientras no haya datos
  }

  return (
    <div className="chat-page">
      <h1>Chat</h1>
      <ChatComponent chatId={Number(chatId)} userId={Number(userId)} />

      <style jsx>{`
        .chat-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f5f5f5;
        }
        h1 {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;
