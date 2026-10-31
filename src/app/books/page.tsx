
import BookCard from "@/components/shared/BookCard";
import { BookItem } from "@/types/book.type";

const AllBooksPage = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/books`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const books: BookItem[] = await response.json();

  return (
    <section className="relative overflow-hidden bg-[#fffdfc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="relative mx-auto max-w-[1440px]">

        <div className="mb-14">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-rose-500">
            Explore Our Collection
          </p>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-[64px]">
            Discover All
            <span className="block font-serif font-medium italic text-rose-500">
              Books.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
            Explore books shared by our reading community and find your next
            favorite read.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {books.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold text-slate-800">
              No Books Found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              No books have been added yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default AllBooksPage;
