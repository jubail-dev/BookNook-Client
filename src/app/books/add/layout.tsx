import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Books",
};

export default function AddBooksLayout({ children }: LayoutProps<"/books/add">) {
  return <>{children}</>;
}
