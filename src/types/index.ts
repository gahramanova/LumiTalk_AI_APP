export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}