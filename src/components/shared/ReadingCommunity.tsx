
"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const ReadingCommunity: React.FC = () => {
  return (
    <section className="overflow-hidden bg-[#f7f5ef] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col justify-between gap-5 border-b border-[#dedbd1] pb-7 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-2 text-[#a47a42]">
              <Sparkles size={15} />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                The BookNook Experience
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-tight tracking-tight text-[#213b2e] sm:text-5xl lg:text-6xl">
              A world beyond
              <br className="sm:hidden" /> the pages.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#77776d]">
            Because reading is not just about the stories we discover.
           It&apos;s about the connections, inspiration and moments we share.
          </p>
        </motion.div>

        {/* Main Editorial Layout */}
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-7">

          {/* Large Image */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative min-h-[390px] overflow-hidden bg-[#e6e0d4] sm:min-h-[500px] lg:col-span-7"
          >
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=90"
              alt="Beautiful independent bookstore with bookshelves"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#17251d]/80 via-transparent to-transparent" />

            <div className="absolute left-7 top-7 flex items-center gap-2 border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <BookOpen size={13} />
              A Community of Readers
            </div>

            <div className="absolute bottom-0 left-0 max-w-lg p-7 text-white sm:p-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#e8c58f]">
                Find your people. Share your stories.
              </p>

              <h3 className="font-serif text-4xl leading-tight sm:text-5xl">
                Stories bring
                <br />
                us together.
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
                Meet people who love the same stories as you.
                Discover different perspectives and let every
                conversation open a new chapter.
              </p>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-between bg-[#eae8df] p-7 sm:p-10 lg:col-span-5"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a47a42]">
                More Than A Library
              </span>

              <h3 className="mt-6 font-serif text-4xl leading-[1.18] text-[#213b2e] sm:text-[46px]">
                Read together.
                <br />
                <span className="italic text-[#a47a42]">
                  Grow together.
                </span>
              </h3>

              <p className="mt-6 text-sm leading-8 text-[#74746b]">
                From timeless classics to hidden literary gems,
                BookNook brings readers closer through the
                simple joy of sharing books and ideas.
              </p>
            </div>

            {/* Secondary Image */}
            <div className="group relative mt-10 h-[210px] overflow-hidden sm:h-[260px]">
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=85"
                alt="A beautiful collection of books"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-4 left-4 bg-[#f7f5ef] px-4 py-3">
                <p className="font-serif text-lg text-[#213b2e]">
                  Every page matters.
                </p>
              </div>
            </div>

            <Link
              href="/register"
              className="group mt-8 inline-flex w-fit items-center gap-4 border-b border-[#213b2e] pb-3 text-sm font-semibold text-[#213b2e] transition-colors hover:border-[#a47a42] hover:text-[#a47a42]"
            >
              Become Part of BookNook
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-7 flex flex-col justify-between gap-6 border-t border-[#dedbd1] pt-7 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-serif text-2xl text-[#213b2e]">
              Your next favorite story is waiting.
            </p>
            <p className="mt-2 text-xs text-[#858479]">
              Explore a library full of possibilities.
            </p>
          </div>

          <Link
            href="/all-books"
            className="group inline-flex items-center justify-center gap-3 self-start bg-[#213b2e] px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#a47a42] sm:self-auto"
          >
            Explore Books
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ReadingCommunity;
