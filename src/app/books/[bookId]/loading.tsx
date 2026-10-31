
import { BookOpen, Library } from "lucide-react";

const BookDetailsLoading = () => {
  return (
    <main className="min-h-screen bg-[#F7F8F5] text-[#192C22] animate-pulse">

      {/* Navigation Skeleton */}
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 flex items-center justify-between border-b border-[#E8EBE5]">

        <div className="h-5 w-32 bg-[#E3E9E1] rounded-md" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#DCE5DB]" />
          <div className="h-5 w-24 bg-[#E3E9E1] rounded-md" />
        </div>

        <div className="hidden sm:block h-3 w-24 bg-[#E3E9E1] rounded-md" />

      </nav>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-20">

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-center">

          {/* LEFT - Book Cover Skeleton */}
          <div className="relative">

            <div className="relative bg-[#E9EDE7] rounded-[28px] p-7 sm:p-12 lg:p-10 overflow-hidden">

              {/* Cover */}
              <div className="relative max-w-[310px] mx-auto mt-8">

                <div className="aspect-[3/4] rounded-lg bg-[#D5DED4] shadow-[0_25px_55px_rgba(25,44,34,0.12)]" />

                {/* Shadow */}
                <div className="h-5 mx-5 bg-[#192C22]/10 blur-xl rounded-full mt-5" />

              </div>

              {/* Bottom Label */}
              <div className="relative z-10 mt-9 flex items-center justify-between border-t border-[#D5DDD3] pt-5">

                <div className="space-y-2">
                  <div className="h-3 w-24 bg-[#D5DED4] rounded" />
                  <div className="h-4 w-44 bg-[#D5DED4] rounded" />
                </div>

                <div className="w-11 h-11 rounded-full bg-[#D5DED4]" />

              </div>

            </div>

            {/* Availability Badge */}
            <div className="absolute top-5 right-5 bg-white shadow-lg rounded-full px-4 py-3">
              <div className="h-3 w-20 bg-[#E3E9E1] rounded-full" />
            </div>

          </div>

          {/* RIGHT - Book Information Skeleton */}
          <div className="flex flex-col">

            {/* Category */}
            <div className="flex items-center gap-3 mb-7">
              <div className="h-8 w-28 bg-[#E3E9E1] rounded-lg" />
              <div className="w-1 h-1 bg-[#D5DED4] rounded-full" />
              <div className="h-3 w-32 bg-[#E3E9E1] rounded" />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <div className="h-3 w-44 bg-[#D5DED4] rounded" />

              <div className="h-12 sm:h-14 w-full max-w-[500px] bg-[#DCE5DB] rounded-lg" />
              <div className="h-12 sm:h-14 w-3/4 max-w-[380px] bg-[#DCE5DB] rounded-lg" />
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-[#E3E9E1]" />

              <div className="space-y-2">
                <div className="h-3 w-20 bg-[#E3E9E1] rounded" />
                <div className="h-4 w-32 bg-[#DCE5DB] rounded" />
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#E4E9E2] my-9" />

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-[#D5DED4] rounded-full" />
                <div className="h-4 w-36 bg-[#DCE5DB] rounded" />
              </div>

              <div className="space-y-3">
                <div className="h-3 w-full bg-[#E3E9E1] rounded" />
                <div className="h-3 w-full bg-[#E3E9E1] rounded" />
                <div className="h-3 w-4/5 bg-[#E3E9E1] rounded" />
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mt-9">

              <div className="bg-white border border-[#E9ECE7] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <Library size={17} className="text-[#D5DED4]" />
                  <div className="h-3 w-24 bg-[#E3E9E1] rounded" />
                </div>

                <div className="h-9 w-12 bg-[#DCE5DB] rounded" />
                <div className="h-3 w-28 bg-[#E3E9E1] rounded mt-3" />
              </div>

              <div className="bg-white border border-[#E9ECE7] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen size={17} className="text-[#D5DED4]" />
                  <div className="h-3 w-24 bg-[#E3E9E1] rounded" />
                </div>

                <div className="h-6 w-28 bg-[#DCE5DB] rounded" />
                <div className="h-3 w-32 bg-[#E3E9E1] rounded mt-3" />
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <div className="h-[58px] flex-1 bg-[#D5DED4] rounded-xl" />
              <div className="h-[58px] w-full sm:w-40 bg-[#E3E9E1] rounded-xl" />
            </div>

            {/* Contributor */}
            <div className="mt-10 pt-7 border-t border-[#E4E9E2] flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#E3E9E1]" />

                <div className="space-y-2">
                  <div className="h-3 w-24 bg-[#E3E9E1] rounded" />
                  <div className="h-3 w-28 bg-[#DCE5DB] rounded" />
                </div>
              </div>

              <div className="space-y-2 text-right">
                <div className="h-3 w-28 bg-[#E3E9E1] rounded ml-auto" />
                <div className="h-3 w-36 bg-[#DCE5DB] rounded ml-auto" />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="border-t border-[#E6EAE3] bg-white/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">

          <div className="h-3 w-52 bg-[#E3E9E1] rounded" />

          <div className="h-3 w-44 bg-[#E3E9E1] rounded" />

        </div>
      </footer>

    </main>
  );
};

export default BookDetailsLoading;
