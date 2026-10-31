
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { BookItem } from "@/types/book.type";
import Link from "next/link";

interface BookCardProps {
  book: BookItem;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[#eee8e5] bg-white transition-all duration-500 hover:-translate-y-2 hover:border-rose-200 hover:shadow-[0_22px_55px_-20px_rgba(190,24,93,0.18)]">

      {/* Book Cover */}
      <div className="relative overflow-hidden bg-[#f7f3f1] p-4 pb-3">
        <div className="relative mx-auto aspect-[3/3.8] w-full max-w-[230px] overflow-hidden rounded-xl shadow-[0_12px_25px_rgba(0,0,0,0.13)]">
          <img
            src={book.image}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />

          <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-rose-600 shadow-sm backdrop-blur-md">
            {book.category}
          </span>
        </div>

        {/* Availability */}
        <div className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full border border-emerald-100 bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">
            Available
          </span>
        </div>
      </div>

      {/* Book Information */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-5 bg-rose-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500">
              {book.category} Edition
            </span>
          </div>

          <h3 className="line-clamp-2 min-h-[52px] text-[17px] font-extrabold leading-6 tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-rose-600">
            {book.title}
          </h3>

          <p className="mt-1.5 text-sm font-medium text-slate-500">
            By {book.author}
          </p>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-100" />

        {/* Contributor */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-orange-100 text-sm font-extrabold text-rose-600">
            {book.userName.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Shared by
            </p>
            <p className="truncate text-xs font-bold text-slate-700">
              {book.userName}
            </p>
          </div>

          <Link href={"/books"}>
            <button
            type="button"
            aria-label={`View details for ${book.title}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-all duration-300 hover:bg-rose-600 group-hover:rotate-45"
          >
            <ArrowUpRight size={18} />
          </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
