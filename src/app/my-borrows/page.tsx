
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Library,
  CalendarDays,
  Clock3,
  ArrowUpRight,
  RotateCcw,
  Search,
  Sparkles,
  BookMarked,
  AlertCircle,
  CheckCircle2,
  BookCheck,
} from "lucide-react";

interface BorrowedBook {
  _id: string;
  bookId: string;
  bookName: string;
  userName: string;
  userEmail: string;
  borrowDate: string;
  borrowDurationDate: string;
  title?: string;
  image?: string;
}

const MyBorrowsPage = () => {
  const { data: session, isPending } = useSession();

  const [borrows, setBorrows] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (isPending || !userEmail) return;

    let isActive = true;

    const fetchBorrows = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/book/bookings/${userEmail}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch borrowed books");
        }

        const data: BorrowedBook[] = await response.json();

        if (isActive) {
          setBorrows(data);
        }
      } catch (error) {
        console.error("Failed to fetch borrowed books:", error);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchBorrows();

    return () => {
      isActive = false;
    };
  }, [userEmail, isPending]);

  const isLoading = isPending || (!!userEmail && loading);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getBookStatus = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const returnDate = new Date(dateString);
    returnDate.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
      (returnDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff < 0) {
      return {
        label: "Overdue",
        color: "text-red-600 bg-red-50 border-red-100",
        icon: AlertCircle,
      };
    }

    if (diff <= 3) {
      return {
        label: "Due Soon",
        color: "text-amber-700 bg-amber-50 border-amber-100",
        icon: Clock3,
      };
    }

    return {
      label: "Active",
      color: "text-emerald-700 bg-emerald-50 border-emerald-100",
      icon: CheckCircle2,
    };
  };

  const filteredBorrows = borrows.filter((book) =>
    (book.title || "Untitled Book")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const overdueCount = borrows.filter(
    (book) => getBookStatus(book.borrowDurationDate).label === "Overdue"
  ).length;

  const activeCount = borrows.length - overdueCount;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-5 h-5 border-2 border-[#EAB308] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading your library...</span>
        </div>
      </div>
    );
  }

  const handleReturnButton = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/book/bookings/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (result.deletedCount > 0) {
    console.log("Book returned successfully");
  }
};

  return (
    <main className="min-h-screen bg-[#F8F7F2] text-[#171717] px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[24px] bg-[#171717] p-6 sm:p-9 mb-8"
        >
          <div className="absolute -right-12 -top-20 w-64 h-64 rounded-full bg-[#EAB308]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#EAB308] text-xs font-bold uppercase tracking-[2px] mb-4">
                <Sparkles size={14} />
                Personal Library
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                My <span className="text-[#EAB308]">Borrows.</span>
              </h1>

              <p className="text-gray-400 text-sm mt-3 max-w-md">
                Keep track of your borrowed books, manage return dates,
                and enjoy every chapter of your reading journey.
              </p>
            </div>

            <div className="hidden sm:flex w-20 h-20 rounded-2xl bg-[#EAB308] items-center justify-center shadow-lg shadow-yellow-500/10">
              <Library size={38} className="text-[#171717]" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-32 h-1 bg-[#EAB308]" />
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "Total Borrowed",
              value: borrows.length,
              icon: BookOpen,
              description: "Books in your records",
            },
            {
              title: "Active Borrows",
              value: activeCount,
              icon: BookCheck,
              description: "Not overdue",
            },
            {
              title: "Overdue Books",
              value: overdueCount,
              icon: AlertCircle,
              description: "Need your attention",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-[#EAE7DF] rounded-2xl p-5 flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.title}
                </p>
                <h2 className="text-3xl font-bold mt-2 text-[#171717]">
                  {stat.value}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {stat.description}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#FFF8DD] flex items-center justify-center">
                <stat.icon size={22} className="text-[#B68A00]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Books Section */}
        <section className="bg-white border border-[#EAE7DF] rounded-2xl shadow-sm overflow-hidden">

          <div className="p-5 sm:p-6 border-b border-[#F0EEE8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#171717] flex items-center gap-2">
                <BookMarked size={19} className="text-[#C99B08]" />
                Borrowed Collection
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Manage your current borrowed books
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your books..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#EAE7DF] bg-[#FAFAF8] text-sm outline-none focus:border-[#D6AA16] transition-colors"
              />
            </div>
          </div>

          {borrows.length === 0 ? (
            <div className="py-16 px-5 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FFF8DD] flex items-center justify-center mb-5">
                <Library size={30} className="text-[#C99B08]" />
              </div>
              <h3 className="text-lg font-bold text-[#171717]">
                Your reading journey starts here
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                You haven&apos;t borrowed any books yet.
              </p>
            </div>
          ) : filteredBorrows.length === 0 ? (
            <div className="py-14 text-center">
              <Search size={28} className="mx-auto text-gray-400 mb-3" />
              <p className="font-semibold text-gray-700">
                No books found
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Try searching with another title.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#FAFAF8] text-[11px] uppercase tracking-wider text-gray-500">
                      <th className="px-6 py-4 font-bold">Book Details</th>
                      <th className="px-5 py-4 font-bold">Borrowed On</th>
                      <th className="px-5 py-4 font-bold">Return Date</th>
                      <th className="px-5 py-4 font-bold">Status</th>
                      <th className="px-5 py-4 font-bold text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#F0EEE8]">
                    {filteredBorrows.map((item, index) => {
                      const status = getBookStatus(item.borrowDurationDate);
                      const StatusIcon = status.icon;

                      return (
                        <motion.tr
                          key={item._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-[#FFFEFA] transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="relative w-12 h-[62px] shrink-0 rounded-lg overflow-hidden bg-[#F2EFE7] shadow-sm">
                                {item.image ? (
                                  <Image
                                    src={item.image}
                                    alt={item.title || "Book cover"}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <BookOpen size={20} className="text-gray-400" />
                                  </div>
                                )}
                              </div>

                              <div>
                                <p className="font-bold text-sm text-[#171717]">
                                  {item.bookName || "Untitled Book"}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Book ID: {item.bookId.slice(0, 8)}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarDays size={14} className="text-gray-400" />
                              {formatDate(item.borrowDate)}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="text-sm font-medium text-gray-700">
                              {formatDate(item.borrowDurationDate)}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${status.color}`}>
                              <StatusIcon size={12} />
                              {status.label}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#171717] text-white text-xs font-semibold hover:bg-[#EAB308] hover:text-[#171717] transition-all duration-200 cursor-pointer"
                              onClick={() => {handleReturnButton(item._id)}}
                            >
                              <RotateCcw size={13} />
                              Return Book
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden divide-y divide-[#F0EEE8]">
                {filteredBorrows.map((item) => {
                  const status = getBookStatus(item.borrowDurationDate);
                  const StatusIcon = status.icon;

                  return (
                    <div key={item._id} className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-14 h-[76px] shrink-0 rounded-lg overflow-hidden bg-[#F2EFE7]">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title || "Book cover"}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <BookOpen size={20} className="text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-[#171717] truncate">
                            {item.title || "Untitled Book"}
                          </h3>

                          <span className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full border text-[10px] font-bold ${status.color}`}>
                            <StatusIcon size={11} />
                            {status.label}
                          </span>

                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold">
                                Borrowed
                              </p>
                              <p className="text-xs text-gray-700 mt-1">
                                {formatDate(item.borrowDate)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold">
                                Return Date
                              </p>
                              <p className="text-xs text-gray-700 mt-1">
                                {formatDate(item.borrowDurationDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => console.log("Return book:", item._id)}
                        className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#171717] text-white py-2.5 text-xs font-semibold hover:bg-[#EAB308] hover:text-[#171717] transition-all cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        Return Book
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {borrows.length > 0 && (
            <div className="px-5 sm:px-6 py-4 bg-[#FAFAF8] border-t border-[#F0EEE8] flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-bold text-gray-800">
                  {filteredBorrows.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-gray-800">
                  {borrows.length}
                </span>{" "}
                books
              </p>

              <span className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                <Sparkles size={12} className="text-[#C99B08]" />
                Your Reading Space
              </span>
            </div>
          )}
        </section>

        {/* Footer Note */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
          <ArrowUpRight size={13} />
          Keep reading. Keep growing.
        </div>
      </div>
    </main>
  );
};

export default MyBorrowsPage;
