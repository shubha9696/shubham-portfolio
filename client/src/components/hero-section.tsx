import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Download } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_ai_technology_background_with_glowing_nodes.png";

export default function HeroSection() {
  const highlights = [
    { label: "AI, ML, Data & Full Stack Projects", value: "20+" },
    { label: "Industry Certifications & Specializations", value: "10+" },
    { label: "Hackathons & Tech Events", value: "Runner-up" },
  ];

  const focusAreas = [
    "AI/ML",
    "Data Science",
    "Full Stack Engineering",
    "Cybersecurity",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Abstract AI Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />
        <div className="pointer-events-none absolute -top-32 left-[-10%] h-80 w-80 rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-secondary/25 blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary border border-primary/30 text-sm font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to AI, Data, and Full Stack roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight tracking-tight"
          >
            Hi, I'm <span className="text-gradient">Shubham</span>.
            <br />
            I Build Intelligent Systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            AI/ML Engineer, Data Analyst, and Full Stack Developer focused on
            turning complex problems into elegant, production-ready solutions.
            From research prototypes to scalable web platforms, I design,
            build, and ship intelligent products end-to-end.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-lg w-full sm:w-auto shadow-[0_18px_45px_rgba(88,28,135,0.55)] hover:shadow-[0_24px_60px_rgba(88,28,135,0.75)] transition-shadow"
              asChild
            >
              <a href="#projects">
                View Work <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-lg border-white/20 hover:bg-white/10 w-full sm:w-auto backdrop-blur-md"
              asChild
            >
              <a href="/resume.pdf" target="_blank">
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {highlights.map((item) => (
              <div
                key={item.label}
                className="glass-card rounded-2xl px-5 py-4 text-left border-white/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-xs uppercase tracking-wide text-muted-foreground/80">
                  {item.label}
                </div>
                <div className="mt-2 text-2xl font-semibold text-foreground">
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground"
          >
            <span className="px-3 py-1 rounded-full border border-white/10 bg-background/60">
              Focus Areas
            </span>
            {focusAreas.map((area) => (
              <span
                key={area}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10"
              >
                {area}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-6"
          >
            <a
              href="https://github.com/shubha9696"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/shubham-chakrawarti-27764836a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <div className="relative flex flex-col items-center gap-3">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em]">
            Scroll to explore
          </span>
        </div>
      </motion.div>
    </section>
  );
}
