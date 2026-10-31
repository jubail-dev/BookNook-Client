"use client";

import React, { useState } from "react";
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

const Navbar = () => {
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
    // Fixed: exact match or strict sub-path check without overlapping parent routes like /books vs /books/add
    return pathname === href || (pathname.startsWith(`${href}/`) && href !== "/books");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-amber-500/25 bg-zinc-950 text-white shadow-xl shadow-black/20">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-3 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20">
            <BookOpen size={26} strokeWidth={2.5} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight">
            Book<span className="text-amber-400">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-amber-400 text-zinc-950"
                    : "text-zinc-300 hover:bg-white/5 hover:text-amber-400"
                }`}
              >
                <Icon size={17} />
                {link.name}

                {active && (
                  <span className="absolute -bottom-3 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Authentication Buttons (Temporary) */}
        <div className="hidden items-center gap-3 border-l border-zinc-700 pl-6 lg:flex">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full border border-zinc-600 px-5 py-2.5 text-sm font-semibold transition-all hover:border-amber-400 hover:bg-amber-400/10 hover:text-amber-400"
          >
            <UserRound size={17} />
            Login
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-300"
          >
            <UserPlus size={17} />
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 text-white transition hover:border-amber-400 hover:text-amber-400 lg:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-amber-400 text-zinc-950"
                      : "text-zinc-300 hover:bg-white/5 hover:text-amber-400"
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-zinc-800 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-600 py-3 text-sm font-semibold hover:border-amber-400 hover:text-amber-400"
              >
                <UserRound size={17} />
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-amber-400 py-3 text-sm font-bold text-zinc-950 hover:bg-amber-300"
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

export default Navbar;