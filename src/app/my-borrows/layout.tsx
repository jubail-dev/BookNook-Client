import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyBorrows | BookNook",
};

export default function MyBorrowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}