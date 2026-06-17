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
} from "lucide-react";
import HeroCanvas from "@/components/HeroCanvas";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { openMeetingModal } = useApp();

  // Stats Counters
  const [stats, setStats] = useState({ portfolio: 0, savings: 0, partners: 0 });
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStats({
        portfolio: Math.min(18, Math.round((18 / steps) * currentStep)),
        savings: Math.min(40, Math.round((40 / steps) * currentStep)),
        partners: Math.min(50, Math.round((50 / steps) * currentStep)),
      });

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Capital Ecosystem Hover State
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const capitalNodes: Record<
    string,
    { title: string; stage: string; ticket: string; desc: string }
  > = {
    angels: {
      title: "Angel Networks",
      stage: "Pre-Seed / Seed",
      ticket: "₹10L - ₹50L",
      desc: "Early syndicates and HNI pools focused on validating initial product concepts and prototype traction.",
    },
    family: {
      title: "Family Offices",
      stage: "Seed / Series A",
      ticket: "₹50L - ₹2Cr",
      desc: "Long-term, patient institutional capital looking for sustainable unit economics and corporate governance.",
    },
    vc: {
      title: "Venture Capitals",
      stage: "Series A / Series B",
      ticket: "₹2Cr - ₹10Cr",
      desc: "Institutional growth-stage funds scaling established PMF models to national and global levels.",
    },
    strategic: {
      title: "Strategic Investors",
      stage: "Growth Stage",
      ticket: "Custom Ticket",
      desc: "Industry experts and joint-venture partners offering proprietary channel distribution and regulatory support.",
    },
    corp: {
      title: "Corporate Venture",
      stage: "Syndicate / M&A",
      ticket: "Above ₹5Cr",
      desc: "Large enterprise conglomerates matching technology architectures with parent systems for acquisition or integration.",
    },
  };

  // Testimonial State
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const testimonialData = [
    {
      quote:
        "ElephantGod Accelerator did not just consult us; they became our operational execution department. We optimized our core unit economics and restructured our CRM pipeline, leading to a 40% save in operating expenses.",
      author: "Venkata Raman",
      title: "Co-Founder, Ingo Electric",
      impact: "40% Ops Savings",
    },
    {
      quote:
        "Mr. Ramani Iyer's active guidance helped us structure our distribution system. The shared services support for compliance and MCA audits saved us months of overhead.",
      author: "Radha Krishnan",
      title: "Founder, Ammamma's",
      impact: "MCA Compliance Cleared",
    },
  ];

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
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-center bg-hero-gradient theme-dark">
        {/* Dynamic canvas backdrop */}
        <HeroCanvas />
        {/* Technical Grid overlay */}
        <div className="absolute inset-0 cyber-grid pointer-events-none z-0" />
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center gap-7">
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-extrabold bg-bg-surface border border-gray-200 rounded-full text-gold uppercase tracking-widest shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            Venture Acceleration & Operational Growth Platform
          </div>

          {/* Premium Typographic Title */}
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight max-w-4xl">
            We build the operational systems that turn startups into{" "}
            <span className="gradient-text-gold">Market Leaders</span>
          </h1>

          {/* Clean Subtitle */}
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Elephant God Accelerator works alongside founders as hands-on execution partners, driving Go-To-Market blueprints, compliance systems, B2B sales automation, and institutional fundraising.
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
      <section className="relative border-y border-gray-200 theme-dark bg-primary py-12 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center mb-10">
            <div className="p-6 rounded-2xl bg-bg-surface-light/60 border border-gray-200 backdrop-blur-sm flex flex-col gap-1.5">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stats.portfolio}</span>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">
                Vetted Cohort Startups
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-bg-surface-light/60 border border-gray-200 backdrop-blur-sm flex flex-col gap-1.5">
              <span className="text-3xl sm:text-4xl font-black text-gold tracking-tight">{stats.savings}%</span>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">
                Recurring Overhead Saved
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-bg-surface-light/60 border border-gray-200 backdrop-blur-sm flex flex-col gap-1.5">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stats.partners}+</span>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">
                Institutional Partners
              </span>
            </div>
          </div>

          {/* Smooth Horizontal Logo Wall */}
          <div className="w-full flex flex-col gap-4 border-t border-gray-200 pt-8">
            <span className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest text-center">
              Accelerated Cohorts & Featured Portfolio Spotlights
            </span>
            <div className="relative flex overflow-x-hidden py-4 w-full opacity-85 hover:opacity-100 transition-opacity duration-300">
              <div className="animate-infinite-scroll flex whitespace-nowrap gap-12 items-center">
                {[
                  { name: "Mykhaana", src: "mykhaana.jpg" },
                  { name: "CosmicEye", src: "cosmiceye.jpg" },
                  { name: "Tribal Brew Coffee", src: "tribalbrew.jpg" },
                  { name: "Just Connect Electricals", src: "justconnect.jpg" },
                  { name: "Myniwa", src: "myniwa.jpg" },
                  { name: "Ammamma's", src: "ammammas.jpg" },
                  { name: "Olive Living", src: "olive.jpg" },
                  { name: "Discreet Arts", src: "discreetarts.jpg" },
                  { name: "Charze Max", src: "charzemax.jpg" },
                  { name: "World 5 Fund", src: "world5fund.jpg" },
                  { name: "Genie Pads", src: "geniepads.jpg" },
                  { name: "Melvin Jones", src: "melvinjones.jpg" },
                  { name: "Abnandan Enviro", src: "abnandanenviro.jpg" },
                  { name: "Spykke", src: "spykke.jpg" },
                  { name: "DEFA", src: "defa.jpg" },
                  { name: "Sutton & Shaw", src: "suttonandshaw.jpg" },
                  { name: "DesiLLM", src: "desillm.jpg" },
                  { name: "Elephantgod Infra", src: "elephantgodinfra.jpg" },
                  { name: "GRV Academy", src: "grvacademy.jpg" },
                  { name: "R Cube MedTech", src: "rcubemedtech.jpg" },
                ].map((logo, idx) => (
                  <div key={idx} className="bg-[#ffffff] px-6 py-3.5 rounded-2xl flex items-center justify-center shadow-lg h-16 w-48 shrink-0 select-none transition-transform hover:scale-105">
                    <img
                      src={`/logos/${logo.src}`}
                      alt={logo.name}
                      className="max-h-full max-w-full object-contain filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
              <div className="animate-infinite-scroll flex whitespace-nowrap gap-12 items-center" aria-hidden="true">
                {[
                  { name: "Mykhaana", src: "mykhaana.jpg" },
                  { name: "CosmicEye", src: "cosmiceye.jpg" },
                  { name: "Tribal Brew Coffee", src: "tribalbrew.jpg" },
                  { name: "Just Connect Electricals", src: "justconnect.jpg" },
                  { name: "Myniwa", src: "myniwa.jpg" },
                  { name: "Ammamma's", src: "ammammas.jpg" },
                  { name: "Olive Living", src: "olive.jpg" },
                  { name: "Discreet Arts", src: "discreetarts.jpg" },
                  { name: "Charze Max", src: "charzemax.jpg" },
                  { name: "World 5 Fund", src: "world5fund.jpg" },
                  { name: "Genie Pads", src: "geniepads.jpg" },
                  { name: "Melvin Jones", src: "melvinjones.jpg" },
                  { name: "Abnandan Enviro", src: "abnandanenviro.jpg" },
                  { name: "Spykke", src: "spykke.jpg" },
                  { name: "DEFA", src: "defa.jpg" },
                  { name: "Sutton & Shaw", src: "suttonandshaw.jpg" },
                  { name: "DesiLLM", src: "desillm.jpg" },
                  { name: "Elephantgod Infra", src: "elephantgodinfra.jpg" },
                  { name: "GRV Academy", src: "grvacademy.jpg" },
                  { name: "R Cube MedTech", src: "rcubemedtech.jpg" },
                ].map((logo, idx) => (
                  <div key={idx} className="bg-[#ffffff] px-6 py-3.5 rounded-2xl flex items-center justify-center shadow-lg h-16 w-48 shrink-0 select-none transition-transform hover:scale-105">
                    <img
                      src={`/logos/${logo.src}`}
                      alt={logo.name}
                      className="max-h-full max-w-full object-contain filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE EGA EXECUTION MODEL (Consolidated Framework) --- */}
      <section id="programs" className="py-28 bg-bg-surface/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
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
                  href="/apply"
                  className="text-xs font-extrabold text-gold hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  Take Funding Readiness Quiz <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
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

      {/* --- 3. THE MENTORSHIP COUNCIL (Balanced Grid Layout) --- */}
      <section className="py-28 theme-dark bg-primary border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
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

      {/* --- 4. CAPITAL NETWORK MAP --- */}
      <section className="py-28 bg-bg-surface border-y border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
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

      {/* --- 4.5 INTERACTIVE GROWTH BLUEPRINT GENERATOR --- */}
      <section className="py-28 theme-dark bg-primary border-y border-gray-200 relative overflow-hidden">
        {/* Background Grid & Ambient Glows */}
        <div className="absolute inset-0 cyber-grid pointer-events-none z-0" />
        <div className="absolute -top-1/3 left-1/4 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-1/3 right-1/4 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
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

      {/* --- 5. FOUNDER VOICE & MEDIA TICKER --- */}
      <section className="py-28 bg-bg-dark relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
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
        <div className="mt-24 border-t border-gray-200 pt-16 overflow-hidden w-full">
          <div className="text-center mb-8">
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
      <section className="py-28 theme-dark bg-primary border-t border-gray-200 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest bg-gold/5 border border-gold/10 px-3 py-1 rounded-full mb-6">
            Get Cohort Access
          </span>
          <h2 className="font-display font-black text-3.5xl sm:text-4xl text-white mb-4 leading-tight max-w-2xl">
            Ready to Build Your Startup's Growth Pipeline?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
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
