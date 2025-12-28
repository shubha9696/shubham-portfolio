import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Palette, Shield, BarChart3, Database } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI & Machine Learning",
      description: "Building intelligent models using Python, TensorFlow, and NLP to solve complex problems."
    },
    {
      icon: <Code className="h-8 w-8 text-secondary" />,
      title: "Full Stack Dev",
      description: "Crafting scalable web applications with React, Node.js, Express, and MongoDB."
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "UI/UX Design",
      description: "Designing intuitive and modern user interfaces using Figma and creative principles."
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Cybersecurity",
      description: "Enthusiast in securing web experiences and ethical hacking practices."
    },
    // Newly added features
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Data Science",
      description: "From EDA to modeling—turning raw data into insights using Pandas, NumPy, and visualization libraries."
    },
    {
      icon: <Database className="h-8 w-8 text-secondary" />,
      title: "Data Analyst",
      description: "Building dashboards, KPI tracking, and storytelling with data to drive decisions."
    }
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              I am an AI/ML engineer, Data Analyst, and Multidisciplinary Full Stack Web Developer with a strong command over front-end and back-end technologies.
              Currently pursuing my B.Tech in CSE (Artificial Intelligence) at Parul University.
            </p>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              My passion lies in building scalable, secure, and user-friendly digital products. I combine technical expertise in algorithms 
              with a keen eye for design to create comprehensive solutions. Whether it's training a neural network or designing a 
              pixel-perfect landing page, I enjoy the entire process of creation. I'm a runner-up in multiple hackathons, always pushing boundaries through rapid prototyping and collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card hover:bg-white/5 transition-colors border-white/5">
                  <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}