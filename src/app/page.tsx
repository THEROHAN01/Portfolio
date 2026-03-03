import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SystemsSection } from "@/components/sections/SystemsSection";
import { ExploringSection } from "@/components/sections/ExploringSection";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="section-line" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <SystemsSection />
        <ExploringSection />
        <SectionDivider />
        <TerminalSection />
        <SectionDivider />
        <GitHubActivity />
        <SectionDivider />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
