
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Library,
  BookCopy,
  Layers3,
  Search,
  Pencil,
  Trash2,
  SearchX,
  Sparkles,
  ArrowUpRight,
  Bookmark,
  BookMarked,
  MoveUpRight,
} from "lucide-react";
import { BookItem } from "@/types/book.type";
import EditBooksDialog from "@/components/shared/EditBooksDialog";
import DeleteBooksDialog from "@/components/shared/DeleteBookDialog";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const MyBookPage = () => {
  const { data: session, isPending } = useSession();

const [myBooks, setMyBooks] = useState<BookItem[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  if (isPending) return;

  if (!session?.user?.email) return;

  let isActive = true;

  const fetchMyBooks = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/my-books/${session.user.email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data: BookItem[] = await response.json();

      if (isActive) {
        setMyBooks(data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      if (isActive) {
        setIsLoading(false);
      }
    }
  };

  fetchMyBooks();

  return () => {
    isActive = false;
  };
}, [session?.user?.email, isPending]);

const filteredBooks = myBooks.filter(
  (book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
);

const totalCopies = myBooks.reduce(
  (total, book) => total + Number(book.totalCopies || 0),
  0
);

const totalCategories = new Set(
  myBooks.map((book) => book.category)
).size;

const stats = [
  {
    title: "Total Books",
    value: myBooks.length,
    icon: Library,
    label: "Titles collected",
  },
  {
    title: "Total Copies",
    value: totalCopies,
    icon: BookCopy,
    label: "In your library",
  },
  {
    title: "Categories",
    value: totalCategories,
    icon: Layers3,
    label: "Reading genres",
  },
];
  if (isPending || isLoading) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center bg-[#f7f7f2]">
        <div className="text-center">
          <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#dce5d9] border-t-[#173f30]" />
            <BookOpen size={23} className="text-[#173f30]" />
          </div>
          <p className="font-semibold text-[#173f30]">
            Preparing your library...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f2] px-4 py-5 text-[#193c30] sm:px-6 lg:px-9 lg:py-7">
      <div className="mx-auto max-w-[1320px]">

        {/* TOP HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#193c30] text-[#d5e7bc] shadow-lg shadow-[#193c30]/10">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-[#193c30]">
                The Reading Room
              </p>
              <p className="text-sm text-[#89958a]">
                Your personal collection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#e4e7dd] bg-white px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#80a96e]" />
            <span className="text-sm font-semibold text-[#627b60]">
              Your library is active
            </span>
          </div>
        </motion.header>

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative isolate overflow-hidden rounded-[26px] bg-[#193c30] px-6 py-7 shadow-[0_15px_40px_rgba(25,60,48,0.12)] sm:px-9 sm:py-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-32 -z-10 h-80 w-80 rounded-full border-[55px] border-white/[0.035]" />

          <motion.div
            animate={{ y: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="pointer-events-none absolute -bottom-24 right-[30%] -z-10 h-52 w-52 rounded-full bg-[#b7d69b]/20 blur-[75px]"
          />

          <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-xs font-bold tracking-wider text-[#d1e8b6]">
                <Sparkles size={14} />
                A PLACE FOR EVERY STORY
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
                Welcome back,{" "}
                <span className="text-[#c7dfa8]">
                  {session?.user?.name?.split(" ")[0] || "Reader"}!
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                Every book is a new journey. Your personal reading space is
                ready to inspire your next adventure.
              </p>

              <div className="mt-5 flex items-center gap-2.5 text-sm font-medium text-[#c8dcb7]">
                <BookMarked size={18} />
                <span>Collect moments. Discover worlds.</span>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -5, rotate: -2 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative flex w-full items-center justify-between gap-5 rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-xl sm:w-[235px] sm:flex-col sm:items-start"
            >
              <div className="flex items-center gap-3 sm:w-full sm:justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d0e5b2] text-[#193c30]">
                  <Library size={22} />
                </div>
                <MoveUpRight size={19} className="text-white/50" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                  Your Collection
                </p>
                <p className="mt-1 text-4xl font-extrabold text-white">
                  {String(myBooks.length).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Books in your library
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* STATS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group flex items-center justify-between rounded-[20px] border border-[#e8eae1] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(25,60,48,0.035)] transition-shadow hover:shadow-[0_10px_25px_rgba(25,60,48,0.08)]"
            >
              <div>
                <p className="text-sm font-semibold text-[#829084]">
                  {stat.title}
                </p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#193c30]">
                  {stat.value.toLocaleString()}
                </p>
                <p className="mt-1 text-xs font-medium text-[#a0a99e]">
                  {stat.label}
                </p>
              </div>

              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3e8] text-[#456b4a] transition-colors group-hover:bg-[#193c30] group-hover:text-white"
              >
                <stat.icon size={23} />
              </motion.div>
            </motion.div>
          ))}
        </motion.section>

        {/* COLLECTION */}
        <section className="mt-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
          >
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#88a976]" />
                <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#8b9b83]">
                  YOUR READING SPACE
                </p>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-[#193c30] sm:text-[28px]">
                My Collection
                <span className="ml-2.5 rounded-lg bg-[#e7eee0] px-2.5 py-1 text-sm font-bold text-[#56744e]">
                  {filteredBooks.length}
                </span>
              </h2>
            </div>

            <div className="relative w-full sm:max-w-[340px]">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c9b88]"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search title, author or genre..."
                className="h-[48px] w-full rounded-xl border border-[#e4e8df] bg-white pl-11 pr-4 text-sm font-medium text-[#193c30] outline-none transition-all placeholder:text-[#a2aca0] focus:border-[#76966e] focus:ring-4 focus:ring-[#193c30]/5"
              />
            </div>
          </motion.div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-[22px] border border-[#e6e9e1] bg-white shadow-[0_8px_30px_rgba(25,60,48,0.04)]">

            <div className="hidden grid-cols-[minmax(0,2.5fr)_1.1fr_0.8fr_0.9fr_90px] items-center gap-4 border-b border-[#edf0e9] bg-[#fafbf8] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#8d9a8b] md:grid">
              <span>Book Information</span>
              <span>Category</span>
              <span>Copies</span>
              <span>Reference</span>
              <span className="text-right">Actions</span>
            </div>

            {filteredBooks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-5 py-14 text-center sm:py-16"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf3e8] text-[#54774e]">
                  {searchTerm ? (
                    <SearchX size={30} />
                  ) : (
                    <BookOpen size={30} />
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#193c30]">
                  {searchTerm
                    ? "No Matching Books Found"
                    : "Your Library is Waiting"}
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#929c90]">
                  {searchTerm
                    ? "Try searching with another title, author or category."
                    : "Your collection is waiting for its first story. Start building your personal library."}
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book._id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.035, 0.2) }}
                    className="group grid grid-cols-1 gap-3 border-b border-[#edf0e9] px-4 py-4 transition-colors duration-300 last:border-0 hover:bg-[#f9fbf7] sm:px-6 md:grid-cols-[minmax(0,2.5fr)_1.1fr_0.8fr_0.9fr_90px] md:items-center md:gap-4"
                  >
                    {/* BOOK */}
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative h-[68px] w-[49px] shrink-0 overflow-hidden rounded-lg bg-[#edf1e9] shadow-md">
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          sizes="49px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="line-clamp-1 text-base font-bold text-[#193c30] transition-colors group-hover:text-[#78996c]">
                          {book.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#8c988b]">
                          By {book.author}
                        </p>

                        <span className="mt-2 inline-flex rounded-md bg-[#edf3e8] px-2.5 py-1 text-xs font-semibold text-[#57764f] md:hidden">
                          {book.category}
                        </span>
                      </div>
                    </div>

                    {/* CATEGORY */}
                    <div className="hidden md:block">
                      <span className="inline-flex max-w-full truncate rounded-lg bg-[#edf3e8] px-3 py-2 text-xs font-semibold text-[#58764f]">
                        {book.category}
                      </span>
                    </div>

                    {/* COPIES */}
                    <div className="hidden md:block">
                      <p className="text-base font-bold text-[#193c30]">
                        {book.totalCopies}
                      </p>
                      <p className="text-xs text-[#9ba49a]">Available</p>
                    </div>

                    {/* REFERENCE */}
                    <div className="hidden md:block">
                      <span className="font-mono text-xs text-[#929e91]">
                        #{book._id.slice(-8)}
                      </span>
                    </div>

                    {/* MOBILE INFO + ACTIONS */}
                    <div className="flex items-center justify-between gap-3 md:justify-end">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#8c988b] md:hidden">
                        <BookCopy size={14} />
                        {book.totalCopies} Copies
                        <span>•</span>
                        #{book._id.slice(-6)}
                      </div>

                      <div className="flex items-center gap-2">
                        <EditBooksDialog filteredBooks={filteredBooks} book={book}></EditBooksDialog>
                        <DeleteBooksDialog book={book}></DeleteBooksDialog>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* FOOTER */}
          {filteredBooks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1"
            >
              <p className="text-sm text-[#909c8e]">
                Showing{" "}
                <span className="font-bold text-[#193c30]">
                  {filteredBooks.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-[#193c30]">
                  {myBooks.length}
                </span>{" "}
                books
              </p>

              <p className="flex items-center gap-2 text-sm font-semibold text-[#718b68]">
                <Bookmark size={15} />
                Every story matters.
                <ArrowUpRight size={15} />
              </p>
            </motion.div>
          )}
        </section>

        {/* BOTTOM */}
        <div className="mt-7 flex items-center justify-center gap-3 pb-2">
          <span className="h-px w-10 bg-[#dce5d7]" />
          <BookOpen size={15} className="text-[#9aaf8c]" />
          <span className="text-xs font-semibold tracking-[0.15em] text-[#9ba995]">
            A WORLD BETWEEN PAGES
          </span>
          <span className="h-px w-10 bg-[#dce5d7]" />
        </div>
      </div>
    </main>
  );
};

export default MyBookPage;
