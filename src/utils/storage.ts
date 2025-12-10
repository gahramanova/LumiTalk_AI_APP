export const loadChats = () => {

    try {
        return JSON.parse(localStorage.getItem("lumiChats") || "[]")
    } catch {
        return [];
    }
}

export const saveChats = (chats: any[]) => {
    localStorage.setItem("lumiChats", JSON.stringify(chats))
}