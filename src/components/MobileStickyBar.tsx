"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, FileText, Calendar } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function MobileStickyBar() {
  const { openMeetingModal } = useApp();

  return (
    <div className="fixed bottom-0 left-0 w-full z-45 bg-[#1a1b1d]/95 backdrop-blur-md border-t border-gold/20 grid grid-cols-3 md:hidden text-white shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
      {/* WhatsApp Link */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center py-2 text-gray-400 hover:text-emerald-400 active:text-emerald-400 border-r border-white/5"
      >
        <MessageCircle className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
      </a>

      {/* Apply Link */}
      <Link
        href="/apply?mode=membership"
        className="flex flex-col items-center justify-center py-2 text-gold hover:text-white active:text-white border-r border-white/5 bg-gold/5"
      >
        <FileText className="w-5 h-5 mb-0.5" />
        <span className="text-[8px] font-bold uppercase tracking-wider text-center px-1">For Club Membership</span>
      </Link>

      {/* Schedule Link */}
      <button
        onClick={openMeetingModal}
        className="flex flex-col items-center justify-center py-2 text-gray-400 hover:text-primary active:text-primary"
      >
        <Calendar className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Schedule</span>
      </button>
    </div>
  );
}
