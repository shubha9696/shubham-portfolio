import { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, ShieldCheck, Cpu } from "lucide-react";

interface CommandResponse {
  cmd: string;
  output: string;
}

interface FileSystemNode {
  type: "file" | "dir";
  content?: string;
  children?: { [key: string]: FileSystemNode };
}

const fileSystem: { [key: string]: FileSystemNode } = {
  "about.md": {
    type: "file",
    content: `## Shubham Chakrawarti
AI/ML Engineer & Full Stack Developer with 2 years of experience.
Passionate about building deep learning neural networks, computer vision tools, and high-performance React portals.
Currently exploring autonomous multi-agent orchestration and low-latency API engineering.`
  },
  "skills.md": {
    type: "file",
    content: `## Technical Stack
- LANGUAGES     : Python, JS/TS, Java, SQL, C/C++
- AI & ML       : TensorFlow, Keras, PyTorch, OpenCV, MediaPipe, Scikit-learn
- FRONTEND      : React.js, Next.js, Redux, TailwindCSS, HTML5/CSS3
- BACKEND/DB    : Node.js, Express.js, REST APIs, WebSockets, PostgreSQL, MongoDB, Prisma
- CLOUD/DEVOPS  : AWS, Azure, Docker, Git, CI/CD pipelines`
  },
  "contact.md": {
    type: "file",
    content: `## Contact Coordinates
- EMAIL    : shubham2004.hc@gmail.com
- PHONE    : +91 9696137126
- LINKEDIN : linkedin.com/in/shubham-chakrawarti-27764836a
- GITHUB   : github.com/shubha9696`
  },
  "projects": {
    type: "dir",
    children: {
      "sonoma.md": {
        type: "file",
        content: `### Sonoma AI Multimodal Platform
- Role: Lead Developer
- Tech: React, Node.js, Express, MongoDB, TensorFlow
- Desc: Immersive AI orchestrator supporting chatbot interface, semantic video captioning, audio transcribing, and billing model integrations.`
      },
      "hiring_bot.md": {
        type: "file",
        content: `### Hiring Assistant Chatbot
- Role: Creator
- Tech: React, TypeScript, Node.js, NLP Engines
- Desc: Automates candidate screening, runs structured technical assessments, and ranks applicant profiles.`
      },
      "distance_system.md": {
        type: "file",
        content: `### Single Camera Speed & Distance Estimation
- Role: CV Architect
- Tech: Python, OpenCV, MediaPipe
- Desc: Real-time velocity tracker and depth sensor utilizing single camera visual perspective mapping.`
      },
      "smartsession.md": {
        type: "file",
        content: `### SmartSession Student Monitor
- Role: Full Stack AI
- Tech: JavaScript, React, TensorFlow.js
- Desc: Real-time student engagement analyzer that runs client-side confusion and attentiveness metrics.`
      }
    }
  },
  "credentials": {
    type: "dir",
    children: {
      "deloitte.md": {
        type: "file",
        content: `### Data Analyst | Deloitte
- Duration: Dec 2025 - Jan 2026
- Key Accomplishments:
  * Automated business intelligence dashboards and ETL pipelines, boosting data processing speeds by 35%.
  * Constructed corporate growth forecasting engines using Scikit-Learn.
  * Optimised complex SQL query structures.`
      },
      "jpmc.md": {
        type: "file",
        content: `### Software Engineer | JPMorgan Chase & Co.
- Duration: Sep 2025 - Oct 2025
- Key Accomplishments:
  * Engineered high-throughput transaction monitoring dashboards using React and Node.js.
  * Decreased API endpoint latencies by 20%.
  * Containerised and orchestrated services using Docker and Kubernetes.`
      }
    }
  }
};

export default function TerminalConsole() {
  const [history, setHistory] = useState<CommandResponse[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentDir, setCurrentDir] = useState<string[]>([]); // path array
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
      ctx.fillStyle = "#0f0";
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

  const getDirNode = (path: string[]): { [key: string]: FileSystemNode } | null => {
    let current = fileSystem;
    for (const segment of path) {
      if (current[segment] && current[segment].type === "dir") {
        current = current[segment].children || {};
      } else {
        return null;
      }
    }
    return current;
  };

  const getPathString = () => {
    return "/" + currentDir.join("/");
  };

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    let output = "";

    switch (cmd) {
      case "help":
        output = `Available Commands:
  ls          - List files & directories in current directory
  cd [dir]    - Change working directory (e.g. cd projects, cd ..)
  cat [file]  - View file contents (e.g. cat about.md)
  pwd         - Print working directory
  neofetch    - Show system logo and specifications
  git log     - View mock commit logs
  git status  - View mock git status
  clear       - Clear screen logs
  secret      - Toggle the Matrix Digital Rain sequence`;
        break;

      case "ls": {
        const node = getDirNode(currentDir);
        if (node) {
          const names = Object.keys(node).map((name) => {
            const isDir = node[name].type === "dir";
            return isDir ? `${name}/` : name;
          });
          output = names.length > 0 ? names.join("    ") : "(empty)";
        } else {
          output = "Error: Directory node invalid.";
        }
        break;
      }

      case "cd": {
        if (!arg || arg === "/") {
          setCurrentDir([]);
        } else if (arg === "..") {
          if (currentDir.length > 0) {
            setCurrentDir((prev) => prev.slice(0, -1));
          }
        } else {
          const node = getDirNode(currentDir);
          if (node && node[arg] && node[arg].type === "dir") {
            setCurrentDir((prev) => [...prev, arg]);
          } else {
            output = `cd: no such directory: ${arg}`;
          }
        }
        break;
      }

      case "cat": {
        if (!arg) {
          output = "cat: missing file argument. Usage: cat [filename]";
        } else {
          const node = getDirNode(currentDir);
          if (node && node[arg]) {
            if (node[arg].type === "file") {
              output = node[arg].content || "";
            } else {
              output = `cat: ${arg}: is a directory`;
            }
          } else {
            output = `cat: ${arg}: no such file`;
          }
        }
        break;
      }

      case "pwd":
        output = getPathString();
        break;

      case "neofetch":
        output = `   _   _ _                       _      
  / \\ | | |    ___  __ _  __ _  | |_ _ _ 
 / _ \\| | |   / __|/ _\` |/ _\` | | __| '_|
/ ___ \\| | |   \\__ \\ (_| | (_| | | |_| |  
/_/   \\_\\_|_|___|___/\\__,_|\\__,_|  \\__|_|  
            |_____|
----------------------------------------
OS      : ShubhamOS v2.0.26 (WSL2-Ubuntu)
Kernel  : 5.15.0-88-generic
Uptime  : 14 hours, 32 mins
Shell   : bash 5.1.16
CPU     : AMD Ryzen 7 5800H @ 3.2GHz
RAM     : 16 GB DDR4
Stack   : TypeScript, Python, TensorFlow, React, Docker`;
        break;

      case "git":
        if (arg === "status") {
          output = `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean`;
        } else if (arg === "log") {
          output = `commit fa32c8928ab0912f (HEAD -> main, origin/main)
Author: Shubham Chakrawarti <shubham2004.hc@gmail.com>
Date:   Thu Jul 16 22:38:12 2026 +0530

    feat: Add interactive Developer Console and Alexa AI assistant widget

commit c8384f9382103db8
Author: Shubham Chakrawarti <shubham2004.hc@gmail.com>
Date:   Wed Jan 28 14:02:11 2026 +0530

    docs: Update technical credentials and portfolio layout`;
        } else {
          output = "git: unknown command. Try 'git status' or 'git log'.";
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "secret":
      case "matrix":
        setMatrixActive(true);
        output = "Initializing digital matrix stream...";
        break;

      default:
        output = `Command not found: '${cmd}'. Type 'help' for support.`;
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output }]);
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
              <Cpu className="h-4 w-4" /> Systems Interface
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Core Developer Console
            </h2>
          </div>

          <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-slate-900/90 px-5 py-3 border-b border-white/10 flex justify-between items-center select-none">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                shubham@core:{getPathString()}
              </div>
            </div>

            <div
              ref={termBodyRef}
              className="p-6 font-mono text-sm min-h-[350px] max-h-[500px] overflow-y-auto flex flex-col gap-3 text-emerald-400 select-text"
              onClick={() => {
                const inputEl = document.getElementById("terminal-input-field");
                if (inputEl) inputEl.focus();
              }}
            >
              <div className="whitespace-pre-wrap leading-relaxed select-none">
                Welcome to Shubham's Core Systems Console.
                Type <span className="text-primary font-bold">'help'</span> to view available system hooks.
              </div>

              {history.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1 leading-relaxed">
                  <div className="flex items-center gap-2 text-sky-400 font-semibold select-none">
                    <span>shubham@core:{getPathString()}~$</span>
                    <span className="text-white">{item.cmd}</span>
                  </div>
                  <div className="text-emerald-400 whitespace-pre-wrap pl-4 border-l border-emerald-400/20">
                    {item.output}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 mt-auto">
                <span className="text-sky-400 font-semibold select-none">
                  shubham@core:{getPathString()}~$
                </span>
                <input
                  id="terminal-input-field"
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
