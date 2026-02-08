import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RegionCards from "@/components/RegionCards";
import ExpertProfiles from "@/components/ExpertProfiles";
import PricingSection from "@/components/PricingSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <RegionCards />
        <ExpertProfiles />
        <PricingSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
