import { HeroSection } from "@/components/home/HeroSection";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import { QuickActions } from "@/components/home/QuickActions";
import { StatsSection } from "@/components/home/StatsSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { DealsAroundYou } from "@/components/home/DealsAroundYou";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { LocationDiscovery } from "@/components/home/LocationDiscovery";
import { BulkProcurementSection } from "@/components/home/BulkProcurementSection";
import { SellSurplusCTA } from "@/components/home/SellSurplusCTA";
import { TrustedSuppliers } from "@/components/home/TrustedSuppliers";
import { WhyMaalGodaam } from "@/components/home/WhyMaalGodaam";
import { SustainabilitySection } from "@/components/home/SustainabilitySection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PromoBanner } from "@/components/home/PromoBanner";
import { FaqSection } from "@/components/home/FaqSection";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HomeSearchBar />
      <QuickActions />
      <StatsSection />
      <CategoryGrid />
      <DealsAroundYou />
      <FeaturedDeals />
      <LocationDiscovery />
      <BulkProcurementSection />
      <SellSurplusCTA />
      <TrustedSuppliers />
      <WhyMaalGodaam />
      <SustainabilitySection />
      <HowItWorks />
      <PromoBanner />
      <FaqSection />
      <Newsletter />
      <Footer />
    </main>
  );
}
