import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ExcelImportSection } from "@/components/ExcelImportSection";
import { WhoSection } from "@/components/WhoSection";
import { StepsSection } from "@/components/StepsSection";
import { SafetySection } from "@/components/SafetySection";
import { FAQSection } from "@/components/FAQSection";
import { PriceSection } from "@/components/PriceSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      <Header />
      <main className="relative">
        <HeroSection />
        <FeaturesSection />
        <ExcelImportSection />
        <WhoSection />
        <StepsSection />
        <SafetySection />
        <FAQSection />
        <PriceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
