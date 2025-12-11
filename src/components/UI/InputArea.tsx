import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

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
    <form onSubmit={handleSubmit} className="relative w-full flex items-end">
      {/* Text Area */}
      <TextareaAutosize
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message AI Assistant..."
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl placeholder-gray-500 resize-none scrollbar-custom pr-20" // pr-20 -> buttons üçün padding
        minRows={2}
        maxRows={15}
      />

      {/* Right-side Buttons */}
      <div className="absolute right-4 bottom-2 flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setIsRecording(!isRecording)}
          className={`p-2 rounded-lg transition-colors ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'hover:bg-gray-800'}`}
        >
          <Mic
            className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-gray-400 hover:text-red-400'}`}
          />
        </button>

        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-3 rounded-xl transition-all ${message.trim()
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            : 'bg-gray-700 cursor-not-allowed'
            }`}
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
};

export default InputArea;
