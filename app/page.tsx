import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { VibeSection } from "@/components/sections/VibeSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <PhilosophySection />
      <MenuSection />
      <VibeSection />
      <LocationsSection />
      <ReviewsSection />
      <Footer />
    </main>
  );
}
