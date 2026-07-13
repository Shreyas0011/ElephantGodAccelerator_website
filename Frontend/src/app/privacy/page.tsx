"use client";

import React, { useEffect } from "react";
import { 
  Shield, 
  Clock, 
  Lock, 
  Mail, 
  MapPin, 
  Building, 
  User, 
  Eye, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Info,
  Cookie,
  RefreshCw,
  Check,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy – India Startup Week 2026";
  }, []);

  return (
    <div className="pt-24 pb-16 bg-bg-dark min-h-screen theme-dark relative">
      {/* Glow orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="glow-orb glow-orb-orange top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]" />
        <div className="glow-orb glow-orb-gold top-[40%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px]" />
      </div>

      {/* Page Header */}
      <section className="relative py-16 overflow-hidden border-b border-gray-200 bg-gradient-to-r from-bg-dark to-bg-surface/30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-extrabold text-gold uppercase tracking-wider bg-bg-surface border border-gray-200 px-3 py-1 rounded-full"
          >
            Legal & Compliance
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-gray-400 text-xs sm:text-sm max-w-xl mx-auto"
          >
            <Clock className="w-4 h-4 text-gold" />
            <span>Last Updated: <strong className="text-white">June 28, 2026</strong></span>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Table of Contents - Sticky Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 space-y-4 bg-bg-surface-light/40 backdrop-blur-md p-6 rounded-2xl border border-gray-200/10">
                <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider border-b border-gray-200/10 pb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gold" />
                  Table of Contents
                </h3>
                <nav className="flex flex-col gap-2.5 text-[13px]">
                  <a href="#background" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">01.</span> Background & Purpose
                  </a>
                  <a href="#controller" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">02.</span> Contact Details
                  </a>
                  <a href="#data-collected" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">03.</span> Data We Collect
                  </a>
                  <a href="#grounds" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">04.</span> Purposes & Grounds
                  </a>
                  <a href="#disclosures" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">05.</span> Disclosures & Sharing
                  </a>
                  <a href="#storage" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">06.</span> Storage & Security
                  </a>
                  <a href="#storage-period" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">07.</span> Storage Period
                  </a>
                  <a href="#rights" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">08.</span> Your Rights
                  </a>
                  <a href="#cookies" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">09.</span> Cookies
                  </a>
                  <a href="#changes" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">10.</span> Changes to Policy
                  </a>
                  <a href="#consent" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5 border-t border-gray-200/10 pt-2 mt-1">
                    Acknowledgment & Consent
                  </a>
                </nav>
              </div>
            </div>

            {/* Content Blocks */}
            <div className="col-span-1 lg:col-span-3 space-y-12 text-gray-300 text-sm leading-relaxed">
              
              {/* 1. Background and Purpose */}
              <motion.div 
                id="background" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    1
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Background and Purpose
                  </h2>
                </div>
                <p className="mb-4">
                  India Startup Week (hereinafter <strong className="text-white">“ISW”</strong>, <strong className="text-white">“we”</strong>, or <strong className="text-white">“us”</strong>) is a platform dedicated to fostering the Indian startup ecosystem through events, networking, and digital services. To provide our services (the “Services”) and organize our flagship and satellite events (the “Events”), we process personal data of our attendees, speakers, partners, and volunteers (<strong className="text-white">“User”</strong> or <strong className="text-white">“you”</strong>).
                </p>
                <p className="mb-4">
                  This Privacy Policy explains:
                </p>
                <ul className="space-y-2.5 mt-2">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>What personal data we collect and why.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>How we use and protect your data.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Your rights regarding your personal information under applicable laws, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.</span>
                  </li>
                </ul>
              </motion.div>

              {/* 2. Controller Contact Details */}
              <motion.div 
                id="controller"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    2
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Controller Contact Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl flex items-start gap-3">
                    <Building className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider">Company Name</h4>
                      <p className="text-white text-sm font-semibold mt-1">U2O3Info Tech Pvt Ltd</p>
                    </div>
                  </div>
                  <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Address</h4>
                      <a href="mailto:hello@indiastartupweek.in" className="text-gold hover:underline text-sm font-semibold mt-1 block">
                        hello@indiastartupweek.in
                      </a>
                    </div>
                  </div>
                  <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider">Address</h4>
                      <p className="text-white text-xs mt-1 leading-relaxed">
                        71/2, Sai Arcade, Kanakpura Main Road, 6th Phase, J.P. Nagar, Bengaluru, KA 560078
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Personal Data We Collect */}
              <motion.div 
                id="data-collected"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-28 space-y-6"
              >
                <div className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                      3
                    </span>
                    <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                      Personal Data We Collect
                    </h2>
                  </div>
                  <p className="mb-6">
                    We categorize the data we collect into <strong className="text-white">"User Data"</strong> and <strong className="text-white">"Technical Data."</strong>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Data Card */}
                    <div className="bg-bg-surface-light/30 border border-gray-200/5 p-5 rounded-xl space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200/10">
                        <User className="w-4 h-4 text-gold" />
                        <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
                          A. User Data (Provided by you)
                        </h3>
                      </div>
                      <ul className="space-y-3 text-xs leading-relaxed text-gray-400">
                        <li>
                          <strong className="text-white block mb-0.5">Registration:</strong> Full name, email address, company name, and contact number.
                        </li>
                        <li>
                          <strong className="text-white block mb-0.5">Profile Information:</strong> Profile picture, short bio, industry interests, social media links (LinkedIn/Twitter), and pronouns.
                        </li>
                        <li>
                          <strong className="text-white block mb-0.5">Networking & Matchmaking:</strong> Information shared via our meeting tools, including investment interests, startup stage, and meeting preferences.
                        </li>
                        <li>
                          <strong className="text-white block mb-0.5">Transactions:</strong> Details of ticket purchases and payment history (we do not store full credit card numbers; these are handled by our secure payment processors).
                        </li>
                      </ul>
                    </div>

                    {/* Technical Data Card */}
                    <div className="bg-bg-surface-light/30 border border-gray-200/5 p-5 rounded-xl space-y-4 h-full">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200/10">
                        <Cookie className="w-4 h-4 text-gold" />
                        <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
                          B. Technical Data (Collected automatically)
                        </h3>
                      </div>
                      <ul className="space-y-4 text-xs leading-relaxed text-gray-400">
                        <li>
                          <strong className="text-white block mb-0.5">Device & Network:</strong> IP address, browser type, device information, and operating system.
                        </li>
                        <li>
                          <strong className="text-white block mb-0.5">Analytics & Tracking:</strong> Cookies and tracking technologies to analyze website traffic and improve user experience.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 4. Purposes and Legal Grounds */}
              <motion.div 
                id="grounds"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    4
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Purposes and Legal Grounds for Processing
                  </h2>
                </div>
                <p className="mb-6">
                  We process your data based on the following legal grounds:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200/5 bg-bg-surface-light/40">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-gold/10 border border-gold/20 rounded text-gold uppercase tracking-wider block w-fit mb-2">
                      Performance of Contract
                    </span>
                    <p className="text-xs text-gray-400">
                      To handle your registration, issue tickets, and provide access to event platforms.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200/5 bg-bg-surface-light/40">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-gold/10 border border-gold/20 rounded text-gold uppercase tracking-wider block w-fit mb-2">
                      Legitimate Interest
                    </span>
                    <p className="text-xs text-gray-400">
                      To facilitate networking between attendees, improve our Services, and send event-related updates.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200/5 bg-bg-surface-light/40">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-gold/10 border border-gold/20 rounded text-gold uppercase tracking-wider block w-fit mb-2">
                      Consent
                    </span>
                    <p className="text-xs text-gray-400">
                      For electronic direct marketing (newsletters) and the use of non-essential cookies.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200/5 bg-bg-surface-light/40">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-gold/10 border border-gold/20 rounded text-gold uppercase tracking-wider block w-fit mb-2">
                      Legal Obligation
                    </span>
                    <p className="text-xs text-gray-400">
                      To comply with Indian tax laws (GST) and bookkeeping requirements.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 5. Data Disclosures and Sharing */}
              <motion.div 
                id="disclosures"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    5
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Data Disclosures and Sharing
                  </h2>
                </div>
                <p className="mb-4">
                  We do not sell your data. We only share data in the following scenarios:
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-semibold">Authorized Service Providers</p>
                      <p className="text-xs text-gray-400 mt-0.5">Cloud hosting (e.g., AWS/Google Cloud), payment gateways (e.g., Razorpay/Stripe), and email marketing tools.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 border-t border-gray-200/5 pt-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-semibold">Event Partners</p>
                      <p className="text-xs text-gray-400 mt-0.5">If you opt-in to share your details with specific sponsors or via "Lead Scanning" during the event.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 border-t border-gray-200/5 pt-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-semibold">Legal Requirements</p>
                      <p className="text-xs text-gray-400 mt-0.5">When required by law enforcement or government authorities under Indian law.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 6. Data Storage and Security */}
              <motion.div 
                id="storage"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    6
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Data Storage and Security
                  </h2>
                </div>
                <div className="flex items-start gap-4 bg-bg-surface-light/30 p-5 rounded-xl border border-gray-200/5">
                  <Lock className="w-8 h-8 text-gold shrink-0" />
                  <div>
                    <p className="mb-2">
                      Your data is primarily stored on secure servers within <strong className="text-white">India</strong>.
                    </p>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      We implement industry-standard technical and organizational measures (encryption, firewalls, and access controls) to prevent unauthorized access or data breaches.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 7. Storage Period */}
              <motion.div 
                id="storage-period"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    7
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Storage Period
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-white font-semibold text-sm">
                      <Clock className="w-4 h-4 text-gold" />
                      Account Data
                    </div>
                    <p className="text-xs text-gray-400">
                      Retained for up to <strong className="text-white">five (5) years</strong> after your last interaction with our Services.
                    </p>
                  </div>
                  <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-white font-semibold text-sm">
                      <Database className="w-4 h-4 text-gold" />
                      Event Specific Data
                    </div>
                    <p className="text-xs text-gray-400">
                      Deleted or anonymized <strong className="text-white">three (3) years</strong> after the completion of the specific Event, unless required for legal or tax purposes.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 8. Your Rights */}
              <motion.div 
                id="rights"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    8
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Your Rights
                  </h2>
                </div>
                <p className="mb-4 text-gray-400">
                  As a data subject, you have the following rights under applicable regulations:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <h4 className="text-white font-bold text-sm mb-1">Right to Access</h4>
                    <p className="text-xs text-gray-400">Request a copy of the personal data we hold about you.</p>
                  </div>
                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <h4 className="text-white font-bold text-sm mb-1">Right to Rectification</h4>
                    <p className="text-xs text-gray-400">Ask us to correct inaccurate or incomplete information.</p>
                  </div>
                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <h4 className="text-white font-bold text-sm mb-1">Right to Erasure</h4>
                    <p className="text-xs text-gray-400">("Right to be Forgotten") Request the deletion of your data when it is no longer necessary for the purposes collected.</p>
                  </div>
                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <h4 className="text-white font-bold text-sm mb-1">Right to Withdraw Consent</h4>
                    <p className="text-xs text-gray-400">Unsubscribe from marketing communications or opt-out at any time.</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gold/5 border border-gold/15 rounded-xl flex items-center gap-3">
                  <Info className="w-5 h-5 text-gold shrink-0" />
                  <p className="text-xs text-gray-300">
                    To exercise these rights, please contact us at{" "}
                    <a href="mailto:hello@indiastartupweek.in" className="text-gold font-bold hover:underline">
                      hello@indiastartupweek.in
                    </a>.
                  </p>
                </div>
              </motion.div>

              {/* 9. Cookies */}
              <motion.div 
                id="cookies"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    9
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Cookies
                  </h2>
                </div>
                <p className="mb-3">
                  We use cookies to personalize content and analyze our traffic. You can manage your cookie preferences through your browser settings.
                </p>
                <p className="text-gray-400 text-xs">
                  Please note that declining or disabling cookies may limit your ability to use or access certain interactive features of the ISW platform.
                </p>
              </motion.div>

              {/* 10. Changes to this Policy */}
              <motion.div 
                id="changes"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    10
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Changes to This Policy
                  </h2>
                </div>
                <p className="mb-3">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                </p>
                <p className="text-gray-400 text-xs">
                  We will notify you of any significant changes by posting the new policy on our website.
                </p>
              </motion.div>

              {/* Acknowledgment & Consent */}
              <motion.div 
                id="consent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gold/15 via-gold/5 to-transparent border border-gold/30 scroll-mt-28"
              >
                <h3 className="font-display font-black text-lg text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                  Consent & Acceptance
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  By using <strong className="text-white">www.indiastartupweek.in</strong> and registering for our Events, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
