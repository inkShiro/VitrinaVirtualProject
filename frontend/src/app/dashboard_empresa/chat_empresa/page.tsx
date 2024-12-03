// pages/chat.tsx
"use client"
import React, { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import ChatSidebar from '@/components/ChatSidebar';
import ChatContent from '@/components/ChatContent';

const ChatPage = () => {
  const accountType = localStorage.getItem('accountType');
  const storedUserId = localStorage.getItem('user_id');
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  
  let empresa_view = false;

  if(accountType === "company"){
    empresa_view = true;
  }

  // Convertir storedUserId a number, asegurándose de que siempre se pase un valor válido
  const userId = storedUserId ? parseInt(storedUserId, 10) : undefined;

  // Si no hay userId, podrías redirigir o mostrar un mensaje
  if (userId === undefined) {
    return <div>No se encontró el usuario.</div>;  // O redirigir a otra página
  }

  return (
    <div className="flex min-h-screen ml-20">  {/* Se añade el margen izquierdo de 20 */}
      <Sidebar empresa_view={empresa_view} /> {/* Cambia a true si es vista de empresa */}
      <ChatSidebar userId={userId} onSelectChat={setSelectedChatId} />
      {selectedChatId && <ChatContent chatId={selectedChatId} />}
    </div>
  );
};

export default ChatPage;
