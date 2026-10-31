import HeroSection from "@/components/shared/HeroSection";
import HowItWorks from "@/components/shared/HowItWorks";
import NewArrivals from "@/components/shared/NewArrivals";
import ReadingCommunity from "@/components/shared/ReadingCommunity";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <NewArrivals></NewArrivals>
      <HowItWorks></HowItWorks>
      <ReadingCommunity></ReadingCommunity>
    </div>
  );
}
