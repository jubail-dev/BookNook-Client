
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  UserRound,
  Mail,
  Layers3,
  AlignLeft,
  ArrowUpRight,
  Hash,
  Plus,
  X,
  UploadCloud,
  Library,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Books",
};

const BookAddPage = () => {
  const router = useRouter();

  const {data:session, isPending} = useSession()


  const [isLoading, setIsLoading] = useState(false);

  const [bookFormData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    totalCopies: 1,
    image: null as File | null,
    description: "",
    userName: "",
    userEmail: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (e.target instanceof HTMLInputElement && type === "file") {
      const file = e.target.files?.[0] ?? null;

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      setPreview(file ? URL.createObjectURL(file) : null);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const toastId = toast.loading("Adding your book...", {
      description: "Please wait while we save your book.",
    });

    const formData = new FormData(e.currentTarget);

    try {
      let imageUrl = "";

      // Step 1: Upload book cover
      if (bookFormData.image) {
        const imageData = new FormData();

        imageData.append("image", bookFormData.image);

        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(
            uploadResult.message || "Image upload failed"
          );
        }

        imageUrl = uploadResult.imageUrl;
      }

      // Step 2: Prepare book data
      const bookData = Object.fromEntries(formData.entries());

      bookData.image = imageUrl;

      // Step 3: Save book to MongoDB
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Book creation failed"
        );
      }

      console.log("Book added successfully:", result);

      // Step 4: Show success toast
      toast.success("Book added successfully!", {
        id: toastId,
        description: "Your new book is now available in the library.",
      });

      // Step 5: Redirect to My Books
      router.push("/my-books");
    } catch (error) {
      console.error("Error adding book:", error);

      toast.error("Failed to add book!", {
        id: toastId,
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong!",
      });

      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full h-[46px] rounded-lg border border-[#E7EBE5] bg-[#FAFBF9] px-4 text-[14px] font-medium text-[#263B2E] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#A6AEA5] hover:border-[#B9CBB8] focus:border-[#527B59] focus:bg-white focus:ring-[3px] focus:ring-[#527B59]/10";

  const labelClass =
    "mb-2 block text-[13px] font-semibold tracking-wide text-[#536456]";

  return (
    <main className="min-h-screen bg-[#F6F8F4] px-4 py-5 sm:px-7 lg:px-10 lg:py-7">
      <div className="book-page-enter mx-auto max-w-[1050px]">

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[1.5px] text-[#829184]">
              <Library size={14} />
              LIBRARY
              <span className="text-[#C4CDC3]">/</span>
              <span className="text-[#527B59]">ADD BOOK</span>
            </div>

            <h1 className="text-[34px] font-bold tracking-tight text-[#253A2C] sm:text-[38px]">
              Add a new book<span className="text-[#739675]">.</span>
            </h1>

            <p className="mt-1.5 text-[14px] text-[#879287]">
              Expand your collection with another great story.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-[#E5EAE2] bg-white px-4 py-2.5 sm:flex">
            <Sparkles size={16} className="text-[#739675]" />
            <span className="text-[13px] font-semibold text-[#536957]">
              Every book has a story
            </span>
          </div>
        </div>

        {/* Main Form */}
        <div className="overflow-hidden rounded-[18px] border border-[#E6EBE3] bg-white shadow-[0_12px_40px_rgba(36,57,39,0.045)]">

          {/* Top Accent */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#244A32] via-[#779B73] to-[#D6E2D1]" />

          <form onSubmit={handleSubmit} className="p-5 sm:p-7 lg:p-8">

            {/* Form Heading */}
            <div className="mb-6 flex items-center justify-between border-b border-[#EEF1EB] pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDF3EA] text-[#345C3C]">
                  <BookOpen size={21} />
                </div>

                <div>
                  <h2 className="text-[17px] font-bold text-[#2D4132]">
                    Book information
                  </h2>
                  <p className="mt-0.5 text-[12px] text-[#929C91]">
                    Complete the details to list your book
                  </p>
                </div>
              </div>

              <span className="rounded-md bg-[#F0F5ED] px-3 py-2 text-[11px] font-bold tracking-wider text-[#527858]">
                NEW ENTRY
              </span>
            </div>

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

                    {/* Book Title */}
                    <div className="field-animate sm:col-span-2">
                      <label className={labelClass}>
                        Book title <span className="text-red-400">*</span>
                      </label>

                      <div className="relative">
                        <BookOpen
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                        />

                        <input
                          type="text"
                          name="title"
                          value={bookFormData.title}
                          onChange={handleChange}
                          placeholder="e.g. The Alchemist"
                          className={`${inputClass} pl-11`}
                          required
                        />
                      </div>
                    </div>

                    {/* Author */}
                    <div className="field-animate">
                      <label className={labelClass}>
                        Author name <span className="text-red-400">*</span>
                      </label>

                      <div className="relative">
                        <UserRound
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                        />

                        <input
                          type="text"
                          name="author"
                          value={bookFormData.author}
                          onChange={handleChange}
                          placeholder="Author's full name"
                          className={`${inputClass} pl-11`}
                          required
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div className="field-animate">
                      <label className={labelClass}>
                        Category <span className="text-red-400">*</span>
                      </label>

                      <div className="relative">
                        <Layers3
                          size={17}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                        />

                        <select
                          name="category"
                          value={bookFormData.category}
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
                    <div className="field-animate">
                      <label className={labelClass}>
                        Total copies <span className="text-red-400">*</span>
                      </label>

                      <div className="relative">
                        <Hash
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                        />

                        <input
                          type="number"
                          name="totalCopies"
                          min="1"
                          value={bookFormData.totalCopies}
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
                      <label className={labelClass}>
                        Your name <span className="text-red-400">*</span>
                      </label>

                      <div className="relative">
                        <UserRound
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                        />

                        <input
                          type="text"
                          name="userName"
                          defaultValue={session?.user?.name}
                          readOnly
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`${inputClass} pl-11`}
                          required
                        />
                      </div>
                    </div>

                    {/* User Email */}
                    <div>
                      <label className={labelClass}>
                        Email address <span className="text-red-400">*</span>
                      </label>

                      <div className="relative">
                        <Mail
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A091]"
                        />

                        <input
                          type="email"
                          name="userEmail"
                          defaultValue={session?.user?.email}
                          readOnly
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={`${inputClass} pl-11`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-5">

                {/* Cover Upload */}
                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#628568]" />
                    <h3 className="text-[13px] font-bold uppercase tracking-[1.1px] text-[#455B49]">
                      Book cover
                    </h3>
                  </div>

                  <label className="cover-float group relative flex h-[180px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#C9D6C7] bg-[#F7F9F5] transition-all duration-300 hover:border-[#739675] hover:bg-[#EFF5EC]">

                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Book cover preview"
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
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#64866A] shadow-[0_3px_12px_rgba(50,75,50,0.07)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
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
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>

                  {preview && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setFormData((prev) => ({
                          ...prev,
                          image: null,
                        }));
                      }}
                      className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-red-500 transition-colors hover:text-red-700"
                    >
                      <X size={14} />
                      Remove cover
                    </button>
                  )}
                </section>

                {/* Description */}
                <section>
                  <label className={`${labelClass} flex items-center gap-2`}>
                    <AlignLeft size={15} />
                    Short description
                  </label>

                  <textarea
                    name="description"
                    rows={5}
                    value={bookFormData.description}
                    onChange={handleChange}
                    placeholder="Tell readers a little about this book..."
                    className="min-h-[125px] w-full resize-none rounded-lg border border-[#E7EBE5] bg-[#FAFBF9] px-4 py-3.5 text-[13px] leading-6 text-[#263B2E] outline-none transition-all duration-200 placeholder:text-[#A6AEA5] hover:border-[#B9CBB8] focus:border-[#527B59] focus:bg-white focus:ring-[3px] focus:ring-[#527B59]/10"
                  />

                  <p className="mt-1.5 text-right text-[11px] text-[#A3ACA1]">
                    Make every story worth discovering.
                  </p>
                </section>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-7 flex flex-col-reverse items-center justify-between gap-4 border-t border-[#EDF0EA] pt-5 sm:flex-row">

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#719477}" />

                <span className="text-[12px] text-[#8A9689]">
                  Your book details are ready to be added.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#294D36] px-7 py-3.5 text-[13px] font-bold tracking-wide text-white shadow-[0_4px_12px_rgba(41,77,54,0.13)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#203F2C] hover:shadow-[0_8px_18px_rgba(41,77,54,0.2)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:translate-y-0 sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="h-[17px] w-[17px] animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>

                    Adding book...
                  </>
                ) : (
                  <>
                    <Plus size={17} />

                    Add book to library

                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 px-1">
          <p className="text-[11px] font-medium text-[#9AA497]">
            BookNook Library
          </p>

          <p className="text-[11px] text-[#9AA497]">
            Made for readers, built around stories.
          </p>
        </div>
      </div>
    </main>
  );
};

export default BookAddPage;
