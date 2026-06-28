import Background from "@/components/Background";
import Header from "@/components/Header";
import HeroWithAI from "@/components/HeroWithAI";
import OCRDemo from "@/components/OCRDemo";
import WhyItMatters from "@/components/WhyItMatters";
import Features from "@/components/Features";
import Workflow from "@/components/Workflow";
// import BuiltFor from "@/components/BuiltFor";
import Privacy from "@/components/Privacy";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import PWAPromote from "@/components/PWAPromote";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* WebGL and CSS backdrop blobs */}
      <Background />

      {/* Fixed top navigation */}
      <Header />

      {/* Core sections */}
      <main className="relative z-10 w-full">
        <HeroWithAI />
        <Testimonials />
        <OCRDemo />
        <WhyItMatters />
        <Features />
        <Workflow />
        {/* <BuiltFor /> */}
        <Privacy />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <PWAPromote />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

