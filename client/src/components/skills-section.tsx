import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScrambleText from "./scramble-text";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript / TypeScript", level: 85 },
        { name: "Java", level: 75 },
        { name: "SQL", level: 80 },
        { name: "C / C++", level: 70 },
      ],
    },
    {
      title: "AI, Machine Learning & Vision",
      skills: [
        { name: "TensorFlow / Keras", level: 85 },
        { name: "PyTorch", level: 75 },
        { name: "OpenCV / MediaPipe", level: 80 },
        { name: "Scikit-Learn", level: 85 },
        { name: "NLP Engines", level: 80 },
      ],
    },
    {
      title: "Frontend & Full Stack Frameworks",
      skills: [
        { name: "React.js / Next.js", level: 90 },
        { name: "Node.js / Express.js", level: 85 },
        { name: "WebSockets / RESTful APIs", level: 85 },
        { name: "Redux State Engine", level: 80 },
        { name: "Tailwind CSS / HTML5 / CSS3", level: 90 },
      ],
    },
    {
      title: "Cloud, DevOps & Databases",
      skills: [
        { name: "AWS Cloud Infrastructure", level: 75 },
        { name: "Docker Containerization", level: 80 },
        { name: "Git / CI/CD Pipelines", level: 85 },
        { name: "PostgreSQL / MongoDB / Prisma", level: 80 },
        { name: "Azure Services", level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-gradient"><ScrambleText text="Capabilities" /></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A breakdown of my technical stack across languages, deep learning pipelines,
            web frameworks, and deployment orchestration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.08 }}
              className="relative p-[1px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/30 hover:border-primary/40 transition-colors duration-300"
            >
              <Card className="glass-card border-none bg-slate-950/85 h-full flex flex-col p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl font-bold text-white font-heading">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow flex flex-col gap-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-foreground/90">{skill.name}</span>
                        <span className="font-mono text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
