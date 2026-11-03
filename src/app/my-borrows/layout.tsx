import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Borrow Books",
};

export default function MyBorrowsLayout({
  children,
}: LayoutProps<"/my-borrows">) {
  return <>{children}</>;
}
