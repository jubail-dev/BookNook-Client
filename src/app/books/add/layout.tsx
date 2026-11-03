import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Books | BookNook",
};

export default function AddBooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}