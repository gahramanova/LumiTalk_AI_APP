export async function askAI(historyMessages:any, systemPrompt:any) {
  const messagesPayload = [
    { role: "system", content: systemPrompt },
    ...historyMessages.map((m:any) => ({
      role: m.role,
      content: m.content
    }))
  ];

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: messagesPayload
    }),
  });

  const data = await res.json();

  if (!data.choices) {
    console.log("GROQ ERROR:", data);
    return "No response from AI";
  }

  return data.choices[0].message.content;
}
