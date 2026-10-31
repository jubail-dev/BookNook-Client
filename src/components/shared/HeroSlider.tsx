
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    badge: "Welcome to BookNook",
    title: "Discover Your",
    highlight: "Next Great Book",
    description:
      "Explore a world of knowledge, imagination, and inspiration. Find your next favorite book with BookNook.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000",
    books: ["Dream Big", "Read More", "Grow Stronger"],
  },
  {
    id: 2,
    badge: "Explore Endless Stories",
    title: "Explore The World",
    highlight: "Through Books",
    description:
      "Travel through different worlds, experience amazing stories, and discover new perspectives with every page.",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=2000",
    books: ["New Adventures", "Amazing Stories", "Endless Dreams"],
  },
  {
    id: 3,
    badge: "Your Reading Journey",
    title: "Knowledge Starts",
    highlight: "With Reading",
    description:
      "Make reading a part of your everyday life. Learn something new and build a better future with BookNook.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2000",
    books: ["Learn Every Day", "Think Bigger", "Build Your Future"],
  },
];

export default function HeroSlider() {
  const [swiperInstance, setSwiperInstance] =
    useState<SwiperClass | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 text-white">
      {/* Main Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={true}
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) =>
          setActiveIndex(swiper.realIndex)
        }
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex min-h-[650px] items-center overflow-hidden px-5 py-20 sm:min-h-[700px] sm:px-10 lg:min-h-[760px] lg:px-16">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt="BookNook library background"
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                  unoptimized
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/30" />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
              </div>

              {/* Amber Glow */}
              <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-500/20 blur-[120px]" />

              {/* Content Container */}
              <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
                {/* Left Content */}
                <div className="flex flex-col items-start space-y-6 lg:col-span-7">
                  {/* Welcome Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-zinc-950/70 px-4 py-2 text-sm font-semibold text-amber-400 backdrop-blur-md">
                    <BookOpen size={17} />
                    {slide.badge}
                  </div>

                  {/* Heading */}
                  <h1 className="text-4xl font-black leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
                    {slide.title}
                    <br />
                    <span className="text-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.3)]">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                    {slide.description}
                  </p>

                  {/* Browse Books Button */}
                  <Link
                    href="/books"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-amber-400 px-8 text-base font-bold text-zinc-950 shadow-xl shadow-amber-500/20 transition-all duration-300 hover:scale-105 hover:bg-amber-300 active:scale-95"
                  >
                    Browse Books
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  {/* Slide Number */}
                  <div className="pt-5 text-sm font-medium text-zinc-400">
                    <span className="text-amber-400">
                      0{activeIndex + 1}
                    </span>
                    <span className="mx-2">/</span>
                    0{slides.length}
                  </div>
                </div>

                {/* Right Visual */}
                <div className="relative hidden items-center justify-center lg:col-span-5 lg:flex">
                  <div className="relative w-full max-w-md space-y-4 rounded-3xl border border-white/10 bg-zinc-950/40 p-7 shadow-2xl backdrop-blur-xl">
                    <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-amber-400/20 blur-3xl" />

                    {slide.books.map((book, bookIndex) => (
                      <div
                        key={book}
                        className={`flex h-20 items-center justify-between rounded-xl border border-amber-500/30 px-6 shadow-xl transition-all duration-500 ${
                          bookIndex === 0
                            ? "bg-gradient-to-r from-blue-950 to-indigo-950"
                            : bookIndex === 1
                              ? "bg-gradient-to-r from-amber-950 to-yellow-950"
                              : "bg-gradient-to-r from-zinc-900 to-black"
                        }`}
                      >
                        <span className="font-serif text-lg font-semibold italic tracking-wide text-amber-300">
                          {book}
                        </span>

                        <BookOpen
                          size={23}
                          className="text-amber-400"
                        />
                      </div>
                    ))}

                    <div className="flex items-center justify-center gap-2 pt-3 text-sm font-medium text-zinc-400">
                      <BookOpen
                        size={16}
                        className="text-amber-400"
                      />
                      Your Personal Reading Space
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Slide */}
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous slide"
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute left-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 rounded-full border-white/20 bg-black/50 text-white backdrop-blur-md hover:border-amber-400 hover:bg-amber-400 hover:text-black sm:left-6 sm:h-14 sm:w-14"
      >
        <ChevronLeft size={26} />
      </Button>

      {/* Next Slide */}
      <Button
        variant="outline"
        size="icon"
        aria-label="Next slide"
        onClick={() => swiperInstance?.slideNext()}
        className="absolute right-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 rounded-full border-white/20 bg-black/50 text-white backdrop-blur-md hover:border-amber-400 hover:bg-amber-400 hover:text-black sm:right-6 sm:h-14 sm:w-14"
      >
        <ChevronRight size={26} />
      </Button>

      {/* Slider Pagination */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => swiperInstance?.slideToLoop(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              activeIndex === index
                ? "w-9 bg-amber-400 shadow-[0_0_12px_#f59e0b]"
                : "w-2.5 bg-zinc-500 hover:bg-amber-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
