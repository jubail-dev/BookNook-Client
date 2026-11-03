
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookItem } from "@/types/book.type";
import { motion } from "framer-motion";
import {
  Pencil,
  BookOpen,
  UserRound,
  Layers3,
  Hash,
  Mail,
  UploadCloud,
  AlignLeft,
  Sparkles,
  X,
  ArrowUpRight,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface EditBooksDialogProps {
  filteredBooks: BookItem[];
  book: BookItem;
}

interface BookFormData {
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  description: string;
  userName: string;
  userEmail: string;
}

const EditBooksDialog = ({ book }: EditBooksDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<BookFormData>({
    title: book.title,
    author: book.author,
    category: book.category,
    totalCopies: Number(book.totalCopies),
    description: book.description,
    userName: book.userName,
    userEmail: book.userEmail,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    book.image || null
  );

  // Show success toast after page reload
  useEffect(() => {
    const successMessage = sessionStorage.getItem(
      "book-update-success"
    );

    if (successMessage) {
      sessionStorage.removeItem("book-update-success");

      toast.success(successMessage, {
        description: "Your book information has been updated.",
      });
    }
  }, []);

  // Reset form when dialog opens
  const handleDialogChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        totalCopies: Number(book.totalCopies),
        description: book.description,
        userName: book.userName,
        userEmail: book.userEmail,
      });

      setImage(null);
      setPreview(book.image || null);
    }

    setOpen(nextOpen);
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "totalCopies" ? Number(value) : value,
    }));
  };

  // Handle image selection
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    if (
      !["image/png", "image/jpeg", "image/webp"].includes(file.type)
    ) {
      toast.error("Please select a PNG, JPG or WEBP image!");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB!");
      e.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLoading) return;

    if (formData.totalCopies < 1) {
      toast.error("Total copies must be at least 1!");
      return;
    }

    setIsLoading(true);

    const toastId = toast.loading("Updating your book...", {
      description: "Please wait while we save your changes.",
    });

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

      if (!BASE_URL) {
        throw new Error("Server URL is not configured!");
      }

      let imageUrl = book.image || "";
      const token = await getTokenFromClient();
      // Step 1: Upload new image if selected
      if (image) {
        const imageData = new FormData();

        imageData.append("image", image);

        const uploadResponse = await fetch(
          `${BASE_URL}/upload`,
          {
            method: "POST",
            headers: {
              "authorization": `Bearer ${token}`
            },
            body: imageData,
          }
        );

        const uploadResult: {
          imageUrl?: string;
          message?: string;
        } = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadResult.imageUrl) {
          throw new Error(
            uploadResult.message || "Image upload failed!"
          );
        }

        imageUrl = uploadResult.imageUrl;
      }

      

      // Step 2: Prepare updated book data
      const updatedBook = {
        ...formData,
        totalCopies: Number(formData.totalCopies),
        image: imageUrl,
      };

      // Step 3: Update MongoDB
      const response = await fetch(
        `${BASE_URL}/books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          },
          body: JSON.stringify(updatedBook),
        }
      );

      const result: {
        message?: string;
        modifiedCount?: number;
        matchedCount?: number;
      } = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Book update failed!"
        );
      }

      if (result.matchedCount === 0) {
        throw new Error("Book not found!");
      }

      // Step 4: Store success message for after page reload
      sessionStorage.setItem(
        "book-update-success",
        "Book updated successfully!"
      );

      // Step 5: Close dialog
      setOpen(false);

      // Step 6: Reload page
      window.location.reload();

    } catch (error) {
      console.error("Error updating book:", error);

      toast.error("Failed to update book!", {
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

  const inputClass =
    "h-[46px] w-full rounded-xl border border-[#E2E8DF] bg-[#FAFBF8] px-4 text-[13px] text-[#263B2E] outline-none transition-all placeholder:text-[#A6AEA5] hover:border-[#B9CBB8] focus:border-[#668B68] focus:bg-white focus:ring-[3px] focus:ring-[#668B68]/10";

  const labelClass =
    "mb-2 block text-[12px] font-semibold text-[#526353]";

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      {/* Edit Button */}
      <DialogTrigger
        render={
          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            aria-label={`Edit ${book.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e6eae2] bg-white text-[#56744e] transition-all hover:border-[#193c30] hover:bg-[#193c30] hover:text-white"
          >
            <Pencil size={15} />
          </motion.button>
        }
      />

      <DialogContent className="w-[calc(100%-24px)] overflow-y-auto border border-[#E6EBE3] bg-[#FFFEFA] p-0 text-[#263D2D] shadow-2xl sm:max-w-5xl max-h-[94vh] [&>button:last-child]:hidden">

        {/* Top Accent */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#244A32] via-[#779B73] to-[#D6E2D1]" />

        <form onSubmit={handleSubmit} className="p-5 sm:p-7 lg:p-8">

          {/* Header */}
          <DialogHeader className="mb-6">
            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDF3EA] text-[#345C3C]">
                  <BookOpen size={21} />
                </div>

                <div className="text-left">
                  <DialogTitle className="text-[18px] font-bold text-[#2D4132]">
                    Edit book information
                  </DialogTitle>

                  <DialogDescription className="mt-1 text-[12px] text-[#929C91]">
                    Update your collection with the latest details
                  </DialogDescription>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-[#E5EAE2] bg-white px-4 py-2.5 sm:flex">
                <Sparkles size={15} className="text-[#739675]" />
                <span className="text-[12px] font-semibold text-[#536957]">
                  Every book has a story
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-b border-[#EEF1EB] pb-5">

              <span className="rounded-md bg-[#F0F5ED] px-3 py-2 text-[10px] font-bold tracking-wider text-[#527858]">
                EDITING ENTRY
              </span>

              <DialogClose
                disabled={isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#879184] transition hover:bg-[#EDF3EA] hover:text-[#193C30]"
              >
                <X size={17} />
              </DialogClose>

            </div>
          </DialogHeader>

          {/* Main Grid */}
          <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[1fr_280px]">

            {/* Left Column */}
            <div className="space-y-6">

              {/* Basic Details */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#628568]" />

                  <h3 className="text-[13px] font-bold uppercase tracking-[1.1px] text-[#455B49]">
                    Basic details
                  </h3>
                </div>

                <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">

                  {/* Title */}
                  <div className="sm:col-span-2">
                    <label htmlFor={`title-${book._id}`} className={labelClass}>
                      Book title <span className="text-red-400">*</span>
                    </label>

                    <div className="relative">
                      <BookOpen
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                      />

                      <input
                        id={`title-${book._id}`}
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. The Alchemist"
                        className={`${inputClass} pl-11`}
                        required
                      />
                    </div>
                  </div>

                  {/* Author */}
                  <div>
                    <label htmlFor={`author-${book._id}`} className={labelClass}>
                      Author name <span className="text-red-400">*</span>
                    </label>

                    <div className="relative">
                      <UserRound
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                      />

                      <input
                        id={`author-${book._id}`}
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Author's full name"
                        className={`${inputClass} pl-11`}
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor={`category-${book._id}`} className={labelClass}>
                      Category <span className="text-red-400">*</span>
                    </label>

                    <div className="relative">
                      <Layers3
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                      />

                      <select
                        id={`category-${book._id}`}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer pl-11`}
                      >
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Biography">Biography</option>
                        <option value="History">History</option>
                      </select>
                    </div>
                  </div>

                  {/* Total Copies */}
                  <div>
                    <label htmlFor={`copies-${book._id}`} className={labelClass}>
                      Total copies <span className="text-red-400">*</span>
                    </label>

                    <div className="relative">
                      <Hash
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                      />

                      <input
                        id={`copies-${book._id}`}
                        type="number"
                        name="totalCopies"
                        min="1"
                        value={formData.totalCopies}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        required
                      />
                    </div>
                  </div>

                </div>
              </section>

              {/* Contributor Details */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#628568]" />

                  <h3 className="text-[13px] font-bold uppercase tracking-[1.1px] text-[#455B49]">
                    Contributor details
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* User Name */}
                  <div>
                    <label htmlFor={`userName-${book._id}`} className={labelClass}>
                      Your name
                    </label>

                    <div className="relative">
                      <UserRound
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                      />

                      <input
                        id={`userName-${book._id}`}
                        name="userName"
                        value={formData.userName}
                        readOnly
                        className={`${inputClass} cursor-not-allowed bg-[#F3F5F0] pl-11 text-[#738170]`}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor={`userEmail-${book._id}`} className={labelClass}>
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                      />

                      <input
                        id={`userEmail-${book._id}`}
                        name="userEmail"
                        type="email"
                        value={formData.userEmail}
                        readOnly
                        className={`${inputClass} cursor-not-allowed bg-[#F3F5F0] pl-11 text-[#738170]`}
                      />
                    </div>
                  </div>

                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-5">

              {/* Book Cover */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#628568]" />

                  <h3 className="text-[13px] font-bold uppercase tracking-[1.1px] text-[#455B49]">
                    Book cover
                  </h3>
                </div>

                <label
                  htmlFor={`image-${book._id}`}
                  className="group relative flex h-[180px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#C9D6C7] bg-[#F7F9F5] transition-all duration-300 hover:border-[#739675] hover:bg-[#EFF5EC]"
                >
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt={book.title}
                        className="h-full w-full object-contain p-2"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-[#203A29]/0 opacity-0 transition-all duration-300 group-hover:bg-[#203A29]/45 group-hover:opacity-100">
                        <span className="rounded-lg bg-white px-4 py-2.5 text-[12px] font-bold text-[#34543A]">
                          Change cover
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#64866A] shadow-sm">
                        <UploadCloud size={23} />
                      </div>

                      <p className="text-[13px] font-bold text-[#455C48]">
                        Upload book cover
                      </p>

                      <p className="mt-1 text-[11px] text-[#9AA699]">
                        PNG, JPG or WEBP
                      </p>
                    </>
                  )}

                  <input
                    id={`image-${book._id}`}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {image && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="max-w-[190px] truncate text-[10px] text-[#829184]">
                      {image.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreview(book.image || null);
                      }}
                      className="flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:text-red-700"
                    >
                      <X size={13} />
                      Undo
                    </button>
                  </div>
                )}
              </section>

              {/* Description */}
              <section>
                <label
                  htmlFor={`description-${book._id}`}
                  className={`${labelClass} flex items-center gap-2`}
                >
                  <AlignLeft size={15} />
                  Short description
                </label>

                <textarea
                  id={`description-${book._id}`}
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell readers a little about this book..."
                  className="min-h-[125px] w-full resize-none rounded-xl border border-[#E7EBE5] bg-[#FAFBF9] px-4 py-3.5 text-[13px] leading-6 text-[#263B2E] outline-none transition-all placeholder:text-[#A6AEA5] focus:border-[#527B59] focus:bg-white focus:ring-[3px] focus:ring-[#527B59]/10"
                />

                <p className="mt-1.5 text-right text-[11px] italic text-[#A3ACA1]">
                  Make every story worth discovering.
                </p>
              </section>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-7 flex flex-col-reverse items-center justify-between gap-4 border-t border-[#EDF0EA] pt-5 sm:flex-row">

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#719477]" />

              <span className="text-[12px] text-[#8A9689]">
                Your book details are ready to be updated.
              </span>
            </div>

            <div className="flex w-full items-center gap-2 sm:w-auto">

              <DialogClose
                disabled={isLoading}
                className="h-11 flex-1 rounded-lg border border-[#E2E8DF] bg-white px-5 text-[12px] font-semibold text-[#657763] transition hover:bg-[#F3F6F0] disabled:opacity-50 sm:flex-none"
              >
                Cancel
              </DialogClose>

              <button
                type="submit"
                disabled={isLoading}
                className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#294D36] px-6 text-[12px] font-bold tracking-wide text-white shadow-[0_4px_12px_rgba(41,77,54,0.13)] transition-all hover:bg-[#203F2C] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Save Changes
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>

            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBooksDialog;
