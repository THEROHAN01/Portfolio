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

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SystemsSection />
        <ExploringSection />
        <TerminalSection />
        <GitHubActivity />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
