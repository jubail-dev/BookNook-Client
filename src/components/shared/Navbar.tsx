
"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  PlusCircle,
  Bookmark,
  Repeat,
  UserRound,
  UserPlus,
  Menu,
  X,
} from "lucide-react";

const NavbarContent = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Books", href: "/books", icon: BookOpen },
    { name: "Add Book", href: "/books/add", icon: PlusCircle },
    { name: "My Books", href: "/my-books", icon: Bookmark },
    { name: "My Borrows", href: "/my-borrows", icon: Repeat },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return (
      pathname === href ||
      (pathname.startsWith(`${href}/`) && href !== "/books")
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-rose-200/40 bg-gradient-to-r from-[#FFF6F7] via-white to-[#FFF6F7]/90 backdrop-blur-md shadow-lg transition-all duration-300">

      {/* Background Accent Glow */}
      <div className="absolute inset-x-0 -top-10 -z-10 mx-auto h-24 w-3/4 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-3 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-zinc-950 shadow-lg shadow-amber-500/25 transition-transform duration-300 group-hover:scale-105">
            <BookOpen size={24} strokeWidth={2.5} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-zinc-900">
            Book
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
              Nook
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-amber-400 text-zinc-950 font-semibold shadow-md shadow-amber-500/20"
                    : "text-zinc-700 hover:bg-rose-100/50 hover:text-amber-600"
                }`}
              >
                <Icon size={18} />
                {link.name}

                {active && (
                  <span className="absolute -bottom-3 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-amber-500 shadow-[0_0_12px_#f59e0b]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Authentication Buttons */}
        <div className="hidden items-center gap-3 border-l border-zinc-300 pl-6 lg:flex">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white/80 px-5 py-2 text-sm font-semibold text-zinc-700 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600"
          >
            <UserRound size={17} />
            Login
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:brightness-110 hover:shadow-amber-500/30"
          >
            <UserPlus size={17} />
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white/80 text-zinc-700 transition hover:border-amber-400 hover:text-amber-600 lg:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-rose-200/50 bg-[#FFF6F7]/95 px-5 py-5 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-amber-400 text-zinc-950 font-semibold"
                      : "text-zinc-700 hover:bg-rose-100/60 hover:text-amber-600"
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Authentication */}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-zinc-300 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white/80 py-2.5 text-sm font-semibold text-zinc-700 hover:border-amber-400 hover:text-amber-600"
              >
                <UserRound size={17} />
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-amber-400 py-2.5 text-sm font-bold text-zinc-950 hover:bg-amber-300"
              >
                <UserPlus size={17} />
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Navbar = () => {
  return (
    <Suspense
      fallback={
        <nav className="sticky top-0 z-50 h-[68px] w-full border-b border-rose-200/40 bg-white/95 shadow-sm" />
      }
    >
      <NavbarContent />
    </Suspense>
  );
};

export default Navbar;
