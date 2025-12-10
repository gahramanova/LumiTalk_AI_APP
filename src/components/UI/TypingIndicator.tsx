import React, { useEffect, useState } from 'react'
import MessageBubble from '../../pages/MessageBubble'

export default function TypingIndicator() {
    const [dots, setDots] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + "." : ""))
        }, 500)

        return () => clearInterval(interval)
    }, [])

  return (
    <>
     <MessageBubble
      message={{ role: "assistant", content: `AI is typing${dots}` }}
    />
    </>
  )
}
