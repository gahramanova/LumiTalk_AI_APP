import { loadChats, saveChats } from "./storage"

export const createNewChats = () => {
    const chats = loadChats()

    const newChat = {
        id: crypto.randomUUID(),
        title: "New Chat",
        messages: [],
        createdAt: new Date().toISOString()
    }

    const updated = [...chats, newChat]
    saveChats(updated)

    return newChat
}

export const updateChatMessages = (chatId:any, messages:any) => {
    const chats = loadChats()
    const updated = chats.map((c:any) =>
        c.id === chatId ? { ...c, messages } : c
    )
    saveChats(updated)
}