import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Layers,
  MessageSquare,
  Stethoscope,
  Utensils,
  BarChart3,
  LineChart,
  Brain,
  MapPin,
} from "lucide-react";
import ScrambleText from "./scramble-text";
import Magnetic from "./magnetic";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Hiring Assistant Chatbot",
      description:
        "Intelligent chatbot for candidate screening that adapts questions to a candidate's tech stack and responses.",
      tags: ["AI/ML", "NLP", "Python", "Chatbot"],
      link: "https://github.com/shubha9696/hiring-assistant-chatbot",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
    {
      title: "Sonoma AI Multimodal",
      description:
        "Full-stack multimodal AI platform with audio and video captioning pipelines built on React and Express.",
      tags: ["React", "Node.js", "Express", "MongoDB", "AI"],
      link: "https://github.com/shubha9696/sonoma-ai-multimodal",
      icon: <Layers className="h-10 w-10 text-secondary" />,
    },
    {
      title: "AI Medical Diagnosis",
      description:
        "Clinical decision support tool using machine learning to assist healthcare professionals with diagnosis.",
      tags: ["Python", "Machine Learning", "Healthcare AI"],
      link: "https://github.com/shubha9696/ai-medical-diagnosis-system",
      icon: <Stethoscope className="h-10 w-10 text-primary" />,
    },
    {
      title: "AI Recipe Finder",
      description:
        "Ingredient-aware recipe discovery engine that suggests dishes using NLP and intelligent matching logic.",
      tags: ["NLP", "Node.js", "Machine Learning", "Web App"],
      link: "https://github.com/shubha9696/AIRecipe-finder",
      icon: <Utensils className="h-10 w-10 text-secondary" />,
    },
    {
      title: "Single Camera Speed & Distance",
      description:
        "Real-time object distance measurement and velocity tracking engine using OpenCV and MediaPipe visual vectors.",
      tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
      link: "https://github.com/shubha9696/Distance_Measurement_Single_Camera",
      icon: <Brain className="h-10 w-10 text-primary" />,
    },
    {
      title: "SmartSession Monitor",
      description:
        "AI Student engagement monitoring tool that analyzes webcam video feeds to detect expressions and flag confusion metrics live.",
      tags: ["JavaScript", "React", "TensorFlow.js", "Computer Vision"],
      link: "https://github.com/shubha9696/smartsession",
      icon: <LineChart className="h-10 w-10 text-secondary" />,
    },
    {
      title: "LandBuilder Platform",
      description:
        "Interactive geographical buildable land analysis application that estimates topography slopes and maps coordinate boundaries.",
      tags: ["TypeScript", "React", "Mapbox", "Geolocation"],
      link: "https://github.com/shubha9696/landbuilder",
      icon: <MapPin className="h-10 w-10 text-primary" />,
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient"><ScrambleText text="Deployments" /></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated mix of AI, data, and full stack work that reflects how I
            design and ship real-world systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              onMouseMove={handleMouseMove}
              className="relative rounded-2xl group overflow-hidden border border-white/10 bg-slate-900/40 p-[1px] hover:border-primary/40 transition-all duration-300"
              style={{
                background: "radial-gradient(250px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(168, 85, 247, 0.15), transparent 80%)"
              }}
            >
              <Card className="glass-card h-full border-none bg-slate-950/80 flex flex-col hover:bg-slate-950/50 transition-colors duration-300 group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-background/60 border border-white/10 group-hover:bg-primary/10 transition-colors">
                      {project.icon}
                    </div>
                    <Magnetic>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-white/5 rounded-full inline-block"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-white"
                        >
                          <Github className="h-5 w-5" />
                        </Button>
                      </a>
                    </Magnetic>
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {project.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5"
                      >
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
                  <Magnetic>
                    <Button
                      variant="link"
                      className="px-0 text-primary hover:text-primary/80 flex items-center gap-1 font-semibold"
                      asChild
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </Magnetic>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
