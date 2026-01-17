import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceSection from "@/components/experience-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Background3D from "@/components/3d/Background3D";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans selection:bg-primary/30 page-shell">
      <div className="noise-bg fixed inset-0 z-50 pointer-events-none" />
      <Background3D />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
