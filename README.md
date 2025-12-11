# LumiTalk AI – Frontend-Only AI Chat Application

A modern AI-powered chat application built entirely on the frontend using **Groq API**, **React**, **TypeScript**, and **TailwindCSS**.

LumiTalk AI demonstrates real-world AI integration, clean UI/UX, persistent multi-chat architecture, and seamless communication with LLMs using OpenAI-compatible endpoints.

---

## 🚀 Features

### 🔥 AI Integration (Groq API, OpenAI-Compatible)
- Direct communication with Groq’s `/openai/v1/chat/completions` endpoint  
- Uses models such as:
  - **openai/gpt-oss-120b**
  - And other Groq models  
- Extremely fast inference thanks to Groq’s accelerated infrastructure  
- 100% frontend-only integration using simple POST requests (no backend required)

---

## 💬 Multi-Chat System (LocalStorage Persistence)

Each chat contains:
- `id`
- `title`
- `messages[]`
- `createdAt`

Additional functionality:
- Chats persist automatically via **LocalStorage**
- Chats load instantly after refresh
- Clean sidebar with:
  - Create new chat  
  - Switch between chats  
  - Delete chat (optional)

---

## 🎨 Modern UI / UX

Built using **TailwindCSS**, featuring:
- Fully responsive, minimalistic layout
- Stable input field (never resizes even with long text or code)
- Automatic line wrapping (no overflow)
- Auto-scroll to the latest message
- Distinct styles for user and AI messages
- Clean rendering for code blocks inside AI responses

---

## 🧩 Autocomplete & Prompt Suggestions

- Smart placeholder suggestions  
- Auto-generated recommended prompts  
- Smooth, intuitive typing experience  

---

## 🏗️ Project Architecture

### Frontend
- **React + TypeScript** for scalable UI and logic  
- **TailwindCSS** for styling  
- **Custom Hooks** for managing chat state, input, and API behavior  
- **LocalStorage** for persistent multi-chat storage (no backend database)

---

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **TailwindCSS**
- **Groq API**
- **Vite** (optional if you used it)

---

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
