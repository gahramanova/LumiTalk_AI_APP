import { useEffect, useState } from 'react';
import MessageBubble from '../../pages/MessageBubble';

export default function TypingIndicator() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const typingMessage = {
    id: Date.now(), 
    role: "assistant" as const,
    content: `AI is typing${dots}`,
    timestamp: new Date().toLocaleTimeString(),
  };

  return <MessageBubble message={typingMessage} />;
}
