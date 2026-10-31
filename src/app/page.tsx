import HeroSection from "@/components/shared/HeroSection";
import HowItWorks from "@/components/shared/HowItWorks";
import NewArrivals from "@/components/shared/NewArrivals";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <NewArrivals></NewArrivals>
      <HowItWorks></HowItWorks>
    </div>
  );
}
