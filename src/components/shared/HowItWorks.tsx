
import React from "react";
import Link from "next/link";
import {
  Search,
  Send,
  BookOpenCheck,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Books",
    subtitle: "Find your next favorite",
    description:
      "Explore our growing library and discover amazing books across different genres, authors, and interests.",
    icon: Search,
    features: ["Explore collections", "Find interesting titles"],
  },
  {
    number: "02",
    title: "Request to Borrow",
    subtitle: "One click away from reading",
    description:
      "Found a book you love? Simply send a borrowing request and connect with the person sharing that book.",
    icon: Send,
    features: ["Easy borrowing request", "Connect with readers"],
  },
  {
    number: "03",
    title: "Read & Enjoy",
    subtitle: "Make every page count",
    description:
      "Enjoy your reading journey, manage your borrowed books, and share the joy of reading with others.",
    icon: BookOpenCheck,
    features: ["Track your borrowed books", "Share the reading joy"],
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="relative isolate overflow-hidden border-y border-amber-100 bg-[#FFF3DC] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-amber-200/50 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-orange-200/40 blur-[120px]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(#d6a34b 0.7px, transparent 0.7px)",
          backgroundSize: "25px 25px",
        }}
      />

      <div className="relative mx-auto max-w-[1240px]">

        {/* Section Header */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 shadow-sm">
              <Sparkles size={14} className="text-amber-500" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-600">
                The BookNook Experience
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-black leading-[1.12] tracking-tight text-zinc-950 sm:text-5xl lg:text-[62px]">
              Reading made
              <span className="block font-serif font-medium italic text-amber-500">
                wonderfully simple.
              </span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-lg text-sm leading-8 text-zinc-600 sm:text-base">
              Your next favorite book is closer than you think.
              Discover, borrow, and enjoy a wonderful reading
              experience with our growing community.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-[2px] w-10 rounded-full bg-amber-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                Three steps. Endless stories.
              </span>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="relative mt-16 lg:mt-20">

          {/* Connecting Line */}
          <div className="absolute left-[27px] top-12 hidden h-[calc(100%-100px)] w-px bg-gradient-to-b from-amber-400 via-amber-300 to-transparent md:block" />

          <div className="space-y-5 lg:space-y-6">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="group relative grid gap-6 rounded-[24px] border border-white bg-white p-6 shadow-[0_8px_30px_rgba(120,80,20,0.045)] transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_18px_45px_-20px_rgba(180,120,20,0.20)] sm:p-8 md:grid-cols-[58px_90px_1fr_50px] md:items-center md:gap-7 lg:p-9"
                >

                  {/* Step Number */}
                  <div className="flex items-center gap-3 md:block">
                    <span className="font-serif text-3xl font-bold text-amber-500 transition-colors duration-300 group-hover:text-amber-600">
                      {step.number}
                    </span>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 md:hidden">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="relative flex h-[66px] w-[66px] items-center justify-center rounded-[20px] border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:border-amber-400 group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-200/60">

                    <Icon size={27} strokeWidth={1.8} />

                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-[9px] font-bold text-white">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.17em] text-amber-600">
                      {step.subtitle}
                    </p>

                    <h3 className="text-xl font-extrabold tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-amber-600 sm:text-2xl">
                      {step.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
                      {step.description}
                    </p>

                    {/* Features */}
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {step.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-1.5"
                        >
                          <Check
                            size={13}
                            className="text-amber-500"
                          />

                          <span className="text-[11px] font-semibold text-zinc-500">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-amber-600 transition-all duration-300 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-zinc-950 md:flex">
                    <ArrowUpRight size={19} />
                  </div>

                </article>
              );
            })}

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative mt-12 overflow-hidden rounded-[24px] border border-amber-200 bg-gradient-to-r from-[#FFECC5] via-[#FFF5E1] to-[#FFEAC0] p-6 shadow-sm sm:p-8 lg:p-9">

          <div className="pointer-events-none absolute -right-10 -top-20 h-52 w-52 rounded-full bg-amber-300/30 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-zinc-950 shadow-lg shadow-amber-200/60">
                <BookOpenCheck size={23} />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-zinc-900 sm:text-lg">
                  Ready to discover your next story?
                </h3>

                <p className="mt-1 text-xs leading-5 text-zinc-600 sm:text-sm">
                  Your next great read is waiting for you.
                </p>
              </div>
            </div>

            <Link
              href="/books"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-amber-400 px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-zinc-950 shadow-md shadow-amber-200/50 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-500 hover:shadow-lg"
            >
              Explore Books

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>
        </div>

        {/* Bottom Label */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-amber-200/70 pt-6">

          <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-zinc-500">
            BOOKNOOK · YOUR PERSONAL READING SPACE
          </span>

          <span className="font-serif text-sm italic text-amber-700">
            Every book has a new beginning.
          </span>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
