import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, MapPin, Award } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-primary h-8 w-8" /> Education
            </h2>
            <div className="space-y-8 border-l-2 border-white/10 ml-4 pl-8 relative">
              
              {/* Item 1 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-0 h-5 w-5 rounded-full bg-primary border-4 border-background" />
                <h3 className="text-xl font-bold">B.Tech in CSE - Artificial Intelligence</h3>
                <p className="text-primary font-medium">Parul University</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 2022 - 2026</span>
                  <span>CGPA: 7.40 / 10</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-0 h-5 w-5 rounded-full bg-secondary border-4 border-background" />
                <h3 className="text-xl font-bold">Higher Secondary (12th)</h3>
                <p className="text-secondary font-medium">Tarapur Vidya Mandir</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 2022</span>
                  <span>64%</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-0 h-5 w-5 rounded-full bg-muted-foreground border-4 border-background" />
                <h3 className="text-xl font-bold">Secondary (10th)</h3>
                <p className="text-muted-foreground font-medium">TVM</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 2020</span>
                  <span>87.40%</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Experience & Certs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Briefcase className="text-secondary h-8 w-8" /> Experience
              </h2>
              <div className="space-y-8 border-l-2 border-white/10 ml-4 pl-8 relative">
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 h-5 w-5 rounded-full bg-secondary border-4 border-background" />
                  <h3 className="text-xl font-bold">AI ML Internship Trainee</h3>
                  <p className="text-secondary font-medium">YBI Foundation</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 mb-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Oct 2024 - Feb 2025</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Remote</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Academics / Research in Artificial Intelligence and Machine Learning.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Award className="text-primary h-8 w-8" /> Certifications
              </h2>
              <div className="grid gap-4">
                <div className="p-4 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-colors">
                  <h3 className="font-bold text-lg">Google Data Analytics Professional</h3>
                  <p className="text-sm text-muted-foreground">Google • 100/100 Aggregate</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-colors">
                  <h3 className="font-bold text-lg">Introduction to Generative AI</h3>
                  <p className="text-sm text-muted-foreground">Google • 100/100 Aggregate</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}