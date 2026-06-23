"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, Mail } from "lucide-react";
import TransparentLogo from "./TransparentLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const subscriptions = JSON.parse(
      localStorage.getItem("ega_newsletter_subs") || "[]"
    );
    subscriptions.push({
      email,
      date: new Date().toISOString(),
    });
    localStorage.setItem("ega_newsletter_subs", JSON.stringify(subscriptions));

    setSubscribed(true);
    setEmail("");
    alert("Thank you for subscribing to EGA Insights!");
  };

  return (
    <footer className="theme-dark bg-primary border-t border-gray-200/10 pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-2.5 shadow-md flex items-center justify-center self-start h-16 w-40 overflow-hidden">
              <img
                src="/logos/rashio.png"
                alt="Rashio Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's leading execution-driven startup growth platform. We turn early-stage innovation into VC-fundable market leaders.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.linkedin.com/in/ramani-iyer-03024178/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-full bg-bg-surface-light border border-gray-200 flex items-center justify-center hover:bg-gold/15 hover:border-gold/30 hover:text-gold transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter Profile"
                className="w-9 h-9 rounded-full bg-bg-surface-light border border-gray-200 flex items-center justify-center hover:bg-gold/15 hover:border-gold/30 hover:text-gold transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook Profile"
                className="w-9 h-9 rounded-full bg-bg-surface-light border border-gray-200 flex items-center justify-center hover:bg-gold/15 hover:border-gold/30 hover:text-gold transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube Channel"
                className="w-9 h-9 rounded-full bg-bg-surface-light border border-gray-200 flex items-center justify-center hover:bg-gold/15 hover:border-gold/30 hover:text-gold transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.163c-.272-1.018-1.072-1.818-2.09-2.09C19.57 3.65 12 3.65 12 3.65s-7.57 0-9.408.423C1.574 4.345.774 5.145.502 6.163 0 8.002 0 11.85 0 11.85s0 3.848.502 5.687c.272 1.018 1.072 1.818 2.09 2.09C4.43 20.05 12 20.05 12 20.05s7.57 0 9.408-.423c1.018-.272 1.818-1.072 2.09-2.09.502-1.839.502-5.687.502-5.687s0-3.848-.502-5.687zM9.545 15.568V8.132l6.409 3.718-6.409 3.718z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Accelerator
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  EGA Portfolio
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Mentor Council
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Cohort Events
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Startup Scorecard
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Venture Capital
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/investor" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  VC Network
                </Link>
              </li>
              <li>
                <Link href="/investor" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Family Offices
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Corporate Profile
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Market Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Ecosystem Insights
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Subscribe to receive monthly analysis of valuation benchmarks, funding trends, and shared services playbooks.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-surface-light border border-gray-300 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 bg-cta-gradient text-[#ffffff] rounded-lg hover:shadow-lg transition-all flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Contact:</span>
              <a href="mailto:info@elephantgodaccelerator.com" className="text-gray-500 hover:text-gold transition-colors">
                info@elephantgodaccelerator.com
              </a>
            </div>
          </div>
        </div>

        {/* Admin Portal subtle text link */}
        <div className="border-t border-white/10 pt-6 mb-6 flex justify-center">
          <p className="text-gray-500 text-xs">
            If you are the admin of the website then{" "}
            <Link
              href="/admin"
              id="admin-login-link"
              className="text-gold hover:underline font-semibold"
              aria-label="Admin login"
            >
              click here to login
            </Link>
            .
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Elephant God Accelerator (EGA). All Rights Reserved.
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">
              Terms & Governance
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
