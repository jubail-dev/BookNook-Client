import type { Metadata } from "next";
import HeroSection from "@/components/shared/HeroSection";
import HowItWorks from "@/components/shared/HowItWorks";
import NewArrivals from "@/components/shared/NewArrivals";
import ReadingCommunity from "@/components/shared/ReadingCommunity";

export const metadata: Metadata = {
  // absolute: keeps the existing "BookNook | Home" wording (the root
  // template would otherwise render it as "Home | BookNook").
  title: { absolute: "BookNook | Home" },
};

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
