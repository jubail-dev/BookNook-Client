"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: "Facebook",
      href: "YOUR_FACEBOOK_URL",
      icon: "facebook",
    },
    {
      name: "GitHub",
      href: "https://github.com/jubail-dev",
      icon: "github",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jubail-dev",
      icon: "linkedin",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/all-books" },
    { name: "My Books", href: "/my-books" },
    { name: "Add Book", href: "/add-book" },
  ];

  return (
    <footer className="relative overflow-hidden border-t-2 border-[#b99a68] bg-[#eae4d8] text-[#263d30]">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#c9b99c]/50" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#c9b99c]/50" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-white/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-7 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 border-b border-[#cfc3ae] pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#294333] text-[#f7f5ef] shadow-lg shadow-[#294333]/10 transition-transform duration-300 group-hover:-rotate-6">
                <BookOpen size={23} strokeWidth={1.7} />
              </span>

              <span className="text-2xl font-bold tracking-tight text-[#263d30]">
                Book<span className="text-[#ad8950]">Nook.</span>
              </span>
            </Link>

            <h2 className="mt-8 max-w-md font-serif text-4xl leading-[1.15] tracking-tight text-[#263d30] sm:text-5xl">
              Every book opens
              <br />
              <span className="italic text-[#ad8950]">a new world.</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#77766d]">
              Discover stories, share knowledge, and connect with a community
              that believes every book has something beautiful to offer.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d1c5b1] bg-[#f7f5ef] text-[#405746] transition-all duration-300 hover:border-[#294333] hover:bg-[#294333] hover:text-white"
                >
                  {social.icon === "facebook" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.3v2.3H7.5V13h2.8v8h3.2Z" />
                    </svg>
                  )}

                  {social.icon === "github" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[19px] w-[19px]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.31-3.75-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.74 2.37 3.2 1.68.1-.73.39-1.23.7-1.52-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.67.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.6 5.23-5.09 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
                    </svg>
                  )}

                  {social.icon === "linkedin" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M5.2 3.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM3.7 8.5h3v11.8h-3V8.5Zm4.9 0h2.9v1.6h.04c.4-.76 1.38-1.96 3.36-1.96 3.6 0 4.27 2.37 4.27 5.45v6.7h-3.02v-5.94c0-1.42-.03-3.24-1.97-3.24-1.97 0-2.27 1.54-2.27 3.14v6.04H8.6V8.5Z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="mb-7 flex items-center gap-2">
              <span className="h-px w-7 bg-[#ad8950]" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ad8950]">
                Explore
              </h3>
            </div>

            <h4 className="mb-6 font-serif text-2xl text-[#263d30]">
              Quick Links
            </h4>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#77766d] transition-colors duration-300 hover:text-[#294333]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#ad8950] transition-all duration-300 group-hover:h-1.5 group-hover:w-1.5" />
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="mb-7 flex items-center gap-2">
              <span className="h-px w-7 bg-[#ad8950]" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ad8950]">
                Get in touch
              </h3>
            </div>

            <h4 className="mb-6 font-serif text-2xl text-[#263d30]">
              Let&apos;s Connect
            </h4>

            <p className="mb-7 max-w-xs text-sm leading-7 text-[#77766d]">
              Have a question or want to know more? Feel free to reach out.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f5ef] text-[#405746]">
                  <Sparkles size={19} />
                </span>
                <div>
                  <p className="text-xs text-[#999387]">Created by</p>
                  <p className="mt-1 text-sm font-semibold text-[#263d30]">
                    Jubail
                  </p>
                </div>
              </div>

              <a
                href="tel:01317953705"
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f5ef] text-[#405746] transition-colors group-hover:bg-[#294333] group-hover:text-white">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs text-[#999387]">Call me</p>
                  <p className="mt-1 text-sm font-semibold text-[#263d30] transition-colors group-hover:text-[#ad8950]">
                    01317953705
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f5ef] text-[#405746]">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-xs text-[#999387]">Location</p>
                  <p className="mt-1 text-sm font-semibold text-[#263d30]">
                    Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-[#8b887e]">
            © 2026{" "}
            <span className="font-semibold text-[#405746]">BookNook.</span> All
            rights reserved.
          </p>

          <p className="flex items-center gap-2 text-xs text-[#8b887e]">
            Crafted with
            <span className="text-[#b58b52]">♥</span>
            for book lovers.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 text-xs font-semibold text-[#405746] transition-colors hover:text-[#ad8950]"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d1c5b1] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#294333] group-hover:bg-[#294333] group-hover:text-white">
              <ArrowRight size={14} className="-rotate-90" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
