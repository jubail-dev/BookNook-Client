
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookItem } from "@/types/book.type";
import { motion } from "framer-motion";
import {
  Trash2,
  BookOpen,
  AlertTriangle,
  X,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

interface DeleteBooksDialogProps {
  book: BookItem;
}

const DeleteBooksDialog = ({ book }: DeleteBooksDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Show success toast after page reload
  useEffect(() => {
    const successMessage = sessionStorage.getItem("book-delete-success");

    if (successMessage) {
      sessionStorage.removeItem("book-delete-success");

      toast.success(successMessage, {
        description: "The book has been removed from your collection.",
      });
    }
  }, []);

  const handleDelete = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const toastId = toast.loading("Deleting your book...", {
      description: "Please wait while we remove this book.",
    });

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

      if (!BASE_URL) {
        throw new Error("Server URL is not configured!");
      }

      const response = await fetch(`${BASE_URL}/books/${book._id}`, {
        method: "DELETE",
      });

      const result: {
        message?: string;
        deletedCount?: number;
      } = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Book deletion failed!");
      }

      if (result.deletedCount === 0) {
        throw new Error("Book not found or already deleted!");
      }

      // Dismiss loading toast
      toast.dismiss(toastId);

      // Save success message before reload
      sessionStorage.setItem(
        "book-delete-success",
        "Book deleted successfully!"
      );

      setOpen(false);

      // Reload page
      window.location.reload();

    } catch (error) {
      console.error("Error deleting book:", error);

      toast.error("Failed to delete book!", {
        id: toastId,
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong!",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Delete Button */}
      <DialogTrigger
        render={
          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            aria-label={`Delete ${book.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-white text-red-400 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={15} />
          </motion.button>
        }
      />

      <DialogContent className="w-[calc(100%-24px)] overflow-hidden border border-[#E6EBE3] bg-[#FFFEFA] p-0 text-[#263D2D] shadow-2xl sm:max-w-md [&>button:last-child]:hidden">

        {/* Top Accent */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#244A32] via-[#779B73] to-[#D6E2D1]" />

        <div className="p-5 sm:p-7">

          {/* Header */}
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCEFED] text-[#D16B5C]">
                <Trash2 size={22} />
              </div>

              <DialogClose
                disabled={isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#879184] transition hover:bg-[#EDF3EA] hover:text-[#193C30]"
              >
                <X size={17} />
              </DialogClose>
            </div>

            <div className="text-left">
              <DialogTitle className="text-[19px] font-bold text-[#2D4132]">
                Delete this book?
              </DialogTitle>

              <DialogDescription className="mt-2 text-[12px] leading-6 text-[#929C91]">
                Are you sure you want to remove this book from your
                collection? This action cannot be undone.
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Book Information */}
          <div className="my-6 flex items-center gap-4 rounded-xl border border-[#E8EDE5] bg-[#F7F9F5] p-3">
            <div className="flex h-[76px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E5EAE2] bg-white">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <BookOpen size={24} className="text-[#8CA18A]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[14px] font-bold text-[#344B38]">
                {book.title}
              </h3>

              <p className="mt-1 truncate text-[12px] text-[#849183]">
                By {book.author}
              </p>

              <span className="mt-2 inline-flex rounded-md bg-[#EAF1E7] px-2 py-1 text-[10px] font-semibold text-[#648167]">
                {book.category}
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 rounded-xl border border-[#F2E8D9] bg-[#FCF8F0] p-3.5">
            <AlertTriangle
              size={17}
              className="mt-0.5 shrink-0 text-[#C7954F]"
            />

            <p className="text-[11px] leading-5 text-[#907A5B]">
              Deleting this book will permanently remove its information
              from your collection.
            </p>
          </div>

          {/* Footer */}
          <DialogFooter className="mt-6 flex flex-row gap-2 sm:justify-end">
            <DialogClose
              disabled={isLoading}
              className="h-11 flex-1 rounded-lg border border-[#E2E8DF] bg-white px-5 text-[12px] font-semibold text-[#657763] transition hover:bg-[#F3F6F0] disabled:opacity-50"
            >
              Cancel
            </DialogClose>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#B94D43] px-5 text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(185,77,67,0.15)] transition-all hover:bg-[#A83E35] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={15} />
                  Delete Book
                </>
              )}
            </button>
          </DialogFooter>

          {/* Bottom Note */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-[#8CA18A]" />

            <span className="text-[10px] text-[#9AA598]">
              Please confirm before deleting this entry.
            </span>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBooksDialog;
