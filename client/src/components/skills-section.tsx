import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Artificial Intelligence",
      skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Generative AI", "TensorFlow", "Keras"]
    },
    {
      title: "Web Development",
      skills: ["React", "Node.js", "Express", "MongoDB", "HTML/CSS", "JavaScript/TypeScript", "Flask"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Git/GitHub", "Docker", "Figma", "AutoCAD", "Tableau", "VS Code"]
    },
    {
      title: "Soft Skills",
      skills: ["Problem Solving", "Critical Thinking", "Communication", "Agile Methodology", "Presentation"]
    }
  ];

  return (
    <section id="skills" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical <span className="text-secondary">Expertise</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit comprising modern frameworks, languages, and methodologies I use to build robust solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-primary">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-background/50 hover:bg-primary/20 border-white/10 text-sm py-1 px-3 font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}