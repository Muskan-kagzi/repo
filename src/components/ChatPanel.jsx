import React, { useState } from "react";
import axios from "axios";
import { MessageSquare, X } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I can tell you about rainfall & landslide risks. Ask me!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { sender: "user", text: userText }]);
    setInput("");

    try {
      const resp = await axios.post("http://localhost:5000/chat", { message: userText });
      const reply = resp.data.reply;
      setMessages((m) => [...m, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { sender: "bot", text: "⚠️ Backend not reachable." }]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-5 right-5 p-3 bg-blue-600 text-white rounded-full shadow-lg"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {open && (
        <div className="fixed bottom-16 right-5 w-96 h-96 bg-white border shadow-lg rounded-lg flex flex-col">
          <div className="p-2 border-b font-semibold">Rainfall & Landslide Chatbot</div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`p-2 rounded-lg max-w-[80%] ${m.sender === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200"}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded p-1"
              placeholder="Ask about rainfall..."
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white px-3 py-1 rounded">Send</button>
          </div>
        </div>
      )}
    </>
  );
}
