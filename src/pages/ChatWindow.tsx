import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import InputArea from '../components/UI/InputArea';
import { Bot, Settings, Share2, Download, Copy } from 'lucide-react';
import { askAI } from "../utils/apiService"
import TypingIndicator from '../components/UI/TypingIndicator';



const ChatWindow: React.FC = () => {
  interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  code?: string;
}
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant' as const,
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);

  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async (userText: string) => {
    const newUserMsg = {
      id: Date.now(),
      role: "user" as const,
      content: userText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newUserMsg]);

    setIsTyping(true);

    const aiResponse = await askAI(
      [...messages, newUserMsg],
      "You are a helpful AI assistant"
    );

    setIsTyping(false);

    const newAiMsg = {
      id: Date.now() + 1,
      role: "assistant" as const,
      content: aiResponse,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newAiMsg]); 

  }


    return (
      <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 to-gray-950">

        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white">Lumi Talk</h2>
                <p className="text-sm text-gray-400">Always learning • Context-aware</p>
              </div>
            </div>

            {/* <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors group relative">
                <Share2 className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Copy className="w-5 h-5 text-gray-400 hover:text-blue-400" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-400 hover:text-blue-400" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400 hover:text-blue-400" />
              </button>
            </div> */}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-custom">
          <div className="max-w-3xl mx-auto space-y-8">
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <i className='font-medium'> {isTyping && <TypingIndicator />}</i>
          </div>
        </div>

        {/* Input */}
        <div className="sticky bottom-0 border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto p-4">
            <InputArea onSend={sendMessage} />

            <div className="flex items-center justify-center mt-3 space-x-4">
              <p className="text-xs text-gray-500">
                AI can make mistakes. Verify important information.
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  };

  export default ChatWindow;
