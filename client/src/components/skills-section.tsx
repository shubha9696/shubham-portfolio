import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages & Core",
      skills: [
        { name: "Python", level: 95, color: "bg-blue-500" },
        { name: "JavaScript / TypeScript", level: 90, color: "bg-yellow-400" },
        { name: "SQL", level: 85, color: "bg-orange-500" },
        { name: "R Programming", level: 70, color: "bg-blue-400" }
      ]
    },
    {
      title: "AI & Machine Learning",
      skills: [
        { name: "TensorFlow / Keras", level: 92, color: "bg-orange-600" },
        { name: "Scikit-Learn", level: 90, color: "bg-orange-400" },
        { name: "Computer Vision (OpenCV)", level: 85, color: "bg-green-500" },
        { name: "NLP (NLTK, SpaCy)", level: 88, color: "bg-indigo-500" },
        { name: "Generative AI", level: 80, color: "bg-purple-500" }
      ]
    },
    {
      title: "Full Stack Web",
      skills: [
        { name: "React.js", level: 90, color: "bg-cyan-400" },
        { name: "Node.js / Express", level: 88, color: "bg-green-600" },
        { name: "MongoDB", level: 85, color: "bg-green-500" },
        { name: "Tailwind CSS", level: 95, color: "bg-cyan-300" },
        { name: "Flask", level: 80, color: "bg-gray-400" }
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git / GitHub", level: 90, color: "bg-red-500" },
        { name: "Docker", level: 75, color: "bg-blue-600" },
        { name: "Figma", level: 85, color: "bg-purple-400" },
        { name: "Tableau", level: 80, color: "bg-blue-300" },
        { name: "AutoCAD", level: 70, color: "bg-red-600" }
      ]
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical <span className="text-secondary">Proficiency</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deep dive into my technical stack and proficiency levels across various domains.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-primary mb-6 border-b border-white/10 pb-2 inline-block">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-foreground/90">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}