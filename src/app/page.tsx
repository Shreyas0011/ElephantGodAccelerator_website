"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Layers,
  Cpu,
  Coins,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Calendar,
  Award,
  Users,
  CheckCircle2,
  Briefcase,
  Globe,
  BarChart3,
  Map,
  Presentation,
  GraduationCap,
} from "lucide-react";
import HeroCanvas from "@/components/HeroCanvas";
import SectionBackground from "@/components/SectionBackground";
import PremiumDivider from "@/components/PremiumDivider";
import { useApp } from "@/context/AppContext";
import { loadSiteContent, SiteContent, DEFAULT_CONTENT } from "@/lib/siteContent";

const PORTFOLIO_LOGOS = [
  { name: "Mykhaana", src: "mykhaana.jpg", scale: "scale-[1.3]" },
  { name: "CosmicEye", src: "cosmiceye.jpg", scale: "scale-[1.35]" },
  { name: "Tribal Brew Coffee", src: "tribalbrew.jpg", scale: "scale-[1.1]" },
  { name: "Just Connect Electricals", src: "justconnect.jpg", scale: "scale-[1.1]" },
  { name: "Myniwa", src: "myniwa.jpg", scale: "scale-[1.0]" },
  { name: "Ammamma's", src: "ammammas.jpg", scale: "scale-[1.4]" },
  { name: "Olive Living", src: "olive.jpg", scale: "scale-[1.0]" },
  { name: "Discreet Arts", src: "discreetarts.jpg", scale: "scale-[1.5]" },
  { name: "Charze Max", src: "charzemax.jpg", scale: "scale-[1.45]" },
  { name: "World 5 Fund", src: "world5fund.jpg", scale: "scale-[1.8]" },
  { name: "Genie Pads", src: "geniepads.jpg", scale: "scale-[1.3]" },
  { name: "Melvin Jones", src: "melvinjones.jpg", scale: "scale-[1.1]" },
  { name: "Abnandan Enviro", src: "abnandanenviro.jpg", scale: "scale-[1.3]" },
  { name: "Spykke", src: "spykke.jpg", scale: "scale-[1.1]" },
  { name: "DEFA", src: "defa.jpg", scale: "scale-[1.1]" },
  { name: "Sutton & Shaw", src: "suttonandshaw.jpg", scale: "scale-[1.1]" },
  { name: "DesiLLM", src: "desillm.jpg", scale: "scale-[1.15]" },
  { name: "Elephantgod Infra", src: "elephantgodinfra.jpg", scale: "scale-[1.8]" },
  { name: "GRV Academy", src: "grvacademy.jpg", scale: "scale-[2.4]" },
  { name: "R Cube MedTech", src: "rcubemedtech.jpg", scale: "scale-[1.25]" },
  { name: "NES", src: "nes.jpg", scale: "scale-[1.15]" },
  { name: "Zero Touch", src: "zerotouch.jpg", scale: "scale-[1.1]" },
  { name: "inGO Electric", src: "ingoelectric.png", scale: "scale-[1.15]" },
];

export default function HomePage() {
  const { openMeetingModal } = useApp();
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_CONTENT);

  // Load content on mount
  useEffect(() => {
    setSiteContent(loadSiteContent());
  }, []);

  // Stats Counters
  const [stats, setStats] = useState({ portfolio: 0, savings: 0, partners: 0 });
  useEffect(() => {
    const targetPortfolio = parseInt(siteContent.hero.stat1Value, 10) || 18;
    const targetSavings = parseInt(siteContent.hero.stat2Value, 10) || 40;
    const targetPartners = parseInt(siteContent.hero.stat3Value, 10) || 50;

    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStats({
        portfolio: Math.min(targetPortfolio, Math.round((targetPortfolio / steps) * currentStep)),
        savings: Math.min(targetSavings, Math.round((targetSavings / steps) * currentStep)),
        partners: Math.min(targetPartners, Math.round((targetPartners / steps) * currentStep)),
      });

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [siteContent]);

  // Capital Ecosystem Hover State
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const capitalNodes: Record<
    string,
    { title: string; stage: string; ticket: string; desc: string }
  > = {};
  siteContent.capitalNodes.forEach(node => {
    capitalNodes[node.key] = {
      title: node.title,
      stage: node.stage,
      ticket: node.ticket,
      desc: node.desc
    };
  });

  // Testimonial State
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const testimonialData = siteContent.testimonials;

  // Interactive Blueprint Planner State
  const [blueprintSector, setBlueprintSector] = useState("saas");
  const [blueprintChallenge, setBlueprintChallenge] = useState("gtm");
  const [blueprintRevenue, setBlueprintRevenue] = useState("pre");

  const getBlueprintData = () => {
    const data: Record<string, Record<string, { d30: string; d60: string; d90: string }>> = {
      saas: {
        gtm: {
          d30: "Audit outbound pipelines and design cold email automation templates. Target 50 ICP accounts.",
          d60: "Introduce enterprise product trial structures. Hire 2 SDRs and optimize customer conversion rates.",
          d90: "Syndicate matchmaking with SaaS specialized angel networks based on pilot conversion data.",
        },
        compliance: {
          d30: "Verify software IP assignment agreements for all internal developers and external vendors.",
          d60: "Establish legal service agreements (SLAs), review data privacy compliance (GDPR/SOC2).",
          d90: "Finalize corporate governance metrics required by pre-seed VC funds for onboarding.",
        },
        funding: {
          d30: "Clean capitalization table and build a robust 3-year recurring revenue model.",
          d60: "Host mock investor pitches with EGA partners and complete the target investor list.",
          d90: "Interactive matchmaking with early-stage venture capital syndicates and family offices.",
        },
        tech: {
          d30: "Audit AWS/GCP cloud configurations to eliminate redundant compute instances and scale database schemas.",
          d60: "Implement automated testing and CI/CD pipelines. Set up real-time error logging tools.",
          d90: "Align software backend structure for secure integration with parent systems.",
        },
      },
      d2c: {
        gtm: {
          d30: "Optimize Shopify purchase funnels. Restructure Facebook/Meta advertising account setup.",
          d60: "Onboard with Quick-Commerce channels (Zepto, Blinkit). Negotiate regional fulfillment hubs.",
          d90: "Refine cohort repeat purchase metrics to prepare for venture debt options.",
        },
        compliance: {
          d30: "Review trademark status for core brand labels and establish GST tracking engines.",
          d60: "Audit retail distribution contracts and set up standard legal board structures.",
          d90: "Prepare full legal clearance reports required for institutional venture investments.",
        },
        funding: {
          d30: "Calculate true contribution margin 2 (CM2) and cohort-based customer lifetime value (LTV).",
          d60: "Refine pitch deck story highlighting positive unit economics and inventory turns.",
          d90: "Direct matchmaking sessions with active consumer-brand VCs and family offices.",
        },
        tech: {
          d30: "Optimize web load speeds under 1.5s to improve direct-to-consumer ad-spend conversion rates.",
          d60: "Integrate ERP systems to unify online warehouse stock levels with offline stores.",
          d90: "Launch custom customer loyalty app modules and automated WhatsApp follow-up flows.",
        },
      },
      health: {
        gtm: {
          d30: "Launch regional pilots in 3 hospitals. Setup clinical representative field sales flows.",
          d60: "Onboard doctor-referral digital dashboard systems. Integrate secure patient booking portals.",
          d90: "Launch diagnostic repeat-testing reminders to raise lifetime utility values.",
        },
        compliance: {
          d30: "Audit medical data privacy compliance. Check state health licensing registration.",
          d60: "Draft hospital indemnity agreements and validate clinical validation testing results.",
          d90: "Establish formal corporate compliance structures needed for institutional VC seed rounds.",
        },
        funding: {
          d30: "Assemble patents portfolio and summarize academic clinical study validations.",
          d60: "Prepare financial forecasts demonstrating regulatory approval milestones.",
          d90: "Direct introductions to dedicated healthtech venture funds and healthcare HNIs.",
        },
        tech: {
          d30: "Verify end-to-end medical records encryption protocols and server storage compliance.",
          d60: "Refine telehealth audio/video compression algorithms to support low-bandwidth zones.",
          d90: "Deploy machine learning models for predictive patient diagnostic assistance.",
        },
      },
      climate: {
        gtm: {
          d30: "Initiate corporate pilot fleet trials with 3 retail delivery operators.",
          d60: "Formulate subscription models for batteries or charging services. Setup regional hubs.",
          d90: "Matchmaking with logistics managers of regional conglomerates for long-term leases.",
        },
        compliance: {
          d30: "Verify state-level EV subsidy eligibility and state pollution control board licenses.",
          d60: "Draft commercial leasing frameworks and clear patent registration filings.",
          d90: "Provide full compliance auditing verification reports to climate ESG funds.",
        },
        funding: {
          d30: "Draft financial models outlining capital expenditure requirements for fleet assets.",
          d60: "Setup institutional debt vs equity capitalization options with financial mentors.",
          d90: "Direct matchmaking rounds with dedicated ESG venture capital funds and green debt syndicates.",
        },
        tech: {
          d30: "Optimize vehicle telemetry software tools for battery state-of-health tracking.",
          d60: "Configure charging station grid management APIs and cloud dashboard monitors.",
          d90: "Integrate vehicle telematics with parent delivery management software setups.",
        },
      },
    };
    return data[blueprintSector]?.[blueprintChallenge] || data.saas.gtm;
  };

  return (
    <div className="relative min-h-screen bg-bg-dark text-white overflow-hidden">
      
      {/* --- 1. PREMIUM HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden text-center bg-hero-gradient theme-dark">
        <SectionBackground seed="hero" dark density="high" />
        {/* Dynamic canvas backdrop */}
        <HeroCanvas />
        {/* Technical Grid overlay */}
        <div className="absolute inset-0 cyber-grid pointer-events-none z-0" />
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-growth/6 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero floating stat badges */}
        <span className="hero-float-badge left-[4%] top-[28%] hidden lg:inline-flex animate-float">
          <TrendingUp className="w-3 h-3 opacity-60" /> {stats.savings}% Ops Saved
        </span>
        <span className="hero-float-badge right-[5%] top-[32%] hidden lg:inline-flex animate-float-delayed">
          <Coins className="w-3 h-3 opacity-60" /> ₹2Cr+ Syndicated
        </span>
        <span className="hero-float-badge left-[8%] bottom-[22%] hidden md:inline-flex animate-float-delayed">
          <Users className="w-3 h-3 opacity-60" /> {stats.partners}+ Partners
        </span>
        <span className="hero-float-badge right-[6%] bottom-[24%] hidden md:inline-flex animate-float">
          <Briefcase className="w-3 h-3 opacity-60" /> {stats.portfolio} Portfolio Cos
        </span>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center gap-7">
          {/* Glowing Badge */}
          <div className="premium-badge text-gold">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            {siteContent.hero.badge}
          </div>

          {/* Premium Typographic Title */}
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight max-w-4xl">
            {(() => {
              const h = siteContent.hero.headline;
              const word = "Market Leaders";
              if (h.includes(word)) {
                const parts = h.split(word);
                return (
                  <>
                    {parts[0]}
                    <span className="gradient-text-gold">{word}</span>
                    {parts[1]}
                  </>
                );
              }
              return h;
            })()}
          </h1>

          {/* Clean Subtitle */}
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {siteContent.hero.subheadline}
          </p>

          {/* Styled CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-3">
            <Link
              href="/apply"
              className="px-8 py-4 bg-cta-gradient text-[#ffffff] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Apply for Accelerator <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={openMeetingModal}
              className="px-8 py-4 bg-bg-surface-light/40 border border-gray-300 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 hover:border-gold/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md"
            >
              <Calendar className="w-4 h-4 text-gold" /> Book Strategy Audit
            </button>
          </div>
        </div>
      </section>

      {/* --- 1.5 METRICS & LOGO WALL SECTION --- */}
      <section className="relative border-y border-gray-200 theme-dark bg-primary py-8 z-10 overflow-hidden">
        <SectionBackground seed="metrics" dark density="medium" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Centered Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-center mb-6">
            <div className="p-6 rounded-2xl bg-bg-surface-light/60 border border-gold/25 backdrop-blur-sm flex flex-col gap-1.5 premium-stat-card">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stats.portfolio}</span>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">
                {siteContent.hero.stat1Label}
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-bg-surface-light/60 border border-gold/30 backdrop-blur-sm flex flex-col gap-1.5 premium-stat-card">
              <span className="text-3xl sm:text-4xl font-black text-gold tracking-tight">{stats.savings}%</span>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">
                {siteContent.hero.stat2Label}
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-bg-surface-light/60 border border-gold/25 backdrop-blur-sm flex flex-col gap-1.5 premium-stat-card">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stats.partners}+</span>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">
                {siteContent.hero.stat3Label}
              </span>
            </div>
          </div>

          {/* Smooth Horizontal Logo Wall */}
          <div className="w-full flex flex-col gap-3 border-t border-gray-200 pt-5">
            <span className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest text-center">
              Accelerated Cohorts & Featured Portfolio Spotlights
            </span>
            <div className="relative flex overflow-x-hidden py-4 w-full opacity-85 hover:opacity-100 transition-opacity duration-300">
              <div className="animate-infinite-scroll flex whitespace-nowrap gap-12 items-center">
                {PORTFOLIO_LOGOS.map((logo, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-2xl flex items-center justify-center shadow-md h-20 w-48 shrink-0 select-none overflow-hidden transition-transform hover:scale-105">
                    <img
                      src={`/logos/${logo.src}`}
                      alt={logo.name}
                      className={`max-h-[85%] max-w-[90%] object-contain transition-all duration-300 ${logo.scale}`}
                    />
                  </div>
                ))}
              </div>
              <div className="animate-infinite-scroll flex whitespace-nowrap gap-12 items-center" aria-hidden="true">
                {PORTFOLIO_LOGOS.map((logo, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-2xl flex items-center justify-center shadow-md h-20 w-48 shrink-0 select-none overflow-hidden transition-transform hover:scale-105">
                    <img
                      src={`/logos/${logo.src}`}
                      alt={logo.name}
                      className={`max-h-[85%] max-w-[90%] object-contain transition-all duration-300 ${logo.scale}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* --- 2. THE EGA EXECUTION MODEL (Consolidated Framework) --- */}
      <section id="programs" className="py-16 bg-bg-surface/50 relative overflow-hidden">
        <SectionBackground seed="programs" density="high" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest bg-gold/5 border border-gold/10 px-3 py-1 rounded-full self-start">
                Operations Engine
              </span>
              <h2 className="font-display font-black text-3.5xl sm:text-4xl text-white leading-tight">
                Our Structured Acceleration Sprints
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Rather than generic mentoring boards, EGA integrates directly with your team. We run execution modules over six-week tracks to refine CRM funnels, clear compliance hurdles, and structure institutional cap tables.
              </p>
              <div className="mt-2">
                <Link
                  href="/apply?mode=membership"
                  className="text-xs font-extrabold text-gold hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  Take Funding Readiness Quiz <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Decorative Sprint Roadmap Timeline Graphic to fill blank space */}
              <div className="mt-4 pt-5 border-t border-gold/15 hidden sm:flex flex-col gap-3">
                <span className="text-[9px] font-mono text-gold/60 uppercase tracking-widest font-extrabold">
                  Sprint Execution Path
                </span>
                <div className="relative flex items-center justify-between w-full px-2 py-4">
                  {/* Dashed Connecting Line */}
                  <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold/40 via-gold/60 to-gold/20 border-t border-dashed border-gold/30" />
                  
                  {/* Step Nodes */}
                  {[
                    { id: "01", label: "Audit", desc: "Week 1-2" },
                    { id: "02", label: "GTM", desc: "Week 3-4" },
                    { id: "03", label: "Pitch", desc: "Week 5" },
                    { id: "04", label: "Match", desc: "Week 6" }
                  ].map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#ffffff] border-2 border-gold flex items-center justify-center shadow-[0_0_15px_rgba(201,169,110,0.3)] transition-transform hover:scale-110">
                        <span className="text-[10px] font-mono font-black text-gold">{step.id}</span>
                      </div>
                      <span className="text-[10px] font-extrabold text-white mt-2 font-display">{step.label}</span>
                      <span className="text-[8px] font-mono text-gray-500 mt-0.5">{step.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Pillars Column (Premium Grid Cards) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  step: "01",
                  title: "Operational Audits",
                  desc: "Re-engineering secretarial, legal, and compliance setups. Centralized resources save up to 40% in recurring administrative costs.",
                  icon: Shield,
                  color: "text-gold",
                },
                {
                  step: "02",
                  title: "GTM & CRM Automation",
                  desc: "Deploying automated sales CRM trackers, building contact databases, and configuring outbound pipeline analytics.",
                  icon: Layers,
                  color: "text-primary",
                },
                {
                  step: "03",
                  title: "Fundraising Readiness",
                  desc: "Developing 3-year valuation models, refining pitch storylines, and restructuring cap tables before investor introductions.",
                  icon: Coins,
                  color: "text-accent",
                },
                {
                  step: "04",
                  title: "Capital Syndicate Match",
                  desc: "Pre-screened matchmaking rounds presenting vetted dealflows to leading institutional VC networks and family offices.",
                  icon: Cpu,
                  color: "text-secondary",
                },
              ].map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.step}
                    className="premium-card p-6 flex flex-col gap-4 text-left"
                  >
                    <div className="flex justify-between items-center">
                      <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${pillar.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-display font-black text-lg text-gold/30">{pillar.step}</span>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base mb-1.5">{pillar.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* --- 3. THE MENTORSHIP COUNCIL (Balanced Grid Layout) --- */}
      <section className="py-16 theme-dark bg-primary border-y border-gray-200 relative overflow-hidden">
        <SectionBackground seed="mentor" dark density="medium" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/10 px-3 py-1 rounded-full">
              EGA Leadership
            </span>
            <h2 className="font-display font-black text-3.5xl sm:text-4xl text-white mt-4">
              Founder & Chief Mentor
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="premium-card p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
              {/* Photo */}
              <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden shrink-0 border border-gold/30 relative">
                <img
                  src="/ramani_iyer.png"
                  alt="Ramani Iyer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Profile content */}
              <div className="flex-1 text-left flex flex-col gap-3">
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Founder & Chief Mentor
                </span>
                <div>
                  <h3 className="font-display font-black text-2xl text-white">Ramani Iyer</h3>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mt-0.5">
                    Co-Founder, JustDial Ltd. & Chief Mentor, EGA
                  </span>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Directing business scaling pipelines, global outreach models, and B2B alliances. Ramani works directly with active cohorts to guide operational discipline and governance structures.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                  <a
                    href="https://www.linkedin.com/in/ramani-iyer-03024178/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1 text-[10px] font-semibold bg-gold/10 border border-gold/20 rounded-lg text-gold flex items-center gap-1 hover:bg-gold hover:text-bg-dark transition-colors"
                  >
                    LinkedIn Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* --- 3.5 SERVICES WE OFFER --- */}
      <section id="services" className="py-20 bg-bg-dark relative overflow-hidden">
        <SectionBackground seed="services" density="high" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest bg-gold/5 border border-gold/10 px-3 py-1 rounded-full">
              What We Offer
            </span>
            <h2 className="font-display font-black text-3.5xl sm:text-4xl md:text-5xl text-white mt-5 leading-tight">
              Services Tailored for{" "}
              <span className="gradient-text-gold">Growth-Stage Leaders</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              From founding to scale, ElephantGod Accelerator delivers hands-on execution across the full strategic spectrum — so you can focus on building what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteContent.services.map((service, idx) => {
              const config = [
                { icon: Globe, color: "text-gold", borderColor: "border-gold/20", glowColor: "bg-gold/5" },
                { icon: BarChart3, color: "text-secondary", borderColor: "border-secondary/20", glowColor: "bg-secondary/5" },
                { icon: CheckCircle2, color: "text-growth", borderColor: "border-growth/20", glowColor: "bg-growth/5" },
                { icon: Map, color: "text-accent", borderColor: "border-accent/20", glowColor: "bg-accent/5" },
                { icon: Presentation, color: "text-primary", borderColor: "border-primary/20", glowColor: "bg-primary/5" },
                { icon: GraduationCap, color: "text-gold", borderColor: "border-gold/20", glowColor: "bg-gold/5" }
              ][idx] || { icon: Globe, color: "text-gold", borderColor: "border-gold/20", glowColor: "bg-gold/5" };

              const IconComp = config.icon;
              const highlights = [service.highlight1, service.highlight2, service.highlight3].filter(Boolean);
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className={`group relative premium-card p-7 flex flex-col gap-5 text-left overflow-hidden border ${config.borderColor} hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1`}
                >
                  {/* Subtle glow blob on hover */}
                  <div className={`absolute -top-10 -right-10 w-40 h-40 ${config.glowColor} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Top row: icon + tag */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${config.color} shrink-0`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${config.borderColor} ${config.color} bg-white/5`}>
                      {service.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-white text-base leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-1.5">
                    {highlights.map((h, i) => (
                      <span key={i} className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span className={`w-1.5 h-1.5 rounded-full ${config.color} bg-current shrink-0`} />
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <button
              onClick={openMeetingModal}
              className="px-8 py-4 bg-cta-gradient text-[#ffffff] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Discuss Your Requirements
            </button>
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* --- 4. CAPITAL NETWORK MAP --- */}
      <section className="py-16 bg-bg-surface border-y border-gray-200 relative overflow-hidden">
        <SectionBackground seed="capital" density="high" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <span className="text-[10px] font-extrabold text-secondary uppercase tracking-widest bg-secondary/5 border border-secondary/10 px-3 py-1 rounded-full self-start">
                Capital Alliance Map
              </span>
              <h2 className="font-display font-black text-3.5xl sm:text-4xl text-white leading-tight">
                Matchmaking with Diverse Capital Pools
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                We align pre-screened dealflows with target investor groups. Hover over the nodes in our alliance diagram to explore typical ticket ranges.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <AnimatePresence mode="wait">
                  {hoveredNode ? (
                    <motion.div
                      key={hoveredNode}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 rounded-2xl bg-bg-surface-light/50 border border-gold/20 shadow-xl"
                    >
                      <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block mb-1">
                        {capitalNodes[hoveredNode].stage}
                      </span>
                      <h4 className="font-display font-bold text-white text-base mb-1.5">
                        {capitalNodes[hoveredNode].title} • <span className="text-gold">{capitalNodes[hoveredNode].ticket}</span>
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {capitalNodes[hoveredNode].desc}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-bg-surface-light/40 border border-gray-200 text-gray-500 text-xs italic flex items-center justify-center min-h-[120px]">
                      Hover over any node in the capital diagram to inspect investment thesis alignments.
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-2">
                <Link
                  href="/investor"
                  className="px-6 py-3.5 bg-cta-gradient text-[#ffffff] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg inline-flex items-center gap-1.5"
                >
                  Join Investor Syndicate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Map Visual Column */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] select-none">
                
                {/* SVG Connecting Lines with live glowing effects */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="50%"
                    y1="50%"
                    x2="20%"
                    y2="20%"
                    className={`transition-all duration-500 eco-svg-line ${
                      hoveredNode === "angels" ? "stroke-gold stroke-2" : "stroke-gray-300 stroke-[1.5]"
                    }`}
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="80%"
                    y2="20%"
                    className={`transition-all duration-500 eco-svg-line ${
                      hoveredNode === "family" ? "stroke-gold stroke-2" : "stroke-gray-300 stroke-[1.5]"
                    }`}
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="12%"
                    y2="55%"
                    className={`transition-all duration-500 eco-svg-line ${
                      hoveredNode === "vc" ? "stroke-gold stroke-2" : "stroke-gray-300 stroke-[1.5]"
                    }`}
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="88%"
                    y2="55%"
                    className={`transition-all duration-500 eco-svg-line ${
                      hoveredNode === "strategic" ? "stroke-gold stroke-2" : "stroke-gray-300 stroke-[1.5]"
                    }`}
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="50%"
                    y2="85%"
                    className={`transition-all duration-500 eco-svg-line ${
                      hoveredNode === "corp" ? "stroke-gold stroke-2" : "stroke-gray-300 stroke-[1.5]"
                    }`}
                  />
                </svg>

                {/* Center Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-light flex flex-col items-center justify-center text-bg-dark font-display font-black text-center text-[10px] tracking-widest uppercase shadow-xl shadow-gold/25 border border-gray-200 select-none animate-pulse-slow">
                  <span>EGA</span>
                  <span>ALLIANCE</span>
                </div>

                {/* Outer Nodes as interactive buttons */}
                <button
                  onMouseEnter={() => setHoveredNode("angels")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`absolute top-[10%] left-[2%] px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 focus:outline-none cursor-pointer ${
                    hoveredNode === "angels"
                      ? "bg-gold/10 border-gold text-gold shadow-lg shadow-gold/15 scale-105"
                      : "bg-bg-surface border border-gray-200 text-gray-500 hover:border-gold/50"
                  }`}
                >
                  <Coins className="w-4 h-4 text-gold" /> Angel Networks
                </button>

                <button
                  onMouseEnter={() => setHoveredNode("family")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`absolute top-[10%] right-[2%] px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 focus:outline-none cursor-pointer ${
                    hoveredNode === "family"
                      ? "bg-gold/10 border-gold text-gold shadow-lg shadow-gold/15 scale-105"
                      : "bg-bg-surface border border-gray-200 text-gray-500 hover:border-gold/50"
                  }`}
                >
                  <Layers className="w-4 h-4 text-gold" /> Family Offices
                </button>

                <button
                  onMouseEnter={() => setHoveredNode("vc")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`absolute top-[47%] left-[-2%] px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 focus:outline-none cursor-pointer ${
                    hoveredNode === "vc"
                      ? "bg-gold/10 border-gold text-gold shadow-lg shadow-gold/15 scale-105"
                      : "bg-bg-surface border border-gray-200 text-gray-500 hover:border-gold/50"
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-gold" /> Venture Capital
                </button>

                <button
                  onMouseEnter={() => setHoveredNode("strategic")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`absolute top-[47%] right-[-2%] px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 focus:outline-none cursor-pointer ${
                    hoveredNode === "strategic"
                      ? "bg-gold/10 border-gold text-gold shadow-lg shadow-gold/15 scale-105"
                      : "bg-bg-surface border border-gray-200 text-gray-500 hover:border-gold/50"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-gold" /> Strategic pools
                </button>

                <button
                  onMouseEnter={() => setHoveredNode("corp")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`absolute bottom-[4%] left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 focus:outline-none cursor-pointer ${
                    hoveredNode === "corp"
                      ? "bg-gold/10 border-gold text-gold shadow-lg shadow-gold/15 scale-105"
                      : "bg-bg-surface border border-gray-200 text-gray-500 hover:border-gold/50"
                  }`}
                >
                  <Cpu className="w-4 h-4 text-gold" /> Corporate VCs
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* --- 4.5 INTERACTIVE GROWTH BLUEPRINT GENERATOR --- */}
      <section className="py-16 theme-dark bg-primary border-y border-gray-200 relative overflow-hidden">
        <SectionBackground seed="blueprint" dark density="high" />
        <div className="absolute -top-1/3 left-1/4 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute -bottom-1/3 right-1/4 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/10 px-3 py-1 rounded-full">
              Interactive Planner
            </span>
            <h2 className="font-display font-black text-3.5xl sm:text-4xl text-white mt-4">
              EGA Interactive Growth Blueprint
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Select your sector, primary operational bottleneck, and revenue to generate a personalized scaling and audit checklist.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Input Selection Columns */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-bg-surface p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl justify-between">
              {/* Step 1: Sector */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block text-left">
                  1. Startup Sector
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "saas", label: "SaaS & Tech" },
                    { id: "d2c", label: "D2C Brands" },
                    { id: "health", label: "HealthTech" },
                    { id: "climate", label: "Climate & EV" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setBlueprintSector(s.id)}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        blueprintSector === s.id
                          ? "bg-gold border-gold text-bg-dark"
                          : "bg-bg-surface-light/40 border-gray-300 text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Challenge */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block text-left">
                  2. Primary Bottleneck
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "gtm", label: "Sales & GTM" },
                    { id: "compliance", label: "Legal & MCA" },
                    { id: "funding", label: "Fundraising" },
                    { id: "tech", label: "Tech Scaling" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setBlueprintChallenge(c.id)}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        blueprintChallenge === c.id
                          ? "bg-gold border-gold text-bg-dark"
                          : "bg-bg-surface-light/40 border-gray-300 text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Revenue Level */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block text-left">
                  3. Monthly Revenue (MRR)
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "pre", label: "Pre-Revenue" },
                    { id: "under2", label: "Under ₹2L" },
                    { id: "mid", label: "₹2L - ₹10L" },
                    { id: "high", label: "Above ₹10L" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setBlueprintRevenue(r.id)}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        blueprintRevenue === r.id
                          ? "bg-gold border-gold text-bg-dark"
                          : "bg-bg-surface-light/40 border-gray-300 text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Roadmap Card */}
            <div className="lg:col-span-7 flex flex-col h-full">
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold/20 flex flex-col gap-6 text-left h-full justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                    <div>
                      <h4 className="font-display font-black text-lg text-white">
                        EGA Custom Scaling Roadmap
                      </h4>
                      <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider block mt-0.5">
                        Blueprint Id: EGA-{blueprintSector.toUpperCase()}-{blueprintChallenge.toUpperCase()}-2026
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-extrabold text-gray-500 uppercase block">Estimated Audit</span>
                      <span className="text-xs font-bold text-white">6 Weeks Sprint</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Phase 1 */}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display font-black text-xs text-gold shrink-0">
                        1
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider">
                          Days 1 - 30: Operational Foundations
                        </span>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {getBlueprintData().d30}
                        </p>
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display font-black text-xs text-gold shrink-0">
                        2
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider">
                          Days 31 - 60: Growth & Distribution
                        </span>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {getBlueprintData().d60}
                        </p>
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display font-black text-xs text-gold shrink-0">
                        3
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider">
                          Days 61 - 90: Venture Matchmaking
                        </span>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {getBlueprintData().d90}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-5 mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-left">
                    <span className="text-[9px] font-extrabold text-gray-500 uppercase block">Target Stage</span>
                    <span className="text-xs font-bold text-white">
                      {blueprintRevenue === "pre" || blueprintRevenue === "under2" ? "Pre-Seed Syndicate" : "Seed & Growth Round"}
                    </span>
                  </div>
                  <Link
                    href="/apply"
                    className="w-full sm:w-auto px-6 py-3 bg-cta-gradient text-[#ffffff] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Apply With This Blueprint <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* --- 4.8 AREAS OF EXPERTISE --- */}
      <section id="expertise" className="py-20 theme-dark bg-primary border-y border-gray-200 relative overflow-hidden">
        <SectionBackground seed="expertise" dark density="high" />
        <div className="absolute -top-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute -bottom-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest bg-gold/5 border border-gold/10 px-3 py-1 rounded-full">
              Deep Domain Focus
            </span>
            <h2 className="font-display font-black text-3.5xl sm:text-4xl md:text-5xl text-white mt-5 leading-tight">
              Areas of <span className="gradient-text-gold">Expertise</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Seven specialized verticals where ElephantGod Accelerator delivers measurable, hands-on impact — from early-stage acceleration to growth-stage consulting.
            </p>
          </div>

          {/* 7-card grid: 3 + 3 + 1 centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteContent.expertise.map((item, idx) => {
              const config = [
                { icon: Sparkles, color: "text-gold", accent: "border-gold/25", bg: "bg-gold/5" },
                { icon: Coins, color: "text-secondary", accent: "border-secondary/25", bg: "bg-secondary/5" },
                { icon: Users, color: "text-accent", accent: "border-accent/25", bg: "bg-accent/5" },
                { icon: Award, color: "text-growth", accent: "border-growth/25", bg: "bg-growth/5" },
                { icon: Map, color: "text-primary", accent: "border-primary/25", bg: "bg-primary/5" },
                { icon: TrendingUp, color: "text-gold", accent: "border-gold/25", bg: "bg-gold/5" },
                { icon: BarChart3, color: "text-secondary", accent: "border-secondary/25", bg: "bg-secondary/5" }
              ][idx] || { icon: Sparkles, color: "text-gold", accent: "border-gold/25", bg: "bg-gold/5" };

              const IconComp = config.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className={`group relative flex flex-col gap-5 p-7 rounded-2xl border ${config.accent} bg-bg-surface-light/30 backdrop-blur-sm hover:bg-bg-surface-light/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                    idx === 6 ? "sm:col-start-1 sm:col-end-2 lg:col-start-2 lg:col-end-3" : ""
                  }`}
                >
                  {/* Corner glow */}
                  <div className={`absolute -bottom-8 -right-8 w-32 h-32 ${config.bg} rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Header row */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${config.color} shrink-0`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className={`font-display font-black text-2xl ${config.color} opacity-20 leading-none`}>
                        {item.number}
                      </span>
                      <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${config.accent} ${config.color} bg-white/5`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-display font-bold text-white text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full ${config.bg} bg-current ${config.color}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-20 bg-bg-dark relative overflow-hidden">
        <SectionBackground seed="pricing" density="medium" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest bg-gold/5 border border-gold/10 px-3 py-1 rounded-full">
              Structured Engagement
            </span>
            <h2 className="font-display font-black text-3.5xl sm:text-4xl md:text-5xl text-white mt-5 leading-tight">
              Flexible <span className="gradient-text-gold">Program Tracks</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Choose the level of engagement that fits your startup's stage. From strategic advisory to hands-on co-building sprints.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {siteContent.pricing.map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-bg-surface-light/40 border-gold shadow-[0_0_40px_rgba(201,169,110,0.15)] scale-[1.03] lg:-translate-y-1 z-10"
                    : "bg-bg-surface-light/20 border-white/5 hover:border-gold/30 hover:bg-bg-surface-light/30"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-600 text-bg-dark text-[9px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    {tier.badge || "Most Popular"}
                  </span>
                )}
                
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-display font-black text-white text-xl">{tier.name}</h3>
                      <p className="text-gray-500 text-xs mt-1">{tier.description}</p>
                    </div>
                    {!tier.highlighted && tier.badge && (
                      <span className="bg-white/5 border border-white/10 text-gray-400 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 my-6 border-b border-white/5 pb-6">
                    <span className="text-4xl font-black text-white tracking-tight">{tier.price}</span>
                    {tier.period && (
                      <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                        {tier.period}
                      </span>
                    )}
                  </div>

                  <ul className="flex flex-col gap-3.5 mb-8">
                    {tier.features.filter(Boolean).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.highlighted ? "text-gold" : "text-gray-500"}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-auto">
                  {tier.id === "accelerator" || tier.id === "advisory" ? (
                    <Link
                      href={tier.id === "advisory" ? "/apply?mode=membership" : "/apply"}
                      className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        tier.highlighted
                          ? "bg-cta-gradient text-[#ffffff] hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-gold/50"
                      }`}
                    >
                      {tier.cta || "Apply Now"} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      onClick={openMeetingModal}
                      className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                        tier.highlighted
                          ? "bg-cta-gradient text-[#ffffff] hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-gold/50"
                      }`}
                    >
                      {tier.cta || "Book Strategy Audit"} <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* --- 5. FOUNDER VOICE & MEDIA TICKER --- */}
      <section className="py-16 bg-bg-dark relative overflow-hidden">
        <SectionBackground seed="testimonials" density="medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider bg-gold/5 border border-gold/10 px-3 py-1 rounded-full">
              Ecosystem Voice
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-4">
              What Founders Say About Us
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="premium-card p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-1 text-left">
                  <span className="text-5xl text-gold/30 font-display font-black select-none block -mb-4">“</span>
                  <p className="text-gray-300 text-base sm:text-lg italic leading-relaxed mb-6 font-medium relative z-10">
                    {testimonialData[testimonialIdx].quote}
                  </p>
                  <div>
                    <h4 className="font-display font-bold text-white text-base">
                      {testimonialData[testimonialIdx].author}
                    </h4>
                    <span className="text-xs text-gray-500 uppercase tracking-widest mt-0.5 block">
                      {testimonialData[testimonialIdx].title}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-56 shrink-0 bg-bg-surface border border-gray-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider mb-2">
                    EGA Acceleration Impact
                  </span>
                  <span className="text-xl font-black text-white">
                    {testimonialData[testimonialIdx].impact}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Controls */}
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={() =>
                  setTestimonialIdx((prev) =>
                    prev === 0 ? testimonialData.length - 1 : prev - 1
                  )
                }
                className="w-10 h-10 rounded-xl bg-bg-surface border border-gray-200 flex items-center justify-center hover:bg-gold hover:text-bg-dark text-white transition-all focus:outline-none cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setTestimonialIdx((prev) =>
                    prev === testimonialData.length - 1 ? 0 : prev + 1
                  )
                }
                className="w-10 h-10 rounded-xl bg-bg-surface border border-gray-200 flex items-center justify-center hover:bg-gold hover:text-bg-dark text-white transition-all focus:outline-none cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Coverage Ticker */}
        <div className="mt-12 border-t border-gray-200 pt-8 overflow-hidden w-full relative z-10">
          <div className="text-center mb-5">
            <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
              Featured In & Media Coverage
            </span>
          </div>
          <div className="relative flex overflow-x-hidden py-4 bg-bg-surface-light/40 border-y border-gray-200">
            <div className="animate-infinite-scroll flex whitespace-nowrap gap-16 items-center">
              {[
                "YourStory",
                "Inc42",
                "VCCircle",
                "TechCircle",
                "Bloomberg India",
                "Business Standard",
              ].map((media, idx) => (
                <span
                  key={idx}
                  className="font-display font-extrabold text-xl text-gray-600 hover:text-gold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-gold/30" />
                  {media}
                </span>
              ))}
            </div>
            <div className="animate-infinite-scroll flex whitespace-nowrap gap-16 items-center" aria-hidden="true">
              {[
                "YourStory",
                "Inc42",
                "VCCircle",
                "TechCircle",
                "Bloomberg India",
                "Business Standard",
              ].map((media, idx) => (
                <span
                  key={idx}
                  className="font-display font-extrabold text-xl text-gray-600 hover:text-gold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-gold/30" />
                  {media}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. FINAL CALL TO ACTION --- */}
      <section className="py-16 theme-dark bg-primary border-t border-gray-200 relative overflow-hidden">
        <SectionBackground seed="cta" dark density="medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest bg-gold/5 border border-gold/10 px-3 py-1 rounded-full mb-4">
            Get Cohort Access
          </span>
          <h2 className="font-display font-black text-3.5xl sm:text-4xl text-white mb-4 leading-tight max-w-2xl">
            Ready to Build Your Startup's Growth Pipeline?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
            Apply to join our upcoming cohort or schedule a direct consultation audit regarding GTM CRM pipelines, capital readiness, and compliance setups.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/apply"
              className="px-8 py-4 bg-cta-gradient text-[#ffffff] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-xl hover:shadow-secondary/20 hover:scale-[1.01] transition-all cursor-pointer"
            >
              Apply for Accelerator
            </Link>
            <button
              onClick={openMeetingModal}
              className="px-8 py-4 bg-bg-surface border border-gray-300 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 hover:border-gold/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
