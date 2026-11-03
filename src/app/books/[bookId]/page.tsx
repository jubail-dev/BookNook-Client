
import { Suspense } from "react";
import type { Metadata } from "next";
import BookDetailsClient from "@/components/shared/BookDetailsClient";
import { BookItem } from "@/types/book.type";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Book Details",
};


const BookDetailsContent = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;

  const jwtToken = await auth.api.getToken({
    headers: await headers()
  })

  console.log(jwtToken?.token);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/books/${bookId}`,
    { 
      headers:{
        authorization: `Bearer ${jwtToken?.token}`
      },
      cache: "no-store" 
    }
  );

  if (!response.ok) {
    return (
      <main className="min-h-screen bg-[#F7F8F5] flex items-center justify-center px-6">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-[#234B38] mb-5" />

          <h1 className="text-3xl font-semibold text-[#172D23]">
            Book Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            The book you are looking for does not exist.
          </p>

          <Link
            href="/books"
            className="inline-flex mt-7 bg-[#234B38] text-white px-6 py-3 rounded-xl hover:bg-[#315E46] transition"
          >
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  const bookData: BookItem = await response.json();

  return <BookDetailsClient bookData={bookData} />;
};

const BookDetailsPage = ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F7F8F5] flex items-center justify-center">
          <div className="text-center">
            <BookOpen
              size={40}
              className="mx-auto text-[#234B38] mb-4 animate-pulse"
            />

            <p className="text-sm font-medium text-[#607365]">
              Loading book details...
            </p>
          </div>
        </main>
      }
    >
      <BookDetailsContent params={params} />
    </Suspense>
  );
};

export default BookDetailsPage;
