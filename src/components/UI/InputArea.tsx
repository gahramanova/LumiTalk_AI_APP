import React, { useState } from 'react';
import { Send, Mic, } from 'lucide-react';

interface InputProps {
  onSend: (msg: string) => void;
}

const InputArea: React.FC<InputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      onSend(message);       
      setMessage('');         
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-evenly items-center relative">
      {/* Action Buttons */}
      {/* <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
        <button type="button" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Paperclip className="w-5 h-5 text-gray-400 hover:text-blue-400" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Image className="w-5 h-5 text-gray-400 hover:text-blue-400" />
        </button>
      </div> */}

      {/* Text Area */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message AI Assistant..."
        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   resize-none placeholder-gray-500"
      />

      {/* Right-side Buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">

        {/* <button type="button" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Smile className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
        </button> */}

        <button
          type="button"
          onClick={() => setIsRecording(!isRecording)}
          className={`p-2 rounded-lg transition-colors ${
            isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'hover:bg-gray-800'
          }`}
        >
          <Mic
            className={`w-5 h-5 ${
              isRecording ? 'text-white' : 'text-gray-400 hover:text-red-400'
            }`}
          />
        </button>

        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-3 rounded-xl transition-all ${
            message.trim()
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Quick Actions */}
      {/* <div className="absolute -top-12 right-0 flex space-x-2">
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Improve writing</span>
        </button>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Make shorter</span>
        </button>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Translate</span>
        </button>
      </div> */}
    </form>
  );
};

export default InputArea;
