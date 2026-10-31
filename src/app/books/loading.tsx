
import React from "react";

const BookCardSkeleton = () => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#eee8e5] bg-white">

      {/* Book Cover Skeleton */}
      <div className="relative overflow-hidden bg-[#f7f3f1] p-4 pb-3">
        <div className="relative mx-auto aspect-[3/3.8] w-full max-w-[230px] animate-pulse overflow-hidden rounded-xl bg-rose-100">

          {/* Category Badge */}
          <div className="absolute left-3 top-3 h-6 w-20 rounded-full bg-white/80" />
        </div>

        {/* Availability Badge */}
        <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-emerald-100 bg-white/95 px-3 py-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-200" />
          <span className="h-2 w-12 animate-pulse rounded bg-emerald-100" />
        </div>
      </div>

      {/* Book Information Skeleton */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex-1">

          {/* Category */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px w-5 bg-rose-200" />
            <div className="h-2.5 w-24 animate-pulse rounded bg-rose-100" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-5 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
          </div>

          {/* Author */}
          <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-slate-100" />
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-100" />

        {/* Contributor */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-rose-100" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-2 w-16 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
          </div>

          {/* Action Button */}
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </article>
  );
};

const AllBooksLoading = () => {
  return (
    <section className="relative overflow-hidden bg-[#fffdfc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="relative mx-auto max-w-[1440px]">

        {/* Page Heading Skeleton */}
        <div className="mb-14">
          <div className="mb-5 h-6 w-48 animate-pulse rounded-full bg-rose-100" />

          <div className="space-y-3">
            <div className="h-12 w-72 max-w-full animate-pulse rounded-lg bg-slate-200 sm:h-14 lg:h-16" />
            <div className="h-12 w-48 animate-pulse rounded-lg bg-rose-100 sm:h-14 lg:h-16" />
          </div>

          <div className="mt-5 space-y-2">
            <div className="h-3 w-full max-w-lg animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-3/4 max-w-md animate-pulse rounded bg-slate-100" />
          </div>
        </div>

        {/* Books Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AllBooksLoading;
