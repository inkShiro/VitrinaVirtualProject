"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import ChatSidebar from '@/components/ChatSidebar';
import ChatContent from '@/components/ChatContent';

const ChatPage = () => {
  const [accountType, setAccountType] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Solo acceder a localStorage en el cliente
      const storedAccountType = localStorage.getItem('accountType');
      const storedUserId = localStorage.getItem('user_id');
      
      setAccountType(storedAccountType);
      setUserId(storedUserId ? parseInt(storedUserId, 10) : undefined);
    }
  }, []);

  const empresa_view = accountType === "company";

  if (userId === undefined) {
    return <div>No se encontró el usuario.</div>; // O redirigir a otra página
  }

  return (
    <div className="flex min-h-screen ml-20">
      <Sidebar empresa_view={empresa_view} />
      <ChatSidebar userId={userId} onSelectChat={setSelectedChatId} />
      {selectedChatId && <ChatContent chatId={selectedChatId} />}
    </div>
  );
};

export default ChatPage;
