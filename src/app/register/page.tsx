
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

interface FormData {
  name: string;
  email: string;
  photoURL: string;
  password: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { data: resData, error } = await signUp.email({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    image: formData.photoURL || undefined,
  });

  if (error) {
    toast.error(error.message || "Registration failed!");
    return;
  }

  if (resData?.user) {
    toast.success("Successfully registered! Please login.");

    router.push("/login");
    router.refresh();
  }
};

 const handleGoogleSignIn = async () =>{
    const data = await signIn.social({
      provider: "google"
    })
    console.log(data);
  }

  const handleGithubSignIn = async () =>{
    const data = await signIn.social({
      provider: "github"
    })
    console.log(data);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f7f3] p-3 sm:p-5 lg:flex lg:min-h-screen lg:items-center lg:justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid w-full max-w-[1150px] overflow-hidden rounded-[28px] border border-[#ebe7dd] bg-white shadow-[0_25px_80px_rgba(40,35,20,0.09)] lg:min-h-[680px] lg:grid-cols-[0.88fr_1.12fr]"
      >
        {/* LEFT BRAND SECTION */}

        <section className="relative hidden overflow-hidden bg-[#282d25] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#d6a64a]/10 blur-3xl" />

          {/* Brand */}

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8ad38] text-[#282d25]">
                <BookOpen size={25} />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Book<span className="text-[#e8ad38]">Nook</span>
              </span>
            </Link>

            <div className="mt-20">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-bold tracking-[2px] text-[#e8bd6c]">
                <Sparkles size={13} />
                A WORLD OF STORIES
              </div>

              <h1 className="max-w-md text-5xl font-bold leading-[1.15] tracking-tight xl:text-[54px]">
                Your next
                <br />
                adventure
                <br />
                <span className="font-serif italic font-normal text-[#e8ad38]">
                  begins here.
                </span>
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
                Discover amazing stories, explore new ideas, and build your
                own personal reading world with BookNook.
              </p>
            </div>
          </div>

          {/* Book Illustration */}

          <motion.div
            initial={{ opacity: 0, y: 25, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 flex h-44 items-center justify-center"
          >
            <div className="absolute h-44 w-44 rounded-full border border-[#e8ad38]/20" />
            <div className="absolute h-36 w-36 rounded-full bg-[#e8ad38]/10 blur-2xl" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative flex items-end gap-1"
            >
              <div className="flex h-32 w-[68px] -rotate-12 flex-col items-center justify-between rounded-md bg-[#49614a] p-3 shadow-xl">
                <span className="text-[8px] tracking-widest text-white">
                  CLASSIC
                </span>
                <BookOpen size={25} className="text-[#f1d9a4]" />
                <span className="text-[8px] text-white">STORIES</span>
              </div>

              <div className="z-10 flex h-40 w-[78px] flex-col items-center justify-between rounded-md bg-[#d19a45] p-3 shadow-2xl">
                <span className="text-[8px] tracking-widest text-white">
                  THE ART OF
                </span>
                <span className="text-center font-serif text-xl font-bold leading-tight text-white">
                  READ
                  <br />
                  MORE
                </span>
                <span className="text-[8px] tracking-widest text-white">
                  CHAPTER 01
                </span>
              </div>

              <div className="flex h-28 w-[65px] rotate-12 flex-col items-center justify-between rounded-md bg-[#925e49] p-3 shadow-xl">
                <span className="text-[8px] text-white">EXPLORE</span>
                <Sparkles size={24} className="text-[#f5dfb5]" />
                <span className="text-[8px] text-white">IMAGINE</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom */}

          <div className="relative z-10 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 text-sm text-white/65">
              <CheckCircle2 size={17} className="text-[#e8ad38]" />
              Discover. Read. Explore. Repeat.
            </div>

            <p className="mt-5 text-xs text-white/30">
              © 2026 BookNook. Made for the love of reading.
            </p>
          </div>
        </section>

        {/* RIGHT SIGNUP SECTION */}

        <section className="flex items-center justify-center px-5 py-8 sm:px-10 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-[430px]"
          >
            {/* Mobile Brand */}

            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8ad38] text-white">
                <BookOpen size={22} />
              </div>

              <span className="text-xl font-extrabold text-[#292b25]">
                Book<span className="text-[#d69a15]">Nook</span>
              </span>
            </Link>

            {/* Heading */}

            <div className="mb-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff4dc] text-[#d69a15]">
                <UserRound size={22} />
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#292b25]">
                Create account
              </h2>

              <p className="mt-2 text-sm text-[#969185]">
                Start your reading journey with us today.
              </p>
            </div>

            {/* Social Login */}

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleGoogleSignIn}
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-[#e9e5dc] text-sm font-semibold text-[#39352d] hover:bg-[#faf8f2]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google
              </Button>

              <Button
                onClick={handleGithubSignIn}
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-[#e9e5dc] text-sm font-semibold text-[#39352d] hover:bg-[#faf8f2]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </Button>
            </div>

            {/* Divider */}

            <div className="relative my-5 flex items-center">
              <div className="h-px w-full bg-[#eeeae2]" />
              <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 text-[10px] font-semibold uppercase tracking-widest text-[#aaa397]">
                Or continue with email
              </span>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name */}

              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-[#49453c]"
                >
                  Full name
                </label>

                <div className="group relative">
                  <UserRound
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa397] group-focus-within:text-[#d69a15]"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="h-11 w-full rounded-xl border border-[#e9e5dc] bg-[#fdfcf9] pl-10 pr-4 text-sm text-[#39352d] outline-none transition-all placeholder:text-[#b3ada2] focus:border-[#e3a923] focus:bg-white focus:ring-4 focus:ring-[#e3a923]/10"
                  />
                </div>
              </div>

              {/* Email */}

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-[#49453c]"
                >
                  Email address
                </label>

                <div className="group relative">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa397] group-focus-within:text-[#d69a15]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="h-11 w-full rounded-xl border border-[#e9e5dc] bg-[#fdfcf9] pl-10 pr-4 text-sm text-[#39352d] outline-none transition-all placeholder:text-[#b3ada2] focus:border-[#e3a923] focus:bg-white focus:ring-4 focus:ring-[#e3a923]/10"
                  />
                </div>
              </div>

              {/* Photo URL */}

              <div className="space-y-1.5">
                <label
                  htmlFor="photoURL"
                  className="flex items-center gap-2 text-xs font-semibold text-[#49453c]"
                >
                  Profile photo URL
                  <span className="font-normal text-[#aaa397]">
                    (Optional)
                  </span>
                </label>

                <div className="group relative">
                  <ImageIcon
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa397] group-focus-within:text-[#d69a15]"
                  />

                  <input
                    id="photoURL"
                    name="photoURL"
                    type="url"
                    value={formData.photoURL}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="h-11 w-full rounded-xl border border-[#e9e5dc] bg-[#fdfcf9] pl-10 pr-4 text-sm text-[#39352d] outline-none transition-all placeholder:text-[#b3ada2] focus:border-[#e3a923] focus:bg-white focus:ring-4 focus:ring-[#e3a923]/10"
                  />
                </div>
              </div>

              {/* Password */}

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#49453c]"
                >
                  Password
                </label>

                <div className="group relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa397] group-focus-within:text-[#d69a15]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="h-11 w-full rounded-xl border border-[#e9e5dc] bg-[#fdfcf9] pl-10 pr-11 text-sm text-[#39352d] outline-none transition-all placeholder:text-[#b3ada2] focus:border-[#e3a923] focus:bg-white focus:ring-4 focus:ring-[#e3a923]/10"
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#aaa397] transition-colors hover:text-[#d69a15]"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                <p className="text-[10px] text-[#aaa397]">
                  Use at least 8 characters for your password.
                </p>
              </div>

              {/* Submit */}

              <Button
                type="submit"
                className="group mt-2 h-12 w-full rounded-xl bg-[#e8a817] text-sm font-bold text-white shadow-lg shadow-[#e8a817]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d69a15] hover:shadow-xl"
              >
                Create Account
                <ArrowRight
                  size={17}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </form>

            {/* Footer */}

            <div className="mt-5 border-t border-[#eeeae2] pt-4 text-center">
              <p className="text-xs text-[#898276]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#c28a16] hover:text-[#a8740e]"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-4 text-[10px] leading-5 text-[#aaa397]">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="font-semibold underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-semibold underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </main>
  );
};

export default SignUpPage;
