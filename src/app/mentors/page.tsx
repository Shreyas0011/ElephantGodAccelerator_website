"use client";

import React from "react";
import { Award, ExternalLink } from "lucide-react";

export default function MentorsPage() {
  const founder = {
    name: "Ramani Iyer",
    title: "Founder & Chief Mentor, EGA",
    expertise: "General Business & Scaling",
    bio: "Seasoned entrepreneur and Co-Founder of JustDial Ltd. Works directly with cohort startups to structure corporate governance, B2B scales, and global alliances.",
    img: "/ramani_iyer.png",
    linkedin: "https://www.linkedin.com/in/ramani-iyer-03024178/",
  };

  return (
    <div className="pt-24 pb-16 bg-bg-dark min-h-screen theme-dark">
      {/* Page Header */}
      <section className="relative py-12 overflow-hidden border-b border-gray-200 bg-gradient-to-r from-bg-dark to-bg-surface/30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-extrabold text-gold uppercase tracking-wider bg-bg-surface border border-gray-200 px-3 py-1 rounded-full">
            EGA Leadership
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-4">
            Founder & Chief Mentor
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Elephant God Accelerator works alongside founders as hands-on execution partners, directed by seasoned scale operator Ramani Iyer.
          </p>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gray-200 hover:border-gold/30 flex flex-col md:flex-row gap-8 text-left transition-all max-w-2xl mx-auto">
            {/* Photo */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 border border-gray-200 self-center">
              <img
                src={founder.img}
                alt={founder.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-3 justify-center">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-display font-black text-2xl text-white">
                    {founder.name}
                  </h3>
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mt-0.5">
                    {founder.title}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 text-[9px] font-extrabold bg-gold/10 border border-gold/20 rounded-full text-gold uppercase tracking-wider">
                  {founder.expertise}
                </span>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {founder.bio}
              </p>

              <div className="border-t border-gray-200 pt-4 mt-2 flex justify-end">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-gold hover:text-accent transition-colors flex items-center gap-1"
                >
                  LinkedIn Profile <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
