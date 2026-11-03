import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | BookNook",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}