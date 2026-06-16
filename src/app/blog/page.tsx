"use client";

import React, { useState } from "react";
import { Search, BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const articles = [
    {
      title: "Demystifying Startup Valuations in India: A Founder's Guide",
      category: "Startup Funding India",
      date: "June 14, 2026",
      readTime: "6 min read",
      desc: "How early-stage Indian founders should structure financial forecasts and calculate post-money valuations before approaching pre-seed angel syndicates or early-stage VCs.",
    },
    {
      title: "The Role of Hands-on Mentorship in Post-PMF Scale-Up Sprints",
      category: "Startup Mentorship India",
      date: "June 10, 2026",
      readTime: "8 min read",
      desc: "EGA Chief Mentor Ramani Iyer shares critical insights on optimizing CRM pipelines, avoiding sales hiring pitfalls, and deploying corporate governance early.",
    },
    {
      title: "Why Bengaluru Remains the Center of India's Venture Accelerator Ecosystem",
      category: "Venture Accelerator Bengaluru",
      date: "June 05, 2026",
      readTime: "5 min read",
      desc: "Exploring the density of talent, investor capital availability, and corporate innovation partnerships that make Bengaluru the ideal sandbox for tech startups.",
    },
    {
      title: "Re-engineering Operations: Saving 40% Overhead in Growth Startups",
      category: "Startup Growth Consulting India",
      date: "May 28, 2026",
      readTime: "7 min read",
      desc: "Case studies detailing how consolidated shared services, automated MCA auditing systems, and legal compliance audits improve margin health by up to 40%.",
    },
  ];

  const categories = [
    "Startup Funding India",
    "Startup Mentorship India",
    "Venture Accelerator Bengaluru",
    "Startup Growth Consulting India",
  ];

  const filtered = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-16 bg-bg-dark min-h-screen">
      {/* Page Header */}
      <section className="relative py-12 overflow-hidden border-b border-gray-200 bg-gradient-to-r from-bg-dark to-bg-surface/30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-extrabold text-gold uppercase tracking-wider bg-bg-surface border border-gray-200 px-3 py-1 rounded-full">
            Market Intelligence
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-4">
            EGA Insights & Market Hub
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Access our professional playbooks covering seed valuation, operational margins, sales CRM automation, and Indian regulatory audits.
          </p>
        </div>
      </section>

      {/* Directory Filter controls */}
      <section className="py-8 bg-bg-surface/50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-bg-surface border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gold"
            />
          </div>

          {/* Categories select */}
          <div className="flex w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-60 bg-bg-surface border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
            >
              <option value="" className="text-gray-500">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-gray-700">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500 text-sm italic border border-dashed border-gray-300 rounded-2xl">
              No advisory articles found matching your filters.
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {filtered.map((article, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-gold/30 flex flex-col gap-4 text-left transition-all"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2.5 py-0.5 text-[9px] font-extrabold bg-gold/10 border border-gold/20 rounded-full text-gold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl text-white hover:text-gold transition-colors leading-snug cursor-pointer">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {article.desc}
                  </p>

                  <div className="border-t border-gray-200 pt-4 mt-2 flex justify-end">
                    <button
                      onClick={() => alert(`Opening "${article.title}"`)}
                      className="text-xs font-bold text-gold hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" /> Read Article <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
