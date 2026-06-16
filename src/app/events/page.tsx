"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, Users, ArrowRight } from "lucide-react";

interface Event {
  title: string;
  desc: string;
  time: string;
  location: string;
  capacity: string;
}

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>("2026-06-18");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const mockEvents: Record<string, Event> = {
    "2026-06-05": {
      title: "EGA Masterclass: Go-To-Market and Retail Sprints",
      desc: "An intensive strategy session led by Meera Nair mapping consumer retail networks, distributor incentives, and GTM rollouts in tier-2 cities.",
      time: "03:00 PM IST",
      location: "Bengaluru Hub & Zoom",
      capacity: "Limited to 50 founders",
    },
    "2026-06-12": {
      title: "Seed Valuation & Capital Structuring Audit",
      desc: "EGA partners sit down with cohort CFOs to structure valuation projections, ESOP pools, and liquidation preferences prior to demo day.",
      time: "11:00 AM IST",
      location: "EGA Boardroom",
      capacity: "Invite Only",
    },
    "2026-06-18": {
      title: "Cohort 12 Demo Day: B2B Scaling Showcase",
      desc: "12 selected Indian hardware, AI, and logistics startups pitch in front of 40+ active venture capital funds, family offices, and HNI syndicates.",
      time: "02:00 PM IST",
      location: "Hotel Grand Sheraton, Bengaluru",
      capacity: "VCs and Accredited Angels only",
    },
    "2026-06-25": {
      title: "Venture Terms & Cap Tables Masterclass",
      desc: "An active negotiation drill detailing anti-dilution clauses, liquidation preferences, and MCA compliance requirements.",
      time: "04:00 PM IST",
      location: "Online (Zoom)",
      capacity: "Public registration open",
    },
  };

  const handleDayClick = (dayStr: string) => {
    if (mockEvents[dayStr]) {
      setSelectedDate(dayStr);
      setRsvpSuccess(false);
      setRsvpEmail("");
    }
  };

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpEmail || !selectedDate) return;

    const rsvps = JSON.parse(localStorage.getItem("ega_rsvps") || "[]");
    rsvps.push({
      id: Date.now(),
      email: rsvpEmail,
      eventDate: selectedDate,
      eventTitle: mockEvents[selectedDate].title,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("ega_rsvps", JSON.stringify(rsvps));

    setRsvpSuccess(true);
    setRsvpEmail("");
  };

  // June 2026 starts on Monday, 30 days
  const offset = 1; // Mon
  const daysInMonth = 30;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="pt-24 pb-16 bg-bg-dark min-h-screen">
      {/* Page Header */}
      <section className="relative py-12 overflow-hidden border-b border-white/5 bg-gradient-to-r from-bg-dark to-white/[0.01]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-extrabold text-gold uppercase tracking-wider">
            Cohort Calendar
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mt-2 mb-4">
            Ecosystem Events & Sprints
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Participate in cohort masterclasses, pitch practice rounds, and demo day showcases connecting Indian innovation with top capital alliances.
          </p>
        </div>
      </section>

      {/* Calendar & Event Display Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendar Grid Box */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/5">
            <h3 className="font-display font-extrabold text-lg text-white mb-6 flex items-center justify-between">
              <span>June 2026</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                June 1st starts Monday
              </span>
            </h3>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center font-bold text-xs text-gray-500 uppercase mb-4">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Calendar Cells */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty Cells Offset */}
              {Array.from({ length: offset }).map((_, idx) => (
                <div key={idx} className="aspect-square" />
              ))}

              {/* Day Cells */}
              {days.map((day) => {
                const dateStr = `2026-06-${day < 10 ? "0" + day : day}`;
                const hasEvent = !!mockEvents[dateStr];
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => handleDayClick(dateStr)}
                    disabled={!hasEvent}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center relative border transition-all ${
                      isSelected
                        ? "bg-gold text-bg-dark border-gold font-black scale-105 shadow-md shadow-gold/20"
                        : hasEvent
                        ? "bg-white/5 text-white border-gold/30 hover:border-gold/60 cursor-pointer font-bold"
                        : "bg-transparent text-gray-600 border-transparent cursor-default"
                    }`}
                  >
                    <span>{day}</span>
                    {hasEvent && !isSelected && (
                      <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-gold" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Detail Display Box */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {selectedDate && mockEvents[selectedDate] ? (
              <div className="glass-card rounded-3xl p-6 border border-gold/15 text-left flex flex-col gap-5">
                <div>
                  <span className="px-3 py-1 text-[10px] font-bold bg-gold/10 text-gold border border-gold/20 rounded-full uppercase tracking-wider block w-fit mb-3">
                    Active Session: {selectedDate}
                  </span>
                  <h3 className="font-display font-black text-xl text-white leading-snug">
                    {mockEvents[selectedDate].title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {mockEvents[selectedDate].desc}
                </p>

                <div className="flex flex-col gap-3 border-y border-white/5 py-4 my-1">
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <Clock className="w-4 h-4 text-gold shrink-0" />
                    <span>Time: {mockEvents[selectedDate].time}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span>Location: {mockEvents[selectedDate].location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <Users className="w-4 h-4 text-gold shrink-0" />
                    <span>Capacity: {mockEvents[selectedDate].capacity}</span>
                  </div>
                </div>

                {rsvpSuccess ? (
                  <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 text-center text-xs text-gold font-bold">
                    RSVP Confirmed! Calendar Invite sent to your email.
                  </div>
                ) : (
                  <form onSubmit={handleRsvp} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-bold text-xs uppercase tracking-wider rounded-lg hover:shadow-lg flex items-center justify-center shrink-0"
                    >
                      RSVP Spot <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-8 border border-white/5 text-center text-gray-500 text-sm italic">
                Select an active highlighted date on the calendar grid to inspect event details.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
