import React, { useEffect, useRef, useState } from 'react';
import { Send, Mic } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

interface InputProps {
  onSend: (msg: string) => void;
}

const InputArea: React.FC<InputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(prev => prev ? prev + " " + transcript : transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

    setIsRecording(!isRecording);
  };

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
      <TextareaAutosize
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message AI Assistant..."
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl resize-none pr-20"
        minRows={2}
        maxRows={15}
      />

      <div className="absolute right-4 bottom-2 flex items-center space-x-2">
        <button
          type="button"
          onClick={toggleRecording}
          className={`p-2 rounded-lg ${
            isRecording
              ? 'bg-red-500 animate-pulse'
              : 'hover:bg-gray-800'
          }`}
        >
          <Mic className="w-5 h-5 text-white" />
        </button>

        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-3 rounded-xl ${
            message.trim()
              ? 'bg-gradient-to-r from-blue-600 to-purple-600'
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
