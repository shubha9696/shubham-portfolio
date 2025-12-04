import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Layers, MessageSquare, Stethoscope, Utensils } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Hiring Assistant Chatbot",
      description: "An intelligent chatbot for 'TalentScout' that screens candidates by asking relevant technical questions based on their declared tech stack.",
      tags: ["AI/ML", "NLP", "Python", "Chatbot"],
      link: "https://github.com/shubha9696/hiring-assistant-chatbot",
      icon: <MessageSquare className="h-10 w-10 text-primary" />
    },
    {
      title: "Sonoma AI Multimodal",
      description: "A multimodal AI platform combining React and Express. Features audio and video captioning capabilities in a full-stack environment.",
      tags: ["React", "Node.js", "Express", "MongoDB", "AI"],
      link: "https://github.com/shubha9696/sonoma-ai-multimodal",
      icon: <Layers className="h-10 w-10 text-secondary" />
    },
    {
      title: "AI Medical Diagnosis",
      description: "Python-based application assisting in medical diagnosis using AI algorithms to provide accurate tools for healthcare professionals.",
      tags: ["Python", "Machine Learning", "Healthcare AI"],
      link: "https://github.com/shubha9696/ai-medical-diagnosis-system",
      icon: <Stethoscope className="h-10 w-10 text-primary" />
    },
    {
      title: "AI Recipe Finder",
      description: "Intuitive web app helping users discover recipes based on available ingredients. Blends AI logic with user-friendly design.",
      tags: ["NLP", "Node.js", "Machine Learning", "Web App"],
      link: "https://github.com/shubha9696/AIRecipe-finder",
      icon: <Utensils className="h-10 w-10 text-secondary" />
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Showcasing my work in Artificial Intelligence, Web Development, and System Design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card h-full flex flex-col hover:border-primary/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-background/50 border border-white/10 group-hover:bg-primary/10 transition-colors">
                      {project.icon}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                        <Github className="h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                  <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-muted-foreground border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-primary hover:text-primary/80" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}