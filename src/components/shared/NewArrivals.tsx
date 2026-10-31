
"use client";

import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Library,
} from "lucide-react";
import { BookItem } from "@/types/book.type";
import Link from "next/link";

const NewArrivals: React.FC = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/books`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data: BookItem[] = await response.json();

        // Latest added books first, showing only 12 books
        const latestBooks = [...data].reverse().slice(0, 12);

        setBooks(latestBooks);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#fffdfc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

      {/* Background Details */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-rose-100/50 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-100/40 blur-[110px]" />

      <div className="relative mx-auto max-w-[1440px]">

        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 shadow-sm">
              <Sparkles size={14} className="text-rose-500" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-rose-600">
                Discover Something New
              </span>
            </div>

            <h2 className="text-4xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[64px]">
              Stories worth
              <span className="block font-serif font-medium italic text-rose-500">
                sharing.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
              A little discovery can lead to a lifetime of inspiration.
              Explore books shared by our reading community.
            </p>
          </div>

          {/* Collection Stats */}
          <div className="flex items-center gap-5 self-start rounded-2xl border border-rose-100/80 bg-white/80 p-5 shadow-sm backdrop-blur-md lg:self-end">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <Library size={23} />
            </div>

            <div>
              <p className="text-3xl font-black tracking-tight text-slate-900">
                {loading ? "--" : String(books.length).padStart(2, "0")}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Fresh Collections
              </p>
            </div>
          </div>
        </div>

        {/* Small Label */}
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-rose-500" />
            <h3 className="text-sm font-extrabold tracking-wide text-slate-800">
              Recently Shared Books
            </h3>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Explore & Read
          </span>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[22px] border border-slate-100 bg-white p-4"
              >
                <div className="mx-auto aspect-[3/3.8] max-w-[230px] animate-pulse rounded-xl bg-rose-50" />

                <div className="space-y-3 px-1 pt-5">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-rose-100" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                  <div className="mt-5 h-10 animate-pulse rounded bg-slate-50" />
                </div>
              </div>
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-rose-200 bg-white py-20 text-center">
            <BookOpen className="mx-auto mb-4 text-rose-300" size={36} />

            <h3 className="text-lg font-bold text-slate-800">
              No books found
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              New books will appear here soon.
            </p>
          </div>
        )}

        {/* Bottom Footer */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-rose-100 pt-8 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Good books deserve great readers.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Find a story. Share a story. Keep the joy moving.
            </p>
          </div>

          <Link href={'/books'}>
            <button
            type="button"
            className="group inline-flex items-center gap-3 rounded-full bg-slate-950 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-200"
          >
            Explore Collection
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;
