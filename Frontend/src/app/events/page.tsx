"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Clock, Users, ArrowRight, Calendar } from "lucide-react";
import { API_URL } from "@/lib/api";
import RoleSelector from "@/components/RoleSelector";

interface Event {
  title: string;
  desc: string;
  time: string;
  location: string;
  capacity: string;
  formFields?: string[];
  externalLink?: string;
  isPaid?: boolean;
  price?: number;
}

// Helper to parse date (YYYY-MM-DD) and time (e.g. "08:30 PM IST") to Date object
function getEventTargetDate(dateStr: string, timeStr: string): Date {
  let hour = 0;
  let minute = 0;
  
  try {
    const cleanTime = timeStr.split(/[-–—]/)[0].trim().toUpperCase();
    const match = cleanTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (match) {
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const isPm = match[3] === "PM";
      
      if (isPm && h < 12) h += 12;
      if (!isPm && h === 12) h = 0;
      
      hour = h;
      minute = m;
    } else {
      const matchHr = cleanTime.match(/(\d{1,2})\s*(AM|PM)/);
      if (matchHr) {
        let h = parseInt(matchHr[1], 10);
        const isPm = matchHr[2] === "PM";
        if (isPm && h < 12) h += 12;
        if (!isPm && h === 12) h = 0;
        hour = h;
      }
    }
  } catch (e) {
    console.error("Error parsing time string:", timeStr, e);
  }

  const [yr, mo, dy] = dateStr.split("-").map(Number);
  // Defaulting to Indian Standard Time (IST) offset if timezone is not matched,
  // or simply construct in local time for user's context.
  return new Date(yr, mo - 1, dy, hour, minute);
}

const CountdownTimer = ({ dateStr, timeStr }: { dateStr: string; timeStr: string }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = getEventTargetDate(dateStr, timeStr);
      const difference = targetDate.getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [dateStr, timeStr]);

  if (!timeLeft) return null;

  if (timeLeft.isPast) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold bg-white/5 px-2.5 py-1 rounded-full border border-white/5 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
        Event Completed
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-extrabold text-gold/80 uppercase tracking-widest block">
        Time Remaining
      </span>
      <div className="flex items-center gap-1.5">
        <div className="flex flex-col items-center">
          <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-xs font-black text-white min-w-8 text-center">
            {pad(timeLeft.days)}
          </div>
          <span className="text-[8px] text-gray-500 font-bold uppercase mt-0.5">d</span>
        </div>
        <span className="text-white/60 font-bold mb-3">:</span>
        <div className="flex flex-col items-center">
          <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-xs font-black text-white min-w-8 text-center">
            {pad(timeLeft.hours)}
          </div>
          <span className="text-[8px] text-gray-500 font-bold uppercase mt-0.5">h</span>
        </div>
        <span className="text-white/60 font-bold mb-3">:</span>
        <div className="flex flex-col items-center">
          <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-xs font-black text-white min-w-8 text-center">
            {pad(timeLeft.minutes)}
          </div>
          <span className="text-[8px] text-gray-500 font-bold uppercase mt-0.5">m</span>
        </div>
        <span className="text-white/60 font-bold mb-3">:</span>
        <div className="flex flex-col items-center">
          <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-xs font-black text-gold min-w-8 text-center">
            {pad(timeLeft.seconds)}
          </div>
          <span className="text-[8px] text-gray-500 font-bold uppercase mt-0.5">s</span>
        </div>
      </div>
    </div>
  );
};

// Admin-added events from localStorage have this shape
interface StoredEvent {
  id: string;
  date: string;
  title: string;
  desc: string;
  time: string;
  location: string;
  capacity: string;
  formFields?: string[];
}

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [rsvpForm, setRsvpForm] = useState<Record<string, string>>({});
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  // Loaded events from backend
  const [allEvents, setAllEvents] = useState<Record<string, Event>>({});

  // Dynamic calendar: current view month/year with navigation
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth()); // 0-indexed

  // Helper to select an event and synchronize the calendar view to its month/year
  const selectEvent = (dateStr: string) => {
    setSelectedDate(dateStr);
    setRsvpSuccess(false);
    setRsvpError(null);
    setRsvpForm({});

    const parts = dateStr.split("-").map(Number);
    if (parts.length === 3) {
      const [yr, mo] = parts;
      setCalYear(yr);
      setCalMonth(mo - 1);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const eventMap: Record<string, Event> = {};
            data.forEach((ev) => {
              eventMap[ev.date] = {
                title: ev.title,
                desc: ev.desc,
                time: ev.time,
                location: ev.location,
                capacity: ev.capacity,
                formFields: ev.formFields,
                externalLink: ev.externalLink,
                isPaid: ev.isPaid,
                price: ev.price,
              };
            });
            setAllEvents(eventMap);

            // Select initial event dynamically based on the current date
            const eventDates = Object.keys(eventMap);
            if (eventDates.length > 0) {
              const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
              
              // Find closest upcoming or today's event
              const upcomingDates = eventDates.filter((d) => d >= todayStr).sort();
              let defaultDate = "";
              if (upcomingDates.length > 0) {
                defaultDate = upcomingDates[0];
              } else {
                // If no upcoming events, fall back to the latest past event
                const pastDates = eventDates.filter((d) => d < todayStr).sort().reverse();
                defaultDate = pastDates[0];
              }

              if (defaultDate) {
                selectEvent(defaultDate);
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch events from backend", err);
      }
    };
    fetchEvents();
  }, []);

  // Use allEvents as the active calendar map
  const mockEvents = allEvents;

  const handleDayClick = (dayStr: string) => {
    if (mockEvents[dayStr]) {
      selectEvent(dayStr);
    }
  };

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    setRsvpError(null);

    const payload = {
      eventDate: selectedDate,
      eventTitle: mockEvents[selectedDate].title,
      Role: rsvpForm["Role"] || "Startup",
      ...rsvpForm,
    };

    try {
      const res = await fetch(`${API_URL}/payment/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit RSVP to backend");
      }

      const data = await res.json();

      if (data.redirect) {
        // Redirection mode: redirect user to ICICI PG
        window.location.href = data.redirectURL;
      } else {
        // Free event direct registration confirmation
        setRsvpSuccess(true);
        setRsvpForm({});
      }
    } catch (err: any) {
      console.error("Failed to submit RSVP to backend", err);
      setRsvpError(err.message || "Failed to submit RSVP to backend");
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Day of week (Mon=0…Sun=6) for 1st of displayed month
  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay();
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // convert Sun=0 to Mon=0

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const goToPrevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const goToNextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

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
            {/* Month Navigator */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={goToPrevMonth}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-gold/30 transition-all"
                aria-label="Previous month"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <h3 className="font-display font-extrabold text-lg text-white">
                {monthNames[calMonth]} {calYear}
              </h3>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-gold/30 transition-all"
                aria-label="Next month"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

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
                const mm = String(calMonth + 1).padStart(2, "0");
                const dd = String(day).padStart(2, "0");
                const dateStr = `${calYear}-${mm}-${dd}`;
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

                {/* Event Countdown */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <CountdownTimer dateStr={selectedDate} timeStr={mockEvents[selectedDate].time} />
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
                  {mockEvents[selectedDate].isPaid && mockEvents[selectedDate].price && (
                    <div className="flex items-center gap-2 text-xs text-gold bg-gold/5 border border-gold/10 px-3 py-1.5 rounded-xl w-fit font-bold mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      <span>Registration Fee: ₹{mockEvents[selectedDate].price.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {mockEvents[selectedDate].externalLink ? (
                  <div className="flex flex-col gap-3 mt-1">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      This is an ecosystem event hosted externally. Click below to register and secure your spot on the official platform.
                    </p>
                    <a
                      href={mockEvents[selectedDate].externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider rounded-lg hover:shadow-lg flex items-center justify-center shrink-0 cursor-pointer text-center shadow-[0_0_20px_rgba(201,169,110,0.2)] hover:scale-[1.01] transition-all"
                    >
                      Register via Nas.io <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </a>
                  </div>
                ) : rsvpSuccess ? (
                  <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 text-center text-xs text-gold font-bold">
                    RSVP Confirmed! Calendar Invite sent to your email.
                  </div>
                ) : (
                  <form onSubmit={handleRsvp} className="flex flex-col gap-3.5 md:max-h-[420px] md:overflow-y-auto pr-1">
                    <RoleSelector
                      selectedRole={rsvpForm["Role"] || "Startup"}
                      onChange={(role) => setRsvpForm({ ...rsvpForm, "Role": role })}
                    />
                    {(mockEvents[selectedDate].formFields || [
                      "Founder Name", "Email Address", "Startup Name", "Sector", "Revenue",
                      "Assistant Required For", "Funding Requirement", "Company Profile", "Product Details", "Website Address"
                    ]).map((field, idx) => {
                      const isTextArea = field.toLowerCase().includes("profile") || field.toLowerCase().includes("details");
                      const type = field.toLowerCase().includes("email") ? "email" : field.toLowerCase().includes("website") || field.toLowerCase().includes("url") ? "url" : "text";
                      
                      return (
                        <div key={idx} className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{field}</label>
                          {isTextArea ? (
                            <textarea
                              required
                              placeholder={`Enter ${field}...`}
                              rows={2}
                              value={rsvpForm[field] || ""}
                              onChange={(e) => setRsvpForm({ ...rsvpForm, [field]: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold resize-none"
                            />
                          ) : (
                            <input
                              type={type}
                              required
                              placeholder={`Enter ${field}...`}
                              value={rsvpForm[field] || ""}
                              onChange={(e) => setRsvpForm({ ...rsvpForm, [field]: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                            />
                          )}
                        </div>
                      );
                    })}
                    {rsvpError && (
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium">
                        {rsvpError}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-bold text-xs uppercase tracking-wider rounded-lg hover:shadow-lg flex items-center justify-center shrink-0 mt-2 cursor-pointer"
                    >
                      {mockEvents[selectedDate].isPaid && mockEvents[selectedDate].price 
                        ? `Pay ₹${mockEvents[selectedDate].price.toFixed(2)} & Register` 
                        : "Register for Event"}
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
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

      {/* All Upcoming & Past Events Directory */}
      <section className="py-16 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.01]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left mb-10">
            <span className="text-xs font-extrabold text-gold uppercase tracking-wider">
              Cohort Roadmap
            </span>
            <h2 className="font-display font-black text-3xl text-white mt-1">
              Events Directory & Countdowns
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl leading-relaxed">
              Track live countdowns, registrations, and dates for all cohort roadshows, expert rounds, and specialized masterclasses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(mockEvents)
              .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
              .map(([dateStr, event]) => {
                const targetDate = getEventTargetDate(dateStr, event.time);
                const isPast = targetDate.getTime() <= Date.now();

                return (
                  <div
                    key={dateStr}
                    className={`glass-card rounded-3xl p-6 border transition-all flex flex-col justify-between gap-5 relative overflow-hidden group ${
                      isPast
                        ? "border-white/5 opacity-70"
                        : "border-gold/15 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
                    }`}
                  >
                    {/* Corner gradient for upcoming active card */}
                    {!isPast && (
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
                    )}

                    <div className="flex flex-col gap-4">
                      {/* Card Header: Date & Live Timer Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-white tracking-wide">
                            {new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Live Timer or Past Badge */}
                        <div className="shrink-0">
                          <CountdownTimer dateStr={dateStr} timeStr={event.time} />
                        </div>
                      </div>

                      {/* Event Text content */}
                      <div>
                        <h3 className="font-display font-black text-lg text-white mb-2 group-hover:text-gold transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                          {event.desc}
                        </p>
                      </div>

                      {/* Quick Details List */}
                      <div className="grid grid-cols-2 gap-3 text-[11px] text-gray-400 border-t border-white/5 pt-4">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Clock className="w-3.5 h-3.5 text-gold/80 shrink-0" />
                          <span className="truncate">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <MapPin className="w-3.5 h-3.5 text-gold/80 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Action Button */}
                    <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-white/5 mt-1">
                      <button
                        onClick={() => {
                          selectEvent(dateStr);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-gold/30 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Inspect Calendar
                      </button>
                      
                      {event.externalLink ? (
                        <a
                          href={event.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 rounded-lg bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer text-center"
                        >
                          Register Now <ArrowRight className="w-3 h-3" />
                        </a>
                      ) : (
                        !isPast && (
                          <button
                            onClick={() => {
                              selectEvent(dateStr);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="flex-1 py-2.5 rounded-lg bg-gold/10 border border-gold/20 hover:bg-gold/20 text-gold font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            RSVP Locally <ArrowRight className="w-3 h-3 text-gold" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
