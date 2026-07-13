"use client";

import React, { useEffect } from "react";
import { 
  Shield, 
  Clock, 
  FileText, 
  Building, 
  Mail, 
  MapPin, 
  Check, 
  Briefcase, 
  Scale, 
  Users, 
  AlertCircle,
  HelpCircle,
  CreditCard,
  CheckCircle2,
  Lock,
  UserCheck,
  FileImage,
  Zap,
  Globe,
  Smartphone
} from "lucide-react";
import { motion } from "framer-motion";

export default function TermsAndConditionsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions – India Startup Week 2026";
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
            General Terms
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-4"
          >
            Terms & Conditions
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
                  <a href="#intro" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    Introduction
                  </a>
                  <a href="#use-of-services" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">01.</span> Use of Services
                  </a>
                  <a href="#ticketing" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">02.</span> Ticketing & Admission
                  </a>
                  <a href="#user-content" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">03.</span> User Content
                  </a>
                  <a href="#intellectual-property" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">04.</span> Intellectual Property
                  </a>
                  <a href="#liability" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">05.</span> Liability & Cancellations
                  </a>
                  <a href="#governing-law" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">06.</span> Governing Law
                  </a>
                  <a href="#contact" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">07.</span> Contact Details
                  </a>
                </nav>
              </div>
            </div>

            {/* Content Blocks */}
            <div className="col-span-1 lg:col-span-3 space-y-12 text-gray-300 text-sm leading-relaxed">
              
              {/* Introduction */}
              <motion.div 
                id="intro" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gold/10 via-gold/2 to-transparent border border-gold/20 scroll-mt-28"
              >
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  These General Terms and Conditions (the <strong className="text-white">"Terms"</strong>) set out the terms applicable to the use of India Startup Week Services, including the website <strong className="text-white">www.indiastartupweek.in</strong>, mobile applications, online platforms, and physical events (collectively, <strong className="text-white">"Services"</strong>). By using these Services, you agree to comply with and be bound by these Terms.
                </p>
              </motion.div>

              {/* 1. USE OF SERVICES */}
              <motion.div 
                id="use-of-services" 
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
                    Use of Services
                  </h2>
                </div>
                <div className="space-y-4 mt-2">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold">Users</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Services can be used by individuals (<strong className="text-white">"Individual User"</strong>) or authorized representatives of legal entities (<strong className="text-white">"Business User"</strong>). Business Users confirm they have the authority to bind their entity to these Terms.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 border-t border-gray-200/5 pt-3">
                    <UserCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold">User Accounts</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Users may be required to create a profile (<strong className="text-white">"User Account"</strong>). You are responsible for providing accurate data and maintaining the security of your account credentials.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-gray-200/5 pt-3">
                    <Lock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold">Account Termination</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        India Startup Week reserves the right to terminate any account at its discretion, particularly in cases of breach of these Terms, misleading information, or illegal activity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-gray-200/5 pt-3">
                    <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold">Restrictions</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Users may not sign up for others, transmit spam/advertising, violate intellectual property rights, or transmit malicious code (viruses, malware, etc.).
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2. TICKETING AND ADMISSION */}
              <motion.div 
                id="ticketing" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    2
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Ticketing and Admission
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <span className="px-2 py-0.5 text-[9px] font-extrabold bg-gold/10 border border-gold/20 rounded text-gold uppercase tracking-wider block w-fit mb-2">
                      Final Sale
                    </span>
                    <p className="text-xs text-gray-400">
                      All ticket purchases made through the website or authorized third-party platforms are <strong className="text-white">final and non-refundable</strong>.
                    </p>
                  </div>

                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <span className="px-2 py-0.5 text-[9px] font-extrabold bg-gold/10 border border-gold/20 rounded text-gold uppercase tracking-wider block w-fit mb-2">
                      Personal Use
                    </span>
                    <p className="text-xs text-gray-400">
                      Tickets are personal. Transferring a ticket to another registered user must be done at least <strong className="text-white">seven (7) days</strong> prior to the scheduled event.
                    </p>
                  </div>

                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <span className="px-2 py-0.5 text-[9px] font-extrabold bg-gold/10 border border-gold/20 rounded text-gold uppercase tracking-wider block w-fit mb-2">
                      Age Restriction
                    </span>
                    <p className="text-xs text-gray-400">
                      Persons under the age of 18 are not permitted entry to the venue or platform without prior written permission from India Startup Week.
                    </p>
                  </div>

                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <span className="px-2 py-0.5 text-[9px] font-extrabold bg-gold/10 border border-gold/20 rounded text-gold uppercase tracking-wider block w-fit mb-2">
                      Admission Refusal
                    </span>
                    <p className="text-xs text-gray-400">
                      We reserve the right to refuse admission for behavior deemed unacceptable or for breach of the event's Code of Conduct.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-bg-surface-light/40 border border-gray-200/5 rounded-xl flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Badge Policy</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      For physical events, users must exchange or show their ticket (softcopy if applicable) for an entrance badge by presenting a valid photo ID. Lost or stolen badges will not be replaced.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 3. USER CONTENT */}
              <motion.div 
                id="user-content" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-sm">
                    3
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    User Content
                  </h2>
                </div>
                <div className="space-y-4 mt-2 text-xs">
                  <div className="flex gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Responsibility:</strong> Users are solely responsible for content (text, photos, etc.) they upload to the platform.
                    </div>
                  </div>
                  <div className="flex gap-2.5 border-t border-gray-200/5 pt-3">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Rights:</strong> We reserve the right to remove any content that is offensive, defamatory, or violates third-party intellectual property rights.
                    </div>
                  </div>
                  <div className="flex gap-2.5 border-t border-gray-200/5 pt-3">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Usage Right:</strong> By submitting content, you grant India Startup Week the right to use it for providing and developing Services, including for promotional and statistical purposes.
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 4. INTELLECTUAL PROPERTY */}
              <motion.div 
                id="intellectual-property" 
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
                    Intellectual Property
                  </h2>
                </div>
                <p className="mb-4">
                  All intellectual property rights associated with the Services are safeguarded:
                </p>
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 bg-bg-surface-light/20 p-4 rounded-xl border border-gray-200/5">
                    <Shield className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Ownership</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        India Startup Week owns all intellectual property rights related to the Services, including the brand name, logo, and website content.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-bg-surface-light/20 p-4 rounded-xl border border-gray-200/5">
                    <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Third-Party Events Restriction</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        No company or individual may organize an event purporting to be related to India Startup Week without prior written consent.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 5. LIABILITY AND CANCELLATIONS */}
              <motion.div 
                id="liability" 
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
                    Liability and Cancellations
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <h4 className="text-white font-bold text-sm mb-1">Service Availability</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      We strive for continuous operation but are not liable for temporary interruptions due to maintenance or technical difficulties.
                    </p>
                  </div>
                  <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                    <h4 className="text-white font-bold text-sm mb-1">Schedule Changes</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      We reserve the right to change event dates, speakers, or topics due to unforeseen circumstances without liability.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5">
                  <h4 className="text-white font-bold text-sm mb-1">Limitation of Liability</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    To the maximum extent permitted by law, India Startup Week is not liable for any direct or indirect damages arising from your participation in the event or use of the Services.
                  </p>
                </div>
                <div className="mt-4 p-4 bg-gold/5 border border-gold/15 rounded-xl">
                  <h4 className="text-gold font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    Force Majeure
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1">
                    We are not liable for delays or non-performance caused by events beyond our control, including natural disasters, war, pandemics (including COVID-19 mutations), or cyberattacks.
                  </p>
                </div>
              </motion.div>

              {/* 6. GOVERNING LAW */}
              <motion.div 
                id="governing-law" 
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
                    Governing Law
                  </h2>
                </div>
                <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5 flex items-start gap-3">
                  <Scale className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Indian Jurisdiction & Arbitrage</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      These Terms shall be governed by the laws of India. Any disputes shall first be subject to amicable negotiations. If no settlement is reached, disputes shall be settled in the courts of Bengaluru, India.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 7. CONTACT */}
              <motion.div 
                id="contact" 
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
                    Contact Details
                  </h2>
                </div>
                <p className="mb-4">
                  For questions or clarifications regarding these General Terms and Conditions, please contact us at:
                </p>
                <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl flex items-center gap-3 w-fit">
                  <Mail className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Address</h4>
                    <a href="mailto:hello@indiastartupweek.in" className="text-gold hover:underline text-sm font-semibold block mt-0.5">
                      hello@indiastartupweek.in
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Acceptance Agreement statement */}
              <motion.div 
                id="acknowledgment"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gold/15 via-gold/5 to-transparent border border-gold/30 scroll-mt-28"
              >
                <h3 className="font-display font-black text-lg text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                  General Terms & Conditions Agreement
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  By utilizing <strong className="text-white">www.indiastartupweek.in</strong>, our digital online tools, or by registering for and attending India Startup Week Events, you explicitly accept, declare consent, and agree to be bound by these Terms & Conditions.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
