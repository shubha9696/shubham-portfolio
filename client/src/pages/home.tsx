import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceSection from "@/components/experience-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import TerminalConsole from "@/components/terminal-console";
import ChatWidget from "@/components/chat-widget";
import AudioController from "@/components/audio-controller";
import CustomCursor from "@/components/custom-cursor";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);

  // Smooth scroll
  useEffect(() => {
    if (isBooting) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isBooting]);

  // Boot sequence simulation
  useEffect(() => {
    const lines = [
      "SYSTEM INITIATED :: SHUBHAM OS v2.0.26",
      "CORE INTERNALS CONNECTED TO HOST NODE...",
      "LOAD MODULES: [PANDAS, TENSORFLOW, REACT, DOCKER] -> SUCCESS",
      "FETCHING EXPERT PROFILE DATA FROM DELOITTE/JPMC...",
      "SYNCHRONIZING ALEXA AI TWIN SYSTEM ENGINE...",
      "ALL SYSTEMS ACTIVE. BOOTING PORTAL..."
    ];

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        setTimeout(() => setIsBooting(false), 600);
      }
      setBootProgress(currentProgress);
    }, 60);

    // Line printing delays
    lines.forEach((line, idx) => {
      setTimeout(() => {
        setBootLines((prev) => [...prev, `> ${line}`]);
      }, idx * 400);
    });

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isBooting ? (
        <motion.div
          key="bootloader"
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col justify-center items-center px-6 font-mono text-emerald-500 select-none"
        >
          <div className="max-w-xl w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2 min-h-[160px] text-xs md:text-sm">
              {bootLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="leading-relaxed"
                >
                  {line}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-emerald-400">
                <span>SYSTEM COMPILATION STATUS</span>
                <span>{bootProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 border border-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-75"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
            </div>
            
            <div className="text-[10px] text-muted-foreground/50 text-center uppercase tracking-widest mt-4">
              Authorized Connection Only // IP Logged
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-transparent text-foreground font-sans selection:bg-primary/30 page-shell"
        >
          <div className="mesh-gradient" />
          <div className="noise-bg fixed inset-0 z-50 pointer-events-none" />
          <CustomCursor />
          <Navbar />
          <main>
            <HeroSection />
            <TerminalConsole />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>
          <ChatWidget />
          <AudioController />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
