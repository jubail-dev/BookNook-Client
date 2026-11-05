
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  LogOut,
  ChevronDown,
  Library,
  Loader2,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = useSession();

  const user = session?.user;
  const isLoggedIn = !!user;

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation Links
  const navLinks = [
    { name: "Home", href: "/", icon: Home, public: true },
    { name: "All Books", href: "/books", icon: BookOpen, public: true },
    { name: "Add Book", href: "/books/add", icon: PlusCircle, public: false },
    { name: "My Books", href: "/my-books", icon: Bookmark, public: false },
    { name: "My Borrows", href: "/my-borrows", icon: Repeat, public: false },
  ];

  // Filter Navigation Links
  const visibleLinks = navLinks.filter(
    (link) => link.public || (isLoggedIn && !isPending),
  );

  // Active Route
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return (
      pathname === href ||
      (pathname.startsWith(`${href}/`) && href !== "/books")
    );
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  // Sign Out Handler
  const handleSignOut = async () => {
  try {
    setIsSigningOut(true);

    await signOut();

    toast.success("Logged out successfully!", {
      description: "See you again soon. Happy reading!",
      duration: 3000,
    });

    setProfileOpen(false);
    setMobileMenuOpen(false);

    router.push("/login");
    router.refresh();
  } catch (error) {
    console.error("Sign out failed:", error);

    toast.error("Logout failed!", {
      description: "Something went wrong. Please try again.",
      duration: 3000,
    });
  } finally {
    setIsSigningOut(false);
  }
};

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-rose-100/80 bg-white/85 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-2xl transition-all duration-300">
      {/* Background Gradient Glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-12 -z-10 mx-auto h-28 w-2/3 rounded-full bg-gradient-to-r from-amber-400/20 via-rose-300/20 to-amber-400/20 blur-3xl" />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8 lg:px-10">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group relative flex shrink-0 items-center gap-3 transition-all duration-300 active:scale-95"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-zinc-950 shadow-lg shadow-amber-500/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 group-hover:shadow-amber-500/35">
            <BookOpen
              size={22}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500" />
            </span>
          </div>

          <span className="text-2xl font-black tracking-tight text-zinc-900">
            Book
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Nook
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1.5 rounded-2xl border border-zinc-200/50 bg-zinc-50/60 p-1.5 backdrop-blur-sm lg:flex">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                    : "text-zinc-600 hover:bg-rose-100/50 hover:text-amber-700"
                }`}
              >
                <Icon
                  size={17}
                  className={`transition-transform duration-300 ${
                    active ? "scale-110" : ""
                  }`}
                />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Authentication Section */}
        <div className="hidden items-center gap-3 lg:flex">
          {isPending ? (
            // Small Auth Loading Placeholder
            <div className="h-10 w-28 animate-pulse rounded-xl bg-zinc-100" />
          ) : !isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/80 px-5 py-2.5 text-sm font-bold text-zinc-700 shadow-sm transition-all duration-300 hover:border-amber-400 hover:bg-amber-50/50 hover:text-amber-600 active:scale-95"
              >
                <UserRound size={17} />
                Login
              </Link>

              <Link
                href="/register"
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-5 py-2.5 text-sm font-extrabold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:brightness-105 hover:shadow-amber-500/35 active:scale-95"
              >
                <UserPlus
                  size={17}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
                Register
              </Link>
            </div>
          ) : (
            // User Profile Dropdown
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className={`group flex items-center gap-3 rounded-full border p-1.5 pr-3 transition-all duration-300 ${
                  profileOpen
                    ? "border-amber-400 bg-amber-50/80 shadow-md shadow-amber-500/10"
                    : "border-zinc-200/80 bg-white/80 hover:border-amber-400 hover:bg-amber-50/40 hover:shadow-md"
                }`}
              >
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-amber-400 bg-gradient-to-br from-amber-300 to-amber-500 font-bold text-zinc-950 shadow-inner">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    userInitial
                  )}
                </div>

                <div className="hidden text-left xl:block">
                  <p className="max-w-[110px] truncate text-xs font-bold text-zinc-900">
                    {user?.name || "User"}
                  </p>

                  <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Active Member
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className={`text-zinc-500 transition-transform duration-300 ${
                    profileOpen ? "rotate-180 text-amber-600" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-[60] w-72 origin-top-right overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-2xl shadow-zinc-900/10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="border-b border-zinc-100 bg-gradient-to-br from-amber-100/60 via-amber-50/30 to-rose-50/40 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-400 bg-amber-200 font-extrabold text-zinc-900 shadow-sm">
                        {user?.image ? (
                          <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          userInitial
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-black text-zinc-900">
                          {user?.name || "User"}
                        </h3>

                        <p className="truncate text-xs font-medium text-zinc-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-zinc-700 transition-all hover:bg-amber-50 hover:text-amber-600"
                    >
                      <UserRound size={18} className="text-amber-500" />
                      My Profile
                    </Link>

                    <Link
                      href="/my-books"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-zinc-700 transition-all hover:bg-amber-50 hover:text-amber-600"
                    >
                      <Library size={18} className="text-amber-500" />
                      My Library
                    </Link>

                    <div className="my-1 border-t border-zinc-100" />

                    <button
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSigningOut ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <LogOut size={18} />
                      )}

                      {isSigningOut ? "Signing Out..." : "Sign Out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:border-amber-400 hover:text-amber-600 active:scale-95 lg:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-rose-100 bg-white/95 px-5 py-6 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300 lg:hidden">
          <div className="flex flex-col gap-2">
            {visibleLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                    active
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                      : "text-zinc-700 hover:bg-rose-50 hover:text-amber-600"
                  }`}
                >
                  <Icon size={19} />
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Authentication */}
            {isPending ? (
              <div className="mt-4 flex justify-center border-t border-zinc-100 pt-4">
                <Loader2 className="animate-spin text-amber-500" size={22} />
              </div>
            ) : !isLoggedIn ? (
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white py-3 text-sm font-bold text-zinc-700 shadow-sm hover:border-amber-400 hover:text-amber-600 active:scale-95"
                >
                  <UserRound size={17} />
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-extrabold text-zinc-950 shadow-md shadow-amber-500/20 hover:brightness-105 active:scale-95"
                >
                  <UserPlus size={17} />
                  Register
                </Link>
              </div>
            ) : (
              <div className="mt-4 border-t border-zinc-100 pt-4">
                <div className="mb-3 flex items-center gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/40 p-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-amber-400 bg-amber-200 font-extrabold text-zinc-900">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      userInitial
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-zinc-900">
                      {user?.name || "User"}
                    </p>

                    <p className="truncate text-xs font-medium text-zinc-500">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-amber-50 hover:text-amber-600"
                >
                  <UserRound size={18} className="text-amber-500" />
                  My Profile
                </Link>

                <Link
                  href="/my-books"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-amber-50 hover:text-amber-600"
                >
                  <Library size={18} className="text-amber-500" />
                  My Library
                </Link>

                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
                >
                  {isSigningOut ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <LogOut size={18} />
                  )}

                  {isSigningOut ? "Signing Out..." : "Sign Out"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
