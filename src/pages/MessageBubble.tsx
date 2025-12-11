import React, { useState } from 'react';
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown, Volume2, Edit } from 'lucide-react';
import LoadingDots from '../components/UI/LoadingDots';
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  code?: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAI = message.role === 'assistant';

  return (
    <div className={`flex space-x-4 ${isAI ? '' : 'flex-row-reverse space-x-reverse'}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAI
          ? 'bg-gradient-to-br from-blue-500 to-purple-600'
          : 'bg-gradient-to-br from-gray-600 to-gray-700'
          }`}>
          {isAI ? (
            <Bot className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isAI ? '' : 'flex justify-end'}`}>
        <div className={`max-w-[80%] rounded-2xl p-5 ${isAI
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20'
          }`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-semibold ${isAI ? 'text-blue-300' : 'text-purple-300'
              }`}>
              {isAI ? 'AI Assistant' : 'You'}
            </span>
            <span className="text-xs text-gray-400">{message.timestamp}</span>
          </div>

          {/* Message Text */}
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-100 leading-relaxed prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold" {...props} />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="italic text-gray-200" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="my-1" {...props} />,
                  code: ({ node, ...props }) => (
                    <code className="bg-gray-700 px-1 py-0.5 rounded text-sm text-green-200" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
              {message.isStreaming && <LoadingDots />}
            </div>

            {/* Code Block */}
            {message.code && (
              <div className="mt-4 rounded-lg border border-gray-700 bg-gray-950 overflow-hidden max-w-full">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-400">index.jsx</span>
                </div>

                {/* Code content */}
                <div className="max-w-full overflow-x-auto">
                  <pre className="p-4 text-sm text-gray-300 whitespace-pre rounded-b-lg">
                    <code>
                      {message.code}
                    </code>
                  </pre>
                </div>
              </div>
            )}

          </div>

          {/* Actions */}
          {isAI && (
            <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copied ? 'Copied!' : 'Copy code'}</span>
              </button>

              <button className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setLiked(!liked)}
                className={`p-1.5 rounded-lg transition-colors ${liked ? 'bg-green-900/30 text-green-400' : 'hover:bg-gray-700'
                  }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>

              <button
                onClick={() => setDisliked(!disliked)}
                className={`p-1.5 rounded-lg transition-colors ${disliked ? 'bg-red-900/30 text-red-400' : 'hover:bg-gray-700'
                  }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>

              <button className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;