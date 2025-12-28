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
      title: "Data Science Portfolio",
      description:
        "Collection of notebooks and ETL pipelines demonstrating EDA, feature engineering, and predictive modeling.",
      tags: ["Python", "Pandas", "NumPy", "EDA"],
      link: "https://github.com/shubha9696",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
    },
    {
      title: "Sales Analytics Dashboard",
      description:
        "Interactive KPI dashboard with drill-down analytics backed by Node-based data aggregation APIs.",
      tags: ["React", "Express", "Chart.js", "Analytics"],
      link: "https://github.com/shubha9696",
      icon: <LineChart className="h-10 w-10 text-secondary" />,
    },
    {
      title: "Sentiment Analysis API",
      description:
        "Production-ready REST API for real-time sentiment analysis across product reviews and social feeds.",
      tags: ["Python", "Flask", "NLP", "Docker"],
      link: "https://github.com/shubha9696",
      icon: <Brain className="h-10 w-10 text-primary" />,
    },
    {
      title: "Google Maps Clone",
      description:
        "Modern maps experience with pan and zoom, geocoding search, interactive markers, and route exploration.",
      tags: ["React", "Leaflet", "Mapbox", "Geolocation"],
      link: "https://github.com/shubha9696",
      icon: <MapPin className="h-10 w-10 text-secondary" />,
    },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
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
            >
              <Card className="glass-card h-full flex flex-col hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.75)]">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-background/60 border border-white/10 group-hover:bg-primary/10 transition-colors">
                      {project.icon}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-white"
                      >
                        <Github className="h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {project.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md bg-white/5 text-muted-foreground border border-white/5"
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
                  <Button
                    variant="link"
                    className="px-0 text-primary hover:text-primary/80"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
