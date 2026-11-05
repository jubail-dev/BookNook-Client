"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    eyebrow: "THE ART OF READING",
    badge: "Welcome to BookNook",
    title: "Stories That",
    highlight: "Stay With You.",
    description:
      "Every book opens a new door. Discover extraordinary stories, explore fresh perspectives, and find the next chapter of your journey.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000",
    number: "01",
    category: "DISCOVER",
    featured: "A WORLD OF STORIES",
  },
  {
    id: 2,
    eyebrow: "EXPLORE WITHOUT LIMITS",
    badge: "Endless Possibilities",
    title: "Travel Beyond",
    highlight: "Every Page.",
    description:
      "From timeless classics to modern masterpieces, explore a universe of ideas and adventures waiting to be discovered.",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=2000",
    number: "02",
    category: "EXPLORE",
    featured: "YOUR NEXT ADVENTURE",
  },
  {
    id: 3,
    eyebrow: "GROW THROUGH READING",
    badge: "Your Reading Journey",
    title: "A Better You",
    highlight: "Begins Here.",
    description:
      "Make every page count. Build meaningful reading habits, expand your knowledge, and let great ideas shape your future.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2000",
    number: "03",
    category: "GROW",
    featured: "KNOWLEDGE FOR LIFE",
  },
];

export default function HeroSlider() {
  const [swiperInstance, setSwiperInstance] =
    useState<SwiperClass | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#090909] text-white">

      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        speed={1100}
        autoplay={{
          delay: 5500,
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
            <div className="relative flex min-h-[650px] items-center overflow-hidden sm:min-h-[700px] lg:min-h-[790px]">

              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt="Beautiful BookNook library atmosphere"
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  unoptimized
                  className="scale-105 object-cover"
                />

                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-[#090909]/65" />

                <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/90 to-[#090909]/35" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/45" />
              </div>

              {/* Decorative Glows */}
              <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-amber-500/10 blur-[130px]" />

              <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-amber-600/10 blur-[140px]" />

              {/* Main Container */}
              <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-14 px-6 pb-28 pt-28 sm:px-12 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:pb-32 lg:pt-32">

                {/* Left Content */}
                <div
                  key={slide.id}
                  className="animate-in fade-in slide-in-from-bottom-5 duration-700 lg:col-span-7"
                >

                  {/* Eyebrow */}
                  <div className="mb-8 flex items-center gap-3">
                    <span className="h-px w-10 bg-amber-400" />

                    <span className="text-[10px] font-bold tracking-[0.35em] text-amber-400 sm:text-xs">
                      {slide.eyebrow}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-amber-400/20 bg-white/[0.06] px-4 py-2 backdrop-blur-xl">
                    <Sparkles
                      size={14}
                      className="text-amber-400"
                    />

                    <span className="text-xs font-medium tracking-wide text-zinc-200">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="max-w-4xl text-[46px] font-black leading-[1.06] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[82px] xl:text-[94px]">
                    {slide.title}

                    <br />

                    <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mt-8 max-w-xl text-sm leading-8 text-zinc-300 sm:text-base sm:leading-9 lg:text-lg">
                    {slide.description}
                  </p>

                  {/* Actions */}
                  <div className="mt-10 flex flex-wrap items-center gap-5">

                    <Link
                      href="/books"
                      className="group inline-flex h-14 items-center gap-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-8 text-sm font-extrabold text-zinc-950 shadow-[0_10px_40px_rgba(245,158,11,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(245,158,11,0.3)]"
                    >
                      Explore Books

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight size={17} />
                      </span>
                    </Link>

                    <Link
                      href="/books"
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-amber-400"
                    >
                      Discover More

                      <ArrowDownRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                      />
                    </Link>
                  </div>

                  {/* Bottom Stats */}
                  <div className="mt-14 flex items-center gap-8 border-t border-white/10 pt-7 sm:gap-12">

                    <div>
                      <p className="text-2xl font-black text-white sm:text-3xl">
                        01<span className="text-amber-400">.</span>
                      </p>

                      <p className="mt-1 text-[9px] font-bold tracking-[0.2em] text-zinc-500">
                        DISCOVER
                      </p>
                    </div>

                    <div className="h-10 w-px bg-white/10" />

                    <div>
                      <p className="text-2xl font-black text-white sm:text-3xl">
                        02<span className="text-amber-400">.</span>
                      </p>

                      <p className="mt-1 text-[9px] font-bold tracking-[0.2em] text-zinc-500">
                        BORROW
                      </p>
                    </div>

                    <div className="h-10 w-px bg-white/10" />

                    <div>
                      <p className="text-2xl font-black text-white sm:text-3xl">
                        03<span className="text-amber-400">.</span>
                      </p>

                      <p className="mt-1 text-[9px] font-bold tracking-[0.2em] text-zinc-500">
                        ENJOY
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Visual */}
                <div
                  key={`visual-${slide.id}`}
                  className="relative hidden h-[440px] items-center justify-center animate-in fade-in zoom-in-95 duration-1000 lg:col-span-5 lg:flex"
                >

                  {/* Decorative Circle */}
                  <div className="absolute h-[390px] w-[390px] rounded-full border border-amber-400/10" />

                  <div className="absolute h-[330px] w-[330px] rounded-full border border-dashed border-amber-400/20" />

                  <div className="absolute h-[270px] w-[270px] rounded-full bg-amber-400/[0.06] blur-2xl" />

                  {/* Main Image Frame */}
                  <div className="relative h-[350px] w-[275px] rotate-[-5deg] overflow-hidden rounded-[24px] border border-white/20 bg-zinc-900 p-2 shadow-[0_35px_100px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:rotate-0">

                    <div className="relative h-full w-full overflow-hidden rounded-[18px]">
                      <Image
                        src={slide.image}
                        alt="BookNook reading experience"
                        fill
                        sizes="275px"
                        unoptimized
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-6">

                        <div className="mb-3 flex items-center gap-2">
                          <BookOpen
                            size={15}
                            className="text-amber-400"
                          />

                          <span className="text-[9px] font-bold tracking-[0.3em] text-amber-300">
                            BOOKNOOK COLLECTION
                          </span>
                        </div>

                        <h3 className="font-serif text-3xl font-bold leading-tight text-white">
                          {slide.featured}
                        </h3>

                        <div className="mt-4 h-px w-12 bg-amber-400" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Glass Card */}
                  <div className="absolute -right-2 top-10 flex items-center gap-3 rounded-2xl border border-white/15 bg-zinc-950/65 p-4 shadow-2xl backdrop-blur-xl xl:-right-5">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10">
                      <BookOpen
                        size={22}
                        className="text-amber-400"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white">
                        Your Library
                      </p>

                      <p className="mt-1 text-[10px] text-zinc-400">
                        A world to explore
                      </p>
                    </div>
                  </div>

                  {/* Floating Bottom Card */}
                  <div className="absolute -bottom-1 -left-3 rounded-2xl border border-amber-400/20 bg-[#15120c]/90 px-5 py-4 shadow-2xl backdrop-blur-xl xl:-left-8">

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-zinc-950">
                        <Sparkles size={18} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold tracking-wider text-amber-400">
                          READING INSPIRES
                        </p>

                        <p className="mt-1 text-xs font-semibold text-white">
                          Endless Possibilities
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Slide Number */}
                  <div className="absolute -bottom-12 right-5 font-serif text-7xl font-black text-white/[0.07]">
                    {slide.number}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-0 right-0 z-20 mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 sm:px-12 lg:bottom-9 lg:px-16">

        {/* Progress */}
        <div className="flex items-center gap-4">

          <span className="text-sm font-black text-amber-400">
            0{activeIndex + 1}
          </span>

          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => swiperInstance?.slideToLoop(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? "w-12 bg-amber-400"
                    : "w-5 bg-white/30 hover:bg-amber-400/60"
                }`}
              />
            ))}
          </div>

          <span className="text-sm font-medium text-zinc-500">
            0{slides.length}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-black sm:h-12 sm:w-12"
          >
            <ChevronLeft size={21} />
          </button>

          <button
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-black sm:h-12 sm:w-12"
          >
            <ChevronRight size={21} />
          </button>
        </div>
      </div>

      {/* Vertical Side Label */}
      <div className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 rotate-90 xl:block">
        <span className="text-[9px] font-bold tracking-[0.5em] text-white/30">
          YOUR PERSONAL READING SPACE
        </span>
      </div>
    </section>
  );
}