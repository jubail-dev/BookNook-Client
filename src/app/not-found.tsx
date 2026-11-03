"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Home,
  Search,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fffdf9] text-[#17130d]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-100/50 blur-[100px]" />

        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-orange-100/60 blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#17130d 0.7px, transparent 0.7px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffb900] shadow-md transition-transform group-hover:rotate-[-8deg]">
            <BookOpen size={21} strokeWidth={2.5} />
          </div>

          <span className="text-xl font-extrabold tracking-tight">
            Book<span className="text-[#f5a900]">Nook</span>
          </span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-5 py-2.5 text-sm font-semibold transition-all hover:border-amber-400 hover:bg-amber-50"
        >
          <Home size={15} />
          Back Home
        </Link>
      </nav>

      {/* Main Content */}
      <section className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-center gap-12 px-6 py-12 lg:flex-row lg:gap-16 lg:px-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xl text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-700"
          >
            <Sparkles size={14} />
            Lost in the library?
          </motion.div>

          {/* 404 */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                type: "spring",
                stiffness: 100,
              }}
              className="select-none font-serif text-[120px] font-black leading-[0.9] tracking-[-0.09em] text-[#17130d] sm:text-[170px] lg:text-[190px]"
            >
              4<span className="text-[#ffb900]">0</span>4
            </motion.h1>

            <motion.div
              animate={{ rotate: [0, 12, -12, 0], y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-1 top-0 hidden rounded-2xl bg-[#ffb900] p-3 shadow-xl sm:block lg:right-10"
            >
              <BookOpen size={28} />
            </motion.div>
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-7 font-serif text-3xl font-bold leading-tight sm:text-4xl"
          >
            Oops! This page
            <br />
            <span className="italic text-[#e9a000]">is off the shelf.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-5 max-w-md text-sm leading-7 text-stone-500 lg:mx-0"
          >
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-stone-500 lg:mx-0">
              {
                "Looks like the page you're searching for has wandered into another chapter. Don't worry, there's plenty of wonderful stories waiting for you at BookNook."
              }
            </p>
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-full bg-[#ffb900] px-7 py-3.5 text-sm font-bold text-[#17130d] shadow-[0_8px_25px_rgba(255,185,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5aa00] hover:shadow-[0_12px_30px_rgba(255,185,0,0.35)]"
            >
              <Home size={17} />
              Back to Home
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/all-books"
              className="group flex items-center gap-2 rounded-full border border-stone-200 bg-white px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-50"
            >
              <Search size={17} />
              Explore Books
            </Link>
          </motion.div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 flex items-center justify-center gap-3 text-xs text-stone-400 lg:justify-start"
          >
            <span className="h-px w-9 bg-amber-300" />
            Every book has a story. Find yours.
          </motion.div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="relative flex w-full max-w-[470px] items-center justify-center"
        >
          {/* Outer Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[340px] w-[340px] rounded-full border border-dashed border-amber-300/70 sm:h-[420px] sm:w-[420px]"
          />

          <div className="absolute h-[280px] w-[280px] rounded-full bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 blur-2xl sm:h-[350px] sm:w-[350px]" />

          {/* Floating Sparkles */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 25, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute left-5 top-12 z-20 text-amber-500"
          >
            <Sparkles size={32} />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute right-5 top-24 z-20 text-orange-400"
          >
            <Sparkles size={24} />
          </motion.div>

          {/* Book Illustration */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Main Book */}
            <div className="relative h-[240px] w-[190px] [perspective:1000px] sm:h-[290px] sm:w-[220px]">
              {/* Book Shadow */}
              <div className="absolute -bottom-5 left-5 h-8 w-[90%] rounded-full bg-stone-900/20 blur-xl" />

              {/* Book Pages */}
              <div className="absolute left-3 top-2 h-[96%] w-[95%] rounded-r-xl border-y border-r border-stone-300 bg-[#f5e9ce] shadow-lg" />

              <div className="absolute left-1 top-1 h-[97%] w-[96%] rounded-r-xl border-y border-r border-stone-300 bg-[#fff8e9]" />

              {/* Cover */}
              <div className="absolute inset-0 overflow-hidden rounded-r-xl border-l-[8px] border-[#c58a08] bg-gradient-to-br from-[#20203e] via-[#25264a] to-[#111224] p-5 text-center shadow-2xl sm:p-7">
                <div className="absolute inset-3 rounded-r-lg border border-amber-400/30" />

                <div className="relative flex h-full flex-col items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <BookOpen
                      size={48}
                      className="mb-5 text-[#ffbf22]"
                      strokeWidth={1.3}
                    />
                  </motion.div>

                  <div className="h-px w-14 bg-amber-400/70" />

                  <h3 className="mt-5 font-serif text-3xl font-bold leading-tight text-[#ffca4b] sm:text-4xl">
                    Lost
                    <br />
                    Chapters
                  </h3>

                  <p className="mt-4 text-[9px] uppercase tracking-[0.3em] text-amber-100/70">
                    A BookNook Story
                  </p>

                  <div className="mt-7 h-px w-14 bg-amber-400/70" />

                  <span className="mt-4 text-xs text-amber-200">
                    Chapter 404
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Book Cards */}
            <motion.div
              animate={{ x: [0, 8, 0], rotate: [-5, -2, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-14 top-16 z-20 flex items-center gap-3 rounded-xl border border-white/80 bg-white/90 p-3 shadow-xl backdrop-blur-md sm:-left-24"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-xs font-bold">Keep Reading</p>
                <p className="text-[10px] text-stone-400">
                  New adventures await
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [0, -8, 0], rotate: [4, 1, 4] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-10 bottom-16 z-20 flex items-center gap-3 rounded-xl border border-white/80 bg-white/90 p-3 shadow-xl backdrop-blur-md sm:-right-20"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-xs font-bold">New Stories</p>
                <p className="text-[10px] text-stone-400">Waiting for you</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-stone-200/70 px-6 py-6 text-[11px] text-stone-400 sm:flex-row lg:px-12">
        <p className="font-semibold tracking-[0.15em]">
          BOOKNOOK · YOUR PERSONAL READING SPACE
        </p>

        <p className="font-serif italic text-amber-700">
          Every book is a new beginning.
        </p>
      </footer>
    </main>
  );
}
