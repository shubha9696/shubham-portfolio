import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, MapPin, Award } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

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
            <div className="space-y-12 border-l-2 border-white/10 ml-4 pl-8 relative">
              
              {/* Item 1 */}
              <div className="relative group">
                <span className="absolute -left-[45px] top-1 h-3 w-3 rounded-full bg-primary group-hover:scale-150 transition-transform duration-300" />
                <div className="absolute -left-[49px] top-0 h-5 w-5 rounded-full border border-primary/50 animate-ping opacity-20" />
                
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">B.Tech in CSE - Artificial Intelligence</h3>
                <p className="text-primary font-medium">Parul University</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded"><Calendar className="h-3 w-3" /> 2022 - 2026</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">Pursuing</span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Specializing in Artificial Intelligence, Machine Learning, and Deep Neural Networks. 
                  Active participant in hackathons and technical research.
                </p>
              </div>

              {/* Item 2 */}
              <div className="relative group">
                <span className="absolute -left-[45px] top-1 h-3 w-3 rounded-full bg-muted-foreground group-hover:scale-150 transition-transform duration-300" />
                <h3 className="text-xl font-bold group-hover:text-foreground/80 transition-colors">Higher Secondary (12th)</h3>
                <p className="text-muted-foreground font-medium">Tarapur Vidya Mandir</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded"><Calendar className="h-3 w-3" /> 2022</span>
                  <span className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded border border-white/10">Completed</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative group">
                <span className="absolute -left-[45px] top-1 h-3 w-3 rounded-full bg-muted-foreground group-hover:scale-150 transition-transform duration-300" />
                <h3 className="text-xl font-bold group-hover:text-foreground/80 transition-colors">Secondary (10th)</h3>
                <p className="text-muted-foreground font-medium">TVM</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded"><Calendar className="h-3 w-3" /> 2020</span>
                  <span className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded border border-white/10">Completed</span>
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
                <div className="relative group">
                  <span className="absolute -left-[45px] top-1 h-3 w-3 rounded-full bg-secondary group-hover:scale-150 transition-transform duration-300" />
                  <div className="absolute -left-[49px] top-0 h-5 w-5 rounded-full border border-secondary/50 animate-ping opacity-20" />
                  
                  <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">AI ML Internship Trainee</h3>
                  <p className="text-secondary font-medium">YBI Foundation</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2 mb-3">
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded"><Calendar className="h-3 w-3" /> Oct 2024 - Feb 2025</span>
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded"><MapPin className="h-3 w-3" /> Remote</span>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg border border-white/5">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Conducted academic research in Artificial Intelligence and Machine Learning algorithms. 
                      Worked on real-world datasets to build predictive models and enhanced data visualization techniques.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Award className="text-primary h-8 w-8" /> Certifications
              </h2>
              <div className="grid gap-4">
                <div className="p-4 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group cursor-default">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Google Data Analytics</h3>
                    <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">Professional</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Google Career Certificates</p>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-full" />
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-card border border-white/5 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 group cursor-default">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-secondary transition-colors">Generative AI</h3>
                    <span className="text-xs font-mono bg-secondary/20 text-secondary px-2 py-1 rounded">Specialization</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Google Cloud Skills Boost</p>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-full" />
                  </div>
                </div>

                {/* Microsoft - Machine Learning Certificate */}
                <div className="p-4 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group cursor-default">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Microsoft Machine Learning</h3>
                    <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">Certificate</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Microsoft Certifications</p>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-full" />
                  </div>
                </div>

                {/* Microsoft - AI Fundamentals Certificate */}
                <div className="p-4 rounded-xl bg-card border border-white/5 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 group cursor-default">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-secondary transition-colors">Microsoft AI Fundamentals</h3>
                    <span className="text-xs font-mono bg-secondary/20 text-secondary px-2 py-1 rounded">Certificate</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Microsoft Certifications</p>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-full" />
                  </div>
                </div>

                {/* HackerRank - Python Certificate */}
                <div className="p-4 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group cursor-default">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">HackerRank Python</h3>
                    <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">Certificate</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">HackerRank</p>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-full" />
                  </div>
                </div>

                {/* HackerRank - Java Certificate */}
                <div className="p-4 rounded-xl bg-card border border-white/5 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 group cursor-default">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-secondary transition-colors">HackerRank Java</h3>
                    <span className="text-xs font-mono bg-secondary/20 text-secondary px-2 py-1 rounded">Certificate</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">HackerRank</p>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-full" />
                  </div>
                </div>

                {/* IBM - Data Analyst Certificate */}
                <div className="p-4 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group cursor-default">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">IBM Data Analyst</h3>
                    <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">Certificate</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">IBM Skills Network</p>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-full" />
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}