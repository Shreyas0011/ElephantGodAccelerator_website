"use client";

import React, { useEffect } from "react";
import Link from "next/link";
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
  AlertCircle,
  CreditCard,
  CheckCircle2,
  Lock,
  Zap,
  ArrowLeft,
  RefreshCw,
  XCircle,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";

export default function CancellationRefundPolicyPage() {
  useEffect(() => {
    document.title = "Cancellation & Refund Policy – Elephant God Accelerator";
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
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <Link 
              href="/#site-footer" 
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gold hover:border-gold/30 transition-all bg-bg-surface-light/40 border border-gray-200/10 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-extrabold text-gold uppercase tracking-wider bg-bg-surface border border-gray-200 px-3 py-1 rounded-full"
          >
            Refund Policy
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-4"
          >
            Cancellation & Refund Policy
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-gray-400 text-xs sm:text-sm max-w-xl mx-auto"
          >
            <Clock className="w-4 h-4 text-gold" />
            <span>Effective Date: <strong className="text-white">July 15, 2026</strong></span>
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
                  <a href="#no-cancellation" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">01.</span> No Cancellation
                  </a>
                  <a href="#no-refund" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">02.</span> No Refund
                  </a>
                  <a href="#no-rescheduling" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">03.</span> Rescheduling & Transfer
                  </a>
                  <a href="#payment-gateways" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">04.</span> Payment Gateways
                  </a>
                  <a href="#service-delivery" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">05.</span> Service Delivery
                  </a>
                  <a href="#exceptional-circumstances" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">06.</span> Exceptional Cases
                  </a>
                  <a href="#governing-law" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">07.</span> Governing Law
                  </a>
                  <a href="#changes" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5">
                    <span className="text-gold font-bold">08.</span> Changes to Policy
                  </a>
                  <a href="#contact" className="text-gray-400 hover:text-gold transition-colors font-medium flex items-center gap-1.5 border-t border-gray-200/10 pt-2 mt-1">
                    <span className="text-gold font-bold">09.</span> Contact Us
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
                  This Cancellation & Refund Policy (<strong className="text-white">"Policy"</strong>) governs the purchase of advisory, consulting, mentoring, networking, event participation, educational, assessment, and other professional services offered by <strong className="text-white">Elephantgod Accelerator Pvt. Ltd.</strong> (<strong className="text-white">"Company"</strong>, <strong className="text-white">"we"</strong>, <strong className="text-white">"our"</strong>, or <strong className="text-white">"us"</strong>) through our website or any online payment platform.
                </p>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mt-4">
                  By purchasing any service from the Company, you acknowledge that you have read, understood, and agreed to this Policy.
                </p>
              </motion.div>

              {/* 1. NO CANCELLATION */}
              <motion.div 
                id="no-cancellation" 
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
                    No Cancellation
                  </h2>
                </div>
                <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">All Purchases are Final</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      All orders placed for advisory packages, consulting services, mentoring sessions, networking events, conferences, workshops, masterclasses, digital reports, assessments, strategy documents, subscriptions, memberships, and any other professional, educational, business support, or event-related services offered by the Company are final. Once payment has been successfully processed, the order cannot be cancelled.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2. NO REFUND */}
              <motion.div 
                id="no-refund" 
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
                    No Refund
                  </h2>
                </div>
                <p className="mb-4">
                  All payments made to the Company are non-refundable due to the nature of the professional services offered, including the allocation of expert resources, event planning, reservation of seats, scheduling of personnel, and the provision of intellectual property.
                </p>
                
                <div className="bg-bg-surface-light/30 rounded-xl border border-gray-200/5 p-4 mb-4">
                  <p className="text-white font-semibold text-sm mb-2">Refunds will not ordinarily be provided for any reason, including but not limited to:</p>
                  <ul className="space-y-2.5 mt-2 text-xs text-gray-400">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>Change of mind.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>Failure to attend or participate in an event, consultation, workshop, or networking session.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>Failure to avail or complete the purchased service.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>Dissatisfaction with the advice, recommendations, training, or business outcomes.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>Delay by the Client in providing information or participating in the engagement.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>Scheduling conflicts or personal circumstances of the Client.</span>
                    </li>
                  </ul>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Nothing in this Policy shall limit or exclude any refund or remedy that is required under applicable law.
                </p>
              </motion.div>

              {/* 3. NO RESCHEDULING OR TRANSFER */}
              <motion.div 
                id="no-rescheduling" 
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
                    No Rescheduling or Transfer
                  </h2>
                </div>
                <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5 flex items-start gap-3 mb-4">
                  <RefreshCw className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Scheduled Engagements are Final</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Where a purchased service includes scheduled consultation sessions, mentoring sessions, workshops, networking events, conferences, or similar engagements, the scheduled date, time, and participant registration are final.
                    </p>
                  </div>
                </div>
                <p className="mb-4">
                  Requests for rescheduling, postponement, substitution, transfer of registration to another person, or replacement of sessions or event participation will not be accepted.
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Failure to attend a scheduled session or event for any reason shall be deemed as completion of the service, and no refund, replacement, credit, transfer, or rescheduling shall be provided.
                </p>
              </motion.div>

              {/* 4. PAYMENT GATEWAY TRANSACTIONS */}
              <motion.div 
                id="payment-gateways" 
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
                    Payment Gateway Transactions
                  </h2>
                </div>
                <p className="mb-4">
                  Payments made through third-party payment gateways including, but not limited to, Razorpay, Paytm, PhonePe, Cashfree, CCAvenue, Stripe, UPI, net banking, debit cards, credit cards, wallets, or any other online payment method shall be governed by this Policy.
                </p>
                <p className="mb-4">
                  The successful processing of a payment does not entitle the purchaser to cancellation or refund except where required under applicable law.
                </p>
                <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gold/20 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Chargeback & Dispute Policy</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Customers agree not to initiate chargebacks or payment disputes through their bank, card issuer, or payment service provider without first contacting the Company to seek resolution. The Company reserves all rights and remedies available under applicable law in relation to fraudulent or unjustified chargebacks.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 5. SERVICE DELIVERY */}
              <motion.div 
                id="service-delivery" 
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
                    Service Delivery
                  </h2>
                </div>
                <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Commercially Reasonable Efforts</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      The Company shall use commercially reasonable efforts to deliver the purchased services within the communicated timelines. Delivery schedules may vary depending on the complexity of the engagement, availability of information from the Client, operational requirements, force majeure events, or other circumstances beyond the reasonable control of the Company.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 6. EXCEPTIONAL CIRCUMSTANCES */}
              <motion.div 
                id="exceptional-circumstances" 
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
                    Exceptional Circumstances
                  </h2>
                </div>
                <p className="mb-4">
                  If the Company is unable to provide a purchased service solely due to reasons attributable to the Company, the Company may, at its sole discretion and subject to applicable law:
                </p>
                <ul className="space-y-2.5 mt-2 mb-4 text-sm text-gray-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Provide an equivalent substitute service;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Provide a credit for future services; or</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Process a partial or full refund.</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Such decision shall constitute the sole remedy available to the Client.
                </p>
              </motion.div>

              {/* 7. GOVERNING LAW */}
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
                    7
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Governing Law
                  </h2>
                </div>
                <div className="p-4 bg-bg-surface-light/30 rounded-xl border border-gray-200/5 flex items-start gap-3">
                  <Scale className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Indian Jurisdiction</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      This Policy shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or relating to this Policy shall be subject to the exclusive jurisdiction of the competent courts having jurisdiction over the registered office of Elephantgod Accelerator Pvt. Ltd.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 8. CHANGES TO THIS POLICY */}
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
                    8
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Changes to this Policy
                  </h2>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  The Company reserves the right to modify, amend, or update this Policy at any time without prior notice. Any revised Policy shall become effective immediately upon publication on the Company's website unless otherwise stated.
                </p>
              </motion.div>

              {/* 9. CONTACT US */}
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
                    9
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    Contact Us
                  </h2>
                </div>
                <p className="mb-6">
                  For questions or clarifications regarding this Cancellation & Refund Policy, please contact us:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl flex items-start gap-3">
                    <Building className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider">Company Name</h4>
                      <p className="text-white text-sm font-semibold mt-1">Elephantgod Accelerator Pvt. Ltd.</p>
                    </div>
                  </div>
                  <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl flex items-start gap-3 min-w-0">
                    <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Address</h4>
                      <a href="mailto:info@elephantgodaccelerator.com" className="text-gold hover:underline text-xs sm:text-sm font-semibold mt-1 block break-all">
                        info@elephantgodaccelerator.com
                      </a>
                    </div>
                  </div>
                  <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider">Phone Number</h4>
                      <a href="tel:+918904073584" className="text-gold hover:underline text-sm font-semibold mt-1 block">
                        +91 8904073584
                      </a>
                    </div>
                  </div>
                  <div className="bg-bg-surface-light/40 border border-gray-200/5 p-4 rounded-xl flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider">Address</h4>
                      <p className="text-white text-xs mt-1 leading-relaxed">
                        Third Floor, F 459/5, 10" Main, F Block, Sahakara Nagar, Bengaluru 560092
                      </p>
                    </div>
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
                  Policy Acknowledgment
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  By utilizing <strong className="text-white">www.elephantgodaccelerator.com</strong>, purchasing any professional service, mentoring, consulting package, or event ticket from Elephantgod Accelerator Pvt. Ltd., you explicitly acknowledge, declare consent, and agree to be bound by this Cancellation & Refund Policy.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
