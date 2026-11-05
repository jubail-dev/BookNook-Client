"use client";

import dynamic from "next/dynamic";

const HeroSlider = dynamic(() => import("./HeroSlider"), {
  ssr: false,
  loading: () => (
    <section className="min-h-[650px] w-full animate-pulse bg-zinc-950 sm:min-h-[700px] lg:min-h-[760px]" />
  ),
});

export default function HeroSection() {
  return <HeroSlider />;
}