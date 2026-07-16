import { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface CommandResponse {
  cmd: string;
  output: string;
  isHtml?: boolean;
}

export default function TerminalConsole() {
  const [history, setHistory] = useState<CommandResponse[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [matrixActive, setMatrixActive] = useState(false);
  const termBodyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = canvas.width / 20;
    const yPositions = Array(Math.floor(columns)).fill(0);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981"; // Emerald green
      ctx.font = "15px monospace";

      yPositions.forEach((y, index) => {
        const text = String.fromCharCode(33 + Math.floor(Math.random() * 93));
        const x = index * 20;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 20;
        }
      });
    };

    const interval = setInterval(drawMatrix, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const timeout = setTimeout(() => {
      setMatrixActive(false);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [matrixActive]);

  const outputToConsole = (cmd: string, text: string, isHtml = false) => {
    setHistory((prev) => [...prev, { cmd, output: text, isHtml }]);
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.toLowerCase().trim();
    if (!cmd) return;

    let response = "";
    let isHtml = false;

    switch (cmd) {
      case "help":
        response = `Available commands:
  help        - List all active commands
  about       - Retrieve biography of the engineer
  skills      - List core technical stacks
  experience  - Show commercial experience history
  projects    - Highlight deployments
  resume      - Open/Download updated resume
  contact     - Display communication coordinates
  clear       - Wipe console outputs
  secret      - Operationalize the Matrix mode`;
        break;
      case "about":
        response = "Shubham Chakrawarti - AI/ML Engineer & Full Stack Developer. Has 2 years of experience building neural network architectures and full-stack web platforms.";
        break;
      case "skills":
        response = `Technical Capabilities:
  Languages : Python, JS/TS, Java, SQL, C/C++
  AI/ML     : TensorFlow, Keras, PyTorch, OpenCV, MediaPipe, Scikit-learn
  Web       : React.js, Node.js, Express.js, REST APIs, WebSockets
  DevOps/DB : Docker, AWS, Azure, PostgreSQL, MongoDB, Git & CI/CD`;
        break;
      case "experience":
        response = `History Node:
  1. Deloitte - Data Analyst (Dec 2025 - Jan 2026)
     * Automated dashboards, improved processing speeds by 35%
  2. JPMorgan Chase & Co. - Software Engineer (Sep 2025 - Oct 2025)
     * React portals, microservices latency reduction by 20%
  3. YBI Foundation - AI/ML Intern (Oct 2024 - Feb 2025)
     * Built TF classification models with 94% accuracy`;
        break;
      case "projects":
        response = "Highlighting Projects section and filtering projects...";
        const projectsEl = document.getElementById("projects");
        if (projectsEl) {
          projectsEl.scrollIntoView({ behavior: "smooth" });
        }
        break;
      case "resume":
        response = "Redirecting to CV file download...";
        window.open("shubham_cv_updated.pdf", "_blank");
        break;
      case "contact":
        response = `Coordinates:
  Email: shubham2004.hc@gmail.com
  Phone: +91 9696137126
  LinkedIn: linkedin.com/in/shubham-chakrawarti-27764836a`;
        break;
      case "clear":
        setHistory([]);
        return;
      case "secret":
        setMatrixActive(true);
        response = "Executing Matrix digital rain script...";
        break;
      default:
        response = `Command not found: '${rawCmd}'. Type 'help' for instructions.`;
    }

    outputToConsole(rawCmd, response, isHtml);
  };

  return (
    <>
      {matrixActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full bg-black/90 z-[9999] pointer-events-auto"
        />
      )}

      <section id="terminal" className="py-20 border-b border-white/5 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col gap-2 mb-10">
            <div className="flex items-center gap-2 text-primary font-heading font-semibold text-xs tracking-wider uppercase">
              <Terminal className="h-4 w-4" /> Developer Interface
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Command Line Portal
            </h2>
          </div>

          <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-slate-900/90 px-5 py-3 border-b border-white/10 flex justify-between items-center">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="text-xs font-mono text-muted-foreground select-none">
                shubham@core:~
              </div>
            </div>

            <div
              ref={termBodyRef}
              className="p-6 font-mono text-sm min-h-[350px] max-h-[500px] overflow-y-auto flex flex-col gap-3 text-emerald-400 select-text"
              onClick={() => {
                const inputEl = document.getElementById("terminal-input");
                if (inputEl) inputEl.focus();
              }}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                Welcome to Shubham's Core Systems Console.
                Type <span className="text-primary font-bold">'help'</span> to retrieve available commands.
              </div>

              {history.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1 leading-relaxed">
                  <div className="flex items-center gap-2 text-sky-400 font-semibold select-none">
                    <span>shubham@core:~$</span>
                    <span className="text-white">{item.cmd}</span>
                  </div>
                  {item.isHtml ? (
                    <div
                      className="text-emerald-400 whitespace-pre-wrap pl-4 border-l border-emerald-400/20"
                      dangerouslySetInnerHTML={{ __html: item.output }}
                    />
                  ) : (
                    <div className="text-emerald-400 whitespace-pre-wrap pl-4 border-l border-emerald-400/20">
                      {item.output}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2 mt-auto">
                <span className="text-sky-400 font-semibold select-none">shubham@core:~$</span>
                <input
                  id="terminal-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommand(inputValue);
                      setInputValue("");
                    }
                  }}
                  className="bg-transparent border-none outline-none text-white flex-grow font-mono caret-primary focus:ring-0 focus:outline-none"
                  autoComplete="off"
                  autoFocus
                />
                <CornerDownLeft className="h-3 w-3 text-muted-foreground select-none opacity-55" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
