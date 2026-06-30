"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Globe, X } from "lucide-react";
import SectionBackground from "@/components/SectionBackground";

export default function IndustryValidationPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <section className="py-24 bg-bg-dark relative overflow-hidden min-h-screen">
      <SectionBackground seed="industry-validation-full" density="high" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Button */}
        <div className="flex justify-start mb-8">
          <Link
            href="/#industry-validation"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-gold hover:text-white transition-colors uppercase tracking-wider group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest bg-gold/5 border border-gold/10 px-3 py-1 rounded-full">
            Ecosystem Features
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mt-4">
            Industry Validation
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
            Comprehensive updates, celebrity announcements, mentorship initiatives, and key advisory features celebrating our leadership presence across startup platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in">
          {/* Article 1 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Inflection Point Ventures
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Celebrity Speaker Announcement: IPV Wealth Wise Investor Summit Middle East
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/ipventures_ipvwealthwise-wealthwise2025-investorsummit-ugcPost-7367438230591295489-m7oM/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 2 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Ramani Iyer (Chief Mentor)
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Panel Keynotes & Executive Reflections: IPV Wealth Wise Investor Summit Dubai
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/ramani-iyer-03024178_celebrating-excellence-at-the-ipv-wealth-activity-7375391685876338688-9UH8?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 3 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Happy Foods Group (Shriya Khanna)
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                B2B F&B Services Pivot & 500% YoY MRR Growth Success Story
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/khannashriya_happyfoodsgroup-b2btransformation-growthjourney-activity-7279191997364494336-k6-w?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 4 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Ecosystem Community
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Strategic Collaboration & Early-Stage Scaling Methodologies Case Study
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/feed/update/urn:li:groupPost:3416532-7227670576394297345?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 5 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  BITS Pilani Conquest
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Startup Accelerator Mentorship: BITS Pilani Conquest 2024 Invitation
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/ramani-iyer-03024178_two-months-ago-i-was-honored-to-receive-activity-7227670532186365954-HJCg?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 6 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Melvin Jones Fashions
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Melvin Jones Strategic Advisor & Mentor Appointment
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/swati-bhaskar-82ab064_ramaniiyer-melvinjones-melvinjonesfashions-share-7118127077945479168-pdbI?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 7 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Brand Ammamma's
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Strategic Advisory Partnership: Brand Ammamma's Mentorship
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/ramani-iyer-03024178_cofounder-justdial-mentor-activity-7117125922293501952-iJZx?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 8 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Adamas University & StartUp Connect
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Academic & Innovation MoU: Adamas University Partnership
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/adamas-university_mou-signing-ceremony-adamas-university-ugcPost-7049706214762397696-TTyV?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 9 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  INBCC & StartUp Connect
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                International Collaboration: Startup Bandhu Mela & INBCC Invite
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/akhila-narasimha_namaste-konnichiwa-from-inbcc-activity-7035963081633538049-w3tS?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 10 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Adamas Tech Consulting
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Corporate Office Inauguration: Adamas Tech Consulting Hub Launch
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/adamas-tech-consulting_adamastechconsulting-newoffice-corporateinauguration-share-7034881998141722624-g27T?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 11 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  JIMS Kalkaji
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                The JIMS Talks: Leadership & Entrepreneurship Keynote
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/jims-kalkaji_jims-kalkaji-jimstalks-share-7017404822706405376-kytt?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 12 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  SIBM Pune
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Enspire Zero to One: SIBM Pune Guest Speaker Keynote
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/sgc-sibmpune_ramani-iyer-ugcPost-7017081734634643457-RMF0?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 13 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  SIBM Pune E-Summit
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Enspire Zero to One Speaker Announcement: Ramani Iyer Feature
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/sgc-sibmpune_entrepreneurship-sibmpune-secc-share-7016485633065979904-pRbE?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 14 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Olive Living
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Strategic Investor Partnership: Olive Living & Ramani Iyer Onboarding
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/kahraman-yigit-68110a24_oliveliving-share-7008764580126478336-JkgM?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 15 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Edujournal
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Strategic Investor Partnership: Edujournal & Ramani Iyer Onboarding
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/edujournal_edujournal-edtech-startup-share-7009077815287435264-7oBn?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 16 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Wow Mom Foods
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                National Expansion Mentorship: Wow Mom Foods Collaboration
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/shyama-jha-09b900119_mentorship-mentorship-success-share-6987943769824215040-6yWL?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 17 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Ramani Iyer
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Executive Portfolio & Brand Highlights: Ramani Iyer Update
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/ramani-iyer-03024178_activity-6984118765605068800-bWq7?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 18 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Venture Verse
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                First Edition Success: India StartUp Festival Bangalore
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/india-start-up_startups-startup-india-share-6982744045122945025-7fr9?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 19 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  India StartUp Festival
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Experiential Hybrid Launch: India StartUp Festival 2022
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/ramani-iyer-03024178_startup-event-entrepreneurs-activity-6980733876620976129-pjBN?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 20 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Ramani Iyer
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Incubation & Acceleration Summit: Mentorship Sessions
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/ramani-iyer-03024178_activity-6975542319022243840-gUQp?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 21 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Ramani Iyer
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Strategic Venture Scaling: Ramani Iyer Leadership Meet
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/ramani-iyer-03024178_activity-6969349999256096768-YTOl?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 22 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  James Kannada Movie Tribute
                </span>
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Ecosystem Collaboration: Kannada Movie James Tribute
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <a
                href="https://www.linkedin.com/posts/ramani-iyer-03024178_happy-to-be-part-of-puneeths-kannada-movie-activity-6910642283973402624-wCGM?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAABBoouQBwIgsJoSQVJKi3Obso5gDtzlNt3E&utm_campaign=whatsapp"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
              >
                View Article <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Article 23 */}
          <div className="premium-card p-6 flex flex-col justify-between items-start text-left hover:border-gold/30 hover:scale-[1.01] transition-all">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-0.5 rounded-full">
                  Entrepreneur India
                </span>
                <Globe className="w-4 h-4 text-gray-500" />
              </div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                Respect Investors' Money, Remain Committed to Brand: Ramani Iyer at Startup Summit
              </h3>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/5">
              <button
                onClick={() => setIsOpen(true)}
                className="text-xs font-extrabold text-gold hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                Read More <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300">
          <div className="relative w-full max-w-2xl bg-bg-surface border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[85vh] text-left animate-in fade-in zoom-in-95 duration-200 theme-dark">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest bg-gold/5 border border-gold/15 px-2.5 py-1 rounded-full">
                Entrepreneur India Press
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-4 leading-snug">
                Respect Investors' Money, Remain Committed to Brand
              </h2>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-3 font-mono">
                <span>By Shreya Ganguly</span>
                <span>•</span>
                <span>October 12, 2019</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5 text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
              <p>
                Building a successful start-up is not easy. One needs to put in days and nights of hardwork to build and nurture ventures. While building a business model good enough to be profitable is extremely important, entrepreneurs should also keep in mind that they need to serve their users, solve their problems and make their life easier.
              </p>
              
              <blockquote className="border-l-4 border-gold bg-gold/5 p-4 rounded-r-xl italic my-2 text-white">
                “Once you are in a business, you have to commit yourself to serve the society,” said Ramani Iyer, co-founder of JustDial, while speaking at Startup Summit 2019 organised by Franchise India.
              </blockquote>

              <p>
                Agreeing to the idea, Greg Nathan, founder of Franchise Relationships Institute added, “Entrepreneurs need to have a philosophy where everyone can make money, contribute and have fun together.”
              </p>

              <p className="text-xs sm:text-sm text-gray-400 font-mono italic mt-2 border-t border-white/5 pt-4">
                Here are some of the aspects entrepreneurs need to keep in mind if they are looking to build a successful start-up.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
