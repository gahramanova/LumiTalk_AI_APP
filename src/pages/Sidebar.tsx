import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Plus, 
  Search, 
  Clock, 
  Star, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Home,
  History,
  Bookmark,
  Settings,
  User,
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const conversations = [
    { id: 1, title: 'React Project Setup', messageCount: 24, date: 'Today', pinned: true },
    { id: 2, title: 'Python Data Analysis', messageCount: 18, date: 'Yesterday', pinned: true },
    { id: 3, title: 'API Documentation', messageCount: 32, date: '2 days ago', pinned: false },
    { id: 4, title: 'UI/UX Design Tips', messageCount: 15, date: 'Nov 12', pinned: false },
    { id: 5, title: 'Machine Learning Basics', messageCount: 42, date: 'Nov 10', pinned: true },
    { id: 6, title: 'Web Security Best Practices', messageCount: 28, date: 'Nov 8', pinned: false },
    { id: 7, title: 'Database Optimization', messageCount: 21, date: 'Nov 5', pinned: false },
    { id: 8, title: 'DevOps Pipeline Setup', messageCount: 36, date: 'Nov 3', pinned: false },
  ];

  return (
    <div className={`h-full flex flex-col bg-gray-900 border-r border-gray-800 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo and Header */}
      <div className="p-6 border-b border-gray-800">
        {isCollapsed ? (
          <div className="flex justify-center">
            <button 
              onClick={() => setIsCollapsed(false)}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LumiTalk AI</h1>
                <p className="text-xs text-gray-400">v2.0 Beta</p>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="p-4">
        {!isCollapsed ? (
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 bg-gray-800 text-white rounded-lg">
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors">
              <History className="w-5 h-5" />
              <span className="font-medium">History</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors">
              <Bookmark className="w-5 h-5" />
              <span className="font-medium">Saved</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <button className="p-3 bg-gray-800 text-white rounded-lg">
              <Home className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors">
              <History className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* New Chat Button */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5" />
            <span className="font-semibold">New Chat</span>
          </button>
        </div>
      )}

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>
        </div>
      )}

      {/* Pinned Conversations */}
      {!isCollapsed && (
        <div className="px-4 pb-2">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-300">Pinned</span>
          </div>
          <div className="space-y-1">
            {conversations.filter(c => c.pinned).map((conv) => (
              <button
                key={conv.id}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-gray-200 truncate">{conv.title}</span>
                </div>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                  {conv.messageCount}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Conversations */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 mb-2 pt-4 border-t border-gray-800">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-300">Recent</span>
          </div>
        )}
        
        <div className="space-y-1">
          {(isCollapsed ? conversations.slice(0, 6) : conversations).map((conv) => (
            <button
              key={conv.id}
              className={`w-full flex ${
                isCollapsed ? 'justify-center p-3' : 'justify-between p-3'
              } hover:bg-gray-800 rounded-lg transition-colors group relative`}
            >
              {isCollapsed ? (
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                  {conv.messageCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
                      {conv.messageCount > 9 ? '9+' : conv.messageCount}
                    </span>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-200 truncate">{conv.title}</p>
                      <p className="text-xs text-gray-400">{conv.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">{conv.messageCount}</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity">
                      <Trash2 className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-800 p-4">
        {isCollapsed ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <button 
              onClick={() => setIsCollapsed(false)}
              className="p-2 hover:bg-gray-800 rounded-lg"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div>
                <p className="font-medium text-sm text-white">John Doe</p>
                <p className="text-xs text-gray-400">Pro Plan</p>
              </div>
            </button>
            <div className="flex items-center space-x-1">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <LogOut className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;