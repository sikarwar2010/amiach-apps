import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedInventory } from "@/components/home/FeaturedInventory";
import { LocationDiscovery } from "@/components/home/LocationDiscovery";
import { SellerSpotlight } from "@/components/home/SellerSpotlight";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustSection } from "@/components/home/TrustSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { SellerCTA } from "@/components/home/SellerCTA";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <CategoryGrid />
      <FeaturedInventory />
      <LocationDiscovery />
      <SellerSpotlight />
      <HowItWorks />
      <TrustSection />
      <PromoBanner />
      <SellerCTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
