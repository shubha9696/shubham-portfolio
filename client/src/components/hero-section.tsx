import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Download } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_ai_technology_background_with_glowing_nodes.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Abstract AI Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10" />
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight"
          >
            Hi, I'm <span className="text-gradient">Shubham</span>.
            <br />
            I Build Intelligent Systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            AI/ML Engineer & Full Stack Developer based in Mumbai. 
            Creating scalable, secure, and user-friendly digital products infused with Artificial Intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-lg w-full sm:w-auto" asChild>
              <a href="#projects">
                View Work <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-lg border-white/20 hover:bg-white/10 w-full sm:w-auto" asChild>
              <a href="/resume.pdf" target="_blank"> {/* Assuming resume is at public root or linked later */}
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-6"
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
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
      </motion.div>
    </section>
  );
}