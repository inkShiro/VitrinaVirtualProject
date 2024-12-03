// components/ChatSidebar.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Chat {
  id: number;
  users: { fullName: string }[];
  messages: { content: string, createdAt: string }[];
}

const ChatSidebar = ({ userId, onSelectChat }: { userId: number, onSelectChat: (chatId: number) => void }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chats/user/${userId}`);
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, [userId]);

  return (
    <div className="w-1/3 bg-gray-100 p-4">
      <h2 className="text-xl font-bold">Chats</h2>
      <div className="space-y-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="font-semibold">{chat.users.map((user) => user.fullName).join(', ')}</div>
            <div className="text-sm text-gray-600">{chat.messages[0]?.content || 'Sin mensajes'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
