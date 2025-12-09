import { Sidebar } from 'lucide-react';
import React from 'react';
import ChatWindow from "../pages/ChatWindow";

const ChatLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Left Sidebar - Memory/Conversations */}
      <div className="flex-shrink-0 h-full">
        <Sidebar />
      </div>
      
      {/* Main Chat Area */}
      <ChatWindow />
    </div>


  );
};

export default ChatLayout;