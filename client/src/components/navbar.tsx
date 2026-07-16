import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Magnetic from "./magnetic";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Console", href: "#terminal" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.65)]"
          : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a
          href="#"
          className="text-2xl font-heading font-bold text-foreground hover:text-primary transition-colors select-none"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          SC<span className="text-primary">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 px-3 block after:absolute after:left-3 after:right-3 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all hover:after:w-[calc(100%-1.5rem)]"
                onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }}
              >
                {link.name}
              </a>
            </Magnetic>
          ))}
          <div className="h-6 w-px bg-white/10 mx-1" />
          <div className="flex items-center gap-4">
            <Magnetic>
              <a
                href="https://github.com/shubha9696"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full inline-block"
              >
                <Github className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/shubham-chakrawarti-27764836a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full inline-block"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="mailto:shubham2004.hc@gmail.com"
                className="text-muted-foreground hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full inline-block"
              >
                <Mail className="h-4 w-4" />
              </a>
            </Magnetic>
          </div>
          <Magnetic>
            <Button variant="outline" size="sm" className="ml-4 border-primary/50 hover:bg-primary/10 hover:text-primary rounded-full px-6 transition-all duration-300" asChild>
              <a href="mailto:shubham2004.hc@gmail.com">Hire Me</a>
            </Button>
          </Magnetic>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-4 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground hover:text-primary py-2"
                onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
