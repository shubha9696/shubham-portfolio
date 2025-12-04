import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-background">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-6">
          <a 
            href="https://github.com/shubha9696" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/shubham-chakrawarti-27764836a/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Shubham Chakrawarti. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2">
          Built with React, Tailwind, and Motion.
        </p>
      </div>
    </footer>
  );
}