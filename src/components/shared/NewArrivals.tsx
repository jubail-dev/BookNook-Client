
"use client";

import React, { useEffect, useState } from "react";
import BookCard, { Book } from "./BookCard";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Library,
} from "lucide-react";

const dummyData: Book[] = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
    userName: "Rahim Ahmed",
    email: "rahim@example.com",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Classic",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
    userName: "Nusrat Jahan",
    email: "nusrat@example.com",
  },
  {
    id: 3,
    title: "Nineteen Eighty-Four",
    author: "George Orwell",
    category: "Dystopian",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    userName: "Sakib Hasan",
    email: "sakib@example.com",
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600",
    userName: "Mim Akter",
    email: "mim@example.com",
  },
  {
    id: 5,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600",
    userName: "Tanvir Islam",
    email: "tanvir@example.com",
  },
  {
    id: 6,
    title: "Dune",
    author: "Frank Herbert",
    category: "Sci-Fi",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
    userName: "Arif Hossain",
    email: "arif@example.com",
  },
  {
    id: 7,
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Sci-Fi",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
    userName: "Fahim Rahman",
    email: "fahim@example.com",
  },
  {
    id: 8,
    title: "The Martian",
    author: "Andy Weir",
    category: "Sci-Fi",
    coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=600",
    userName: "Sadia Islam",
    email: "sadia@example.com",
  },
  {
    id: 9,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    category: "Fantasy",
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600",
    userName: "Rafi Ahmed",
    email: "rafi@example.com",
  },
  {
    id: 10,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
    userName: "Mehedi Hasan",
    email: "mehedi@example.com",
  },
  {
    id: 11,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    userName: "Anika Rahman",
    email: "anika@example.com",
  },
  {
    id: 12,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Adventure",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
    userName: "Imran Hossain",
    email: "imran@example.com",
  },
];

const NewArrivals: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setBooks(dummyData);
      } catch (error) {
        console.error("Failed to fetch books:", error);
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
            {books.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
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
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;
