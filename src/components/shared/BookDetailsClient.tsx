
"use client";

import { useState } from "react";
import { BookItem } from "@/types/book.type";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Library,
  MoveUpRight,
  UserRound,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

interface BookDetailsClientProps {
  bookData: BookItem;
}

const BookDetailsClient = ({ bookData }: BookDetailsClientProps) => {
  const available = Number(bookData.totalCopies) > 0;

  const {data:session,isPending} = useSession()

  const [open, setOpen] = useState(false);

  const [borrowData, setBorrowData] = useState({
    userName: "",
    userEmail: "",
  });

  const handleBorrow = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const bookingData = {
      bookId: bookData._id,
      userName: formData.get("userName") as string,
      userEmail: formData.get("userEmail") as string,
      borrowDate: new Date().toISOString(),
      borrowDurationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days later
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/book/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Failed to borrow book");
      }

      const result = await response.json();
      console.log("Borrow successful:", result);
      toast.success("Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("Failed to borrow book.");
    }

    setOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#F7F8F5] text-[#192C22] overflow-hidden">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 flex items-center justify-between border-b border-[#E8EBE5]">
        <Link
          href="/books"
          className="flex items-center gap-2 text-sm font-medium text-[#66756A] hover:text-[#234B38] transition-colors group"
        >
          <ArrowLeft
            size={17}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Library
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#234B38] flex items-center justify-center">
            <Library size={16} className="text-white" />
          </div>
          <span className="font-bold tracking-tight text-[#234B38]">
            Book<span className="text-[#A68B56]">Nest.</span>
          </span>
        </div>

        <span className="hidden sm:block text-xs tracking-widest uppercase text-[#89958B]">
          Book Details
        </span>
      </nav>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-center">
          {/* LEFT - Book Cover */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative bg-[#E9EDE7] rounded-[28px] p-7 sm:p-12 lg:p-10 overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-52 h-52 bg-[#C8D4C8]/40 rounded-full blur-3xl" />

              {/* Cover */}
              <div className="relative z-10 max-w-[310px] mx-auto mt-8">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white shadow-[0_25px_55px_rgba(25,44,34,0.22)] transition-transform duration-700 hover:-translate-y-2 hover:rotate-1">
                  <Image
                    src={bookData.image}
                    alt={bookData.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 75vw, 310px"
                    className="object-cover"
                  />
                </div>

                {/* Shadow */}
                <div className="h-5 mx-5 bg-[#192C22]/10 blur-xl rounded-full mt-5" />
              </div>

              {/* Bottom Label */}
              <div className="relative z-10 mt-9 flex items-center justify-between border-t border-[#D5DDD3] pt-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#849084] font-semibold">
                    Our Collection
                  </p>
                  <p className="text-sm font-semibold text-[#234B38] mt-1">
                    Discover Your Next Story
                  </p>
                </div>

                <div className="w-11 h-11 rounded-full border border-[#CBD5CA] flex items-center justify-center">
                  <BookOpen size={19} className="text-[#315B40]" />
                </div>
              </div>
            </div>

            {/* Floating Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute top-5 right-5 bg-white shadow-lg rounded-full px-4 py-2.5 flex items-center gap-2"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  available ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              <span className="text-xs font-semibold text-[#34483A]">
                {available ? "Available" : "Unavailable"}
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT - Book Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Category */}
            <div className="flex items-center gap-3 mb-7">
              <span className="bg-[#E7EDE6] text-[#315A40] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
                {bookData.category}
              </span>

              <span className="text-xs text-[#A0A89F]">•</span>

              <span className="text-xs font-medium text-[#8A958B] uppercase tracking-widest">
                Book Collection
              </span>
            </div>

            {/* Heading */}
            <div>
              <p className="text-[#A68B56] text-xs font-bold tracking-[0.25em] uppercase mb-4">
                Explore. Discover. Read.
              </p>

              <h1 className="text-4xl sm:text-5xl xl:text-[62px] leading-[1.12] tracking-tight font-serif font-semibold text-[#1B3326] break-words">
                {bookData.title}
              </h1>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-[#E7EDE6] flex items-center justify-center">
                <UserRound size={21} className="text-[#315B40]" />
              </div>

              <div>
                <p className="text-xs text-[#96A097] font-medium uppercase tracking-wider">
                  Written by
                </p>
                <p className="text-base font-semibold text-[#304638] mt-1">
                  {bookData.author}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#E4E9E2] my-9" />

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-[#A68B56] rounded-full" />
                <h2 className="text-sm font-bold text-[#263D2F] uppercase tracking-[0.12em]">
                  About This Book
                </h2>
              </div>

              <p className="text-[15px] leading-8 text-[#788379] max-w-2xl">
                {bookData.description}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mt-9">
              <div className="bg-white border border-[#E9ECE7] rounded-2xl p-5 hover:border-[#C8D5C8] transition-colors">
                <div className="flex items-center gap-2 text-[#89958A] mb-4">
                  <Library size={17} />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    Total Copies
                  </span>
                </div>

                <p className="text-3xl font-bold text-[#234B38]">
                  {bookData.totalCopies}
                </p>

                <p className="text-xs text-[#A0AAA0] mt-1">
                  Copies in library
                </p>
              </div>

              <div className="bg-white border border-[#E9ECE7] rounded-2xl p-5 hover:border-[#C8D5C8] transition-colors">
                <div className="flex items-center gap-2 text-[#89958A] mb-4">
                  <CheckCircle2 size={17} />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    Book Status
                  </span>
                </div>

                <p
                  className={`text-xl font-bold ${
                    available ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {available ? "In Stock" : "Out of Stock"}
                </p>

                <p className="text-xs text-[#A0AAA0] mt-2">
                  {available ? "Ready to borrow" : "Currently unavailable"}
                </p>
              </div>
            </div>

            {/* Borrow Action */}
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Dialog open={open} onOpenChange={setOpen}>
                <button
                  type="button"
                  disabled={!available}
                  onClick={() => setOpen(true)}
                  className="group flex-1 flex items-center justify-center gap-3 bg-[#234B38] hover:bg-[#315E46] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-7 py-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#234B38]/10 hover:shadow-xl hover:-translate-y-1"
                >
                  <BookOpen size={19} />
                  Borrow This Book
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>

                <DialogContent className="sm:max-w-[440px] bg-white rounded-2xl">
                  <DialogHeader>
                    <div className="w-12 h-12 rounded-xl bg-[#E7EDE6] flex items-center justify-center mb-3">
                      <BookOpen size={23} className="text-[#234B38]" />
                    </div>

                    <DialogTitle className="text-2xl font-serif font-bold text-[#192C22]">
                      Borrow This Book
                    </DialogTitle>

                    <DialogDescription className="text-sm text-[#788379]">
                      You can keep this book for 7 days.
                    </DialogDescription>

                    {/* Selected Book Name */}
                    <div className="mt-3 p-4 rounded-xl bg-[#F1F5EF] border border-[#E1E9DF]">
                      <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8A958B] mb-1">
                        Selected Book
                      </p>

                      <p className="text-base font-bold text-[#234B38] break-words">
                        {bookData.title}
                      </p>

                      <p className="text-xs text-[#788379] mt-1">
                        By {bookData.author}
                      </p>
                    </div>
                  </DialogHeader>

                  {/* Borrow Form */}
                  <form onSubmit={handleBorrow}>
                  <div className="space-y-5 py-4">
                    {/* Username */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="userName"
                        className="text-sm font-semibold text-[#34483A]"
                      >
                        Username
                      </Label>

                      <Input
                        id="userName"
                        name="userName"
                        placeholder="Enter your username"
                        defaultValue={session?.user.name}
                        readOnly
                        onChange={(e) =>
                          setBorrowData({
                            ...borrowData,
                            userName: e.target.value,
                          })
                        }
                        className="h-11 focus-visible:ring-[#315E46]"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="userEmail"
                        className="text-sm font-semibold text-[#34483A]"
                      >
                        User Email
                      </Label>

                      <Input
                        name="userEmail"
                        id="userEmail"
                        type="email"
                        placeholder="Enter your email address"
                        defaultValue={session?.user?.email}
                        readOnly
                        onChange={(e) =>
                          setBorrowData({
                            ...borrowData,
                            userEmail: e.target.value,
                          })
                        }
                        className="h-11 focus-visible:ring-[#315E46]"
                      />
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled = {Number(bookData.totalCopies) < 1}
                      className="w-full h-11 bg-[#234B38] hover:bg-[#315E46] text-white rounded-xl"
                    >
                      <BookOpen size={17} className="mr-2" />
                      Confirm Borrow
                    </Button>
                  </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Link
                href="/books"
                className="flex items-center justify-center gap-2 border border-[#DDE4DB] hover:border-[#234B38] hover:bg-white text-[#34513E] px-6 py-4 rounded-xl text-sm font-semibold transition-all"
              >
                Explore More
                <MoveUpRight size={16} />
              </Link>
            </div>

            {/* Contributor */}
            <div className="mt-10 pt-7 border-t border-[#E4E9E2] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#E8EDE6] flex items-center justify-center">
                  <UserRound size={18} className="text-[#526A58]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-[#9BA49B] uppercase tracking-wider">
                    Contributed by
                  </p>

                  <p className="text-sm font-semibold text-[#344B3A] mt-0.5 truncate">
                    {bookData.userName}
                  </p>
                </div>
              </div>

              <div className="text-right min-w-0">
                <p className="text-[11px] text-[#9BA49B] uppercase tracking-wider">
                  Community Library
                </p>

                <p className="text-xs text-[#607365] mt-1 truncate max-w-[170px]">
                  {bookData.userEmail}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Footer */}
      <footer className="border-t border-[#E6EAE3] bg-white/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#89958B]">
            © {new Date().getFullYear()} BookNest. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-[#607365]">
            <Check size={14} className="text-emerald-600" />
            Every book deserves a reader.
          </div>
        </div>
      </footer>
    </main>
  );
};

export default BookDetailsClient;
