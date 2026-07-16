import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "agent", text: "Hello! I'm Alexa, Shubham's AI Twin. Ask me anything about his credentials, experience, or projects!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const addMessage = (sender: "agent" | "user", text: string) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const askPreset = (prompt: string) => {
    addMessage("user", prompt);
    setTimeout(() => respondToQuery(prompt.toLowerCase()), 500);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    addMessage("user", text);
    setInputValue("");
    setTimeout(() => respondToQuery(text.toLowerCase()), 500);
  };

  const respondToQuery = (query: string) => {
    let response = "I'm not sure about that. Try asking about his experience, projects, or education!";
    
    if (query.includes("experience") || query.includes("work") || query.includes("job") || query.includes("deloitte") || query.includes("jpmorgan")) {
      response = "Shubham has worked as a **Data Analyst** at **Deloitte** (automated analytical dashboards, 35% speedup) and a **Software Engineer** at **JPMorgan Chase & Co** (React & Node.js microservices). Let me show you his Experience section!";
      const expEl = document.getElementById("experience");
      if (expEl) expEl.scrollIntoView({ behavior: "smooth" });
    } else if (query.includes("ai") || query.includes("project") || query.includes("portfolio")) {
      response = "Shubham has built multiple high-impact projects including **Sonoma AI Multimodal**, the **Hiring Assistant Chatbot**, and a **Distance Measurement System**. Let me scroll down to his projects!";
      const projectsEl = document.getElementById("projects");
      if (projectsEl) projectsEl.scrollIntoView({ behavior: "smooth" });
    } else if (query.includes("education") || query.includes("college") || query.includes("university") || query.includes("degree") || query.includes("parul")) {
      response = "He is completing a **B.Tech in CSE (Artificial Intelligence)** from **Parul University** (GPA: 7.8/10).";
    } else if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("linkedin")) {
      response = "Contact details: Email is **shubham2004.hc@gmail.com**, Phone is **+91 9696137126**, LinkedIn is **linkedin.com/in/shubham-chakrawarti-27764836a**.";
    } else if (query.includes("console") || query.includes("terminal") || query.includes("matrix") || query.includes("secret")) {
      response = "Scroll to the **Command Line Portal** section and try typing commands like \`help\`, \`skills\`, or \`secret\`!";
      const termEl = document.getElementById("terminal");
      if (termEl) termEl.scrollIntoView({ behavior: "smooth" });
    } else if (query.includes("resume") || query.includes("cv")) {
      response = "You can download his updated resume by clicking the **Resume** button in the header or typing \`resume\` in the developer terminal console.";
    }

    addMessage("agent", response);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 z-[999] hover:rotate-12"
      >
        <Bot className="h-6 w-6" />
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-slate-950 border border-white/10 rounded-2xl flex flex-col shadow-2xl z-[999] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-white">Alexa (Shubh's AI)</h4>
                  <span className="text-xs text-emerald-400 flex items-center gap-1.5 before:content-[''] before:w-1.5 before:h-1.5 before:bg-emerald-400 before:rounded-full">Active</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "agent" 
                      ? "bg-slate-900 border border-white/10 text-white self-start rounded-bl-none" 
                      : "bg-gradient-to-tr from-primary to-secondary text-white self-end rounded-br-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Predefined Chips */}
            <div className="px-4 py-2 border-t border-white/10 bg-slate-900/40 flex flex-wrap gap-2">
              <button onClick={() => askPreset("Tell me about Shubham's experience")} className="text-xs bg-slate-900 border border-white/10 hover:border-primary/50 text-muted-foreground hover:text-white px-3 py-1.5 rounded-full transition-colors">
                Experience
              </button>
              <button onClick={() => askPreset("Show me his AI projects")} className="text-xs bg-slate-900 border border-white/10 hover:border-primary/50 text-muted-foreground hover:text-white px-3 py-1.5 rounded-full transition-colors">
                Projects
              </button>
              <button onClick={() => askPreset("What is his education?")} className="text-xs bg-slate-900 border border-white/10 hover:border-primary/50 text-muted-foreground hover:text-white px-3 py-1.5 rounded-full transition-colors">
                Education
              </button>
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-white/10 bg-slate-900 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Ask me anything..."
                className="bg-slate-950 border border-white/10 rounded-full px-4 py-2 text-sm text-white outline-none flex-grow focus:border-primary transition-colors"
              />
              <button 
                onClick={handleSend}
                className="w-9 h-9 rounded-full bg-primary hover:bg-secondary flex items-center justify-center text-white transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
