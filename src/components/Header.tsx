"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

import TransparentLogo from "./TransparentLogo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { openMeetingModal } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Closes dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdown(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const networkLinks = [
    { name: "EGA Portfolio", href: "/portfolio", desc: "Our accelerated cohorts & vetted startups" },
    { name: "Founder Profile", href: "/mentors", desc: "Learn about Ramani Iyer, Co-Founder of JustDial & EGA" },
    { name: "Investor Syndicate", href: "/investor", desc: "Join our network of family offices & VCs" },
  ];

  const insightsLinks = [
    { name: "Market Insights", href: "/blog", desc: "Reports on valuation benchmarks & scale" },
    { name: "Cohort Events", href: "/events", desc: "Pitch sessions, networking & live workshops" },
  ];

  return (
    <header className="fixed left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 top-4 pointer-events-none transition-all duration-300">
      <div className="flex items-center justify-between pointer-events-auto w-full gap-4">
        {/* Segment 1: Logo Card Box */}
        <div className={`bg-[#ffffff] rounded-2xl px-6 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-200/50 flex items-center justify-center transition-all duration-300 ${
          scrolled ? "scale-95 py-2 px-5" : "scale-100"
        }`}>
          <Link href="/" className="flex items-center group">
            <TransparentLogo
              src="/logos/ega.png"
              alt="Elephant God Accelerator Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Segment 2: Central Nav Capsule */}
        <nav className={`hidden lg:flex items-center gap-8 bg-[#ffffff]/95 backdrop-blur-xl rounded-full px-8 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-200/50 transition-all duration-300 ${
          scrolled ? "py-2.5 px-6" : "py-3.5 px-8"
        }`}>
          <Link
            href="/"
            className={`relative text-xs uppercase tracking-wider font-extrabold transition-colors duration-300 hover:text-gold py-1 group/nav-link ${
              pathname === "/" ? "text-gold" : "text-[#121212]"
            }`}
          >
            Home
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover/nav-link:w-full ${pathname === "/" ? "w-full" : ""}`} />
          </Link>

          <Link
            href="/#programs"
            className="relative text-xs uppercase tracking-wider font-extrabold transition-colors duration-300 hover:text-gold py-1 group/nav-link text-[#121212]"
          >
            Programs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover/nav-link:w-full" />
          </Link>

          <Link
            href="/#services"
            className="relative text-xs uppercase tracking-wider font-extrabold transition-colors duration-300 hover:text-gold py-1 group/nav-link text-[#121212]"
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover/nav-link:w-full" />
          </Link>

          {/* Network Dropdown */}
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setActiveDropdown("network")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`text-xs uppercase tracking-wider font-extrabold transition-colors duration-300 flex items-center gap-1 hover:text-gold cursor-pointer py-1 ${
                pathname === "/portfolio" || pathname === "/mentors" || pathname === "/investor"
                  ? "text-gold"
                  : "text-[#121212]"
              }`}
            >
              Network <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" />
            </button>

            <AnimatePresence>
              {activeDropdown === "network" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-[#ffffff] border border-gray-200 rounded-2xl p-4 shadow-2xl z-50"
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#ffffff] border-t border-l border-gray-200 rotate-45" />
                  <div className="flex flex-col gap-1 relative z-10">
                    {networkLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="p-3 rounded-xl hover:bg-gold/10 transition-all text-left flex flex-col group/item"
                      >
                        <span className="text-sm font-bold text-[#121212] group-hover/item:text-gold transition-colors flex items-center gap-1">
                          {link.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                        </span>
                        <span className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{link.desc}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Insights Dropdown */}
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setActiveDropdown("insights")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`text-xs uppercase tracking-wider font-extrabold transition-colors duration-300 flex items-center gap-1 hover:text-gold cursor-pointer py-1 ${
                pathname === "/blog" || pathname === "/events" ? "text-gold" : "text-[#121212]"
              }`}
            >
              Insights <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" />
            </button>

            <AnimatePresence>
              {activeDropdown === "insights" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-[#ffffff] border border-gray-200 rounded-2xl p-4 shadow-2xl z-50"
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#ffffff] border-t border-l border-gray-200 rotate-45" />
                  <div className="flex flex-col gap-1 relative z-10">
                    {insightsLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="p-3 rounded-xl hover:bg-gold/10 transition-all text-left flex flex-col group/item"
                      >
                        <span className="text-sm font-bold text-[#121212] group-hover/item:text-gold transition-colors flex items-center gap-1">
                          {link.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                        </span>
                        <span className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{link.desc}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/#about"
            className="relative text-xs uppercase tracking-wider font-extrabold transition-colors duration-300 hover:text-gold py-1 group/nav-link text-[#121212]"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover/nav-link:w-full" />
          </Link>

          <button
            onClick={openMeetingModal}
            className="relative text-xs uppercase tracking-wider font-extrabold transition-colors duration-300 cursor-pointer hover:text-gold py-1 group/nav-link text-[#121212]"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover/nav-link:w-full" />
          </button>
        </nav>

        {/* Segment 3: Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/download"
            className="px-6 py-3 text-xs font-extrabold uppercase tracking-wider bg-[#ffffff]/90 hover:bg-[#ffffff] border border-gray-200 rounded-full text-gray-800 shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition-all duration-300"
          >
            Download Profile
          </Link>
          <Link
            href="/apply"
            className="px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white bg-cta-gradient rounded-full hover:shadow-xl hover:scale-[1.02] shadow-[0_10px_25px_rgba(246,90,22,0.25)] transition-all duration-300 flex items-center gap-1.5 group"
          >
            Apply Now
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden bg-[#ffffff]/95 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-gray-200/50 flex items-center justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-gray-700 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-3 p-6 bg-[#ffffff]/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl flex flex-col gap-3 overflow-hidden pointer-events-auto"
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold text-gray-700 hover:text-gold py-2.5 border-b border-gray-200/20"
            >
              Home
            </Link>
            <Link
              href="/#programs"
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold text-gray-700 hover:text-gold py-2.5 border-b border-gray-200/20"
            >
              Programs
            </Link>
            <Link
              href="/#services"
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold text-gray-700 hover:text-gold py-2.5 border-b border-gray-200/20"
            >
              Services
            </Link>

            {/* Network section */}
            <div className="flex flex-col gap-1 border-b border-gray-200/20 py-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3" /> Network
              </span>
              {networkLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-gray-600 hover:text-gold py-1.5 pl-2 flex items-center justify-between"
                >
                  {link.name}
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
                </Link>
              ))}
            </div>

            {/* Insights section */}
            <div className="flex flex-col gap-1 border-b border-gray-200/20 py-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3" /> Insights
              </span>
              {insightsLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-gray-600 hover:text-gold py-1.5 pl-2 flex items-center justify-between"
                >
                  {link.name}
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
                </Link>
              ))}
            </div>

            <Link
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold text-gray-700 hover:text-gold py-2.5 border-b border-gray-200/20"
            >
              About
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                openMeetingModal();
              }}
              className="text-left text-sm font-bold text-gray-700 hover:text-gold py-2.5 border-b border-gray-200/20 cursor-pointer"
            >
              Contact
            </button>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link
                href="/download"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50"
              >
                Download Profile
              </Link>
              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-white bg-cta-gradient rounded-full shadow-lg"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
