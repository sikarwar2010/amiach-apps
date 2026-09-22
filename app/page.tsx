import { HeroSection } from "@/components/home/HeroSection";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import { StatsSection } from "@/components/home/StatsSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { LocationDiscovery } from "@/components/home/LocationDiscovery";
import { BulkProcurementSection } from "@/components/home/BulkProcurementSection";
import { SellSurplusCTA } from "@/components/home/SellSurplusCTA";
import { TrustedSuppliers } from "@/components/home/TrustedSuppliers";
import { SustainabilitySection } from "@/components/home/SustainabilitySection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyMaalGodaam } from "@/components/home/WhyMaalGodaam";
import { PromoBanner } from "@/components/home/PromoBanner";
import { FaqSection } from "@/components/home/FaqSection";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HomeSearchBar />
      <StatsSection />
      <CategoryGrid />
      <FeaturedDeals />
      <LocationDiscovery />
      <BulkProcurementSection />
      <SellSurplusCTA />
      <TrustedSuppliers />
      <SustainabilitySection />
      <HowItWorks />
      <WhyMaalGodaam />
      <PromoBanner />
      <FaqSection />
      <Newsletter />
      <Footer />
    </main>
  );
}
