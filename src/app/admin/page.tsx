"use client";
import React, { useState, useEffect } from "react";
import { Lock, LogOut, Plus, Trash2, Edit3, Calendar, Clock, MapPin, Users, Save, X, CheckCircle2, AlertCircle, Eye, EyeOff, Shield, Settings, FileText } from "lucide-react";
import { loadSiteContent, saveSiteContent, resetSiteContent, DEFAULT_CONTENT } from "@/lib/siteContent";
import type { SiteContent } from "@/lib/siteContent";

interface CohortEvent {
  id: string; date: string; title: string; desc: string; time: string; location: string; capacity: string;
}
const ADMIN_PASSWORD = "ega@admin2026";
const STORAGE_KEY = "ega_admin_events";
const defaultForm = { date: "", title: "", desc: "", time: "", location: "", capacity: "" };
function loadEvents(): CohortEvent[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveEvents(events: CohortEvent[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); }

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [activeTab, setActiveTab] = useState<"events"|"hero"|"services"|"testimonials"|"pricing"|"applications">("events");
  const [events, setEvents] = useState<CohortEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string|null>(null);
  const [form, setForm] = useState(defaultForm);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_CONTENT);
  
  // Applications States
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any|null>(null);
  const [appFilter, setAppFilter] = useState<"all"|"acceleration"|"membership">("all");

  useEffect(() => {
    if (sessionStorage.getItem("ega_admin_session") === "active") setIsLoggedIn(true);
    setEvents(loadEvents());
    setSiteContent(loadSiteContent());
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      if (Array.isArray(data)) {
        setApplications(data);
      }
    } catch (err) {
      console.error("Failed to fetch applications", err);
    }
  };

  const handleDeleteApp = async (id: number) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const res = await fetch("/api/applications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setApplications(prev => prev.filter(app => app.id !== id));
        showSuccess("Submission deleted successfully.");
        if (selectedApp?.id === id) setSelectedApp(null);
      }
    } catch (err) {
      console.error("Failed to delete application", err);
    }
  };

  const exportToCSV = () => {
    if (applications.length === 0) {
      alert("No applications to export.");
      return;
    }
    
    const allKeys = Array.from(new Set(applications.flatMap(app => Object.keys(app))));
    const csvContent = [
      allKeys.join(","),
      ...applications.map(app => 
        allKeys.map(key => {
          const val = app[key];
          if (val === undefined || val === null) return '""';
          return `"${String(val).replace(/"/g, '""')}"`;
        }).join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ega_submissions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsLoggedIn(true); sessionStorage.setItem("ega_admin_session","active"); setLoginError("");
    } else {
      const a = loginAttempts+1; setLoginAttempts(a);
      setLoginError(a>=3?"Too many attempts.":"Incorrect password.");
    }
    setPasswordInput("");
  };
  const handleLogout = () => { setIsLoggedIn(false); sessionStorage.removeItem("ega_admin_session"); };
  const showSuccess = (msg: string) => { setSuccessMsg(msg); setTimeout(()=>setSuccessMsg(""),3000); };
  const openAddForm = () => { setForm(defaultForm); setEditingId(null); setFormError(""); setShowForm(true); };
  const openEditForm = (ev: CohortEvent) => { setForm({date:ev.date,title:ev.title,desc:ev.desc,time:ev.time,location:ev.location,capacity:ev.capacity}); setEditingId(ev.id); setFormError(""); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(defaultForm); setFormError(""); };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(p=>({...p,[e.target.name]:e.target.value}));
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date||!form.title||!form.time||!form.location){setFormError("Date, Title, Time, Location required.");return;}
    const updated = editingId ? events.map(ev=>ev.id===editingId?{...form,id:editingId}:ev) : [...events,{...form,id:Date.now().toString()}];
    saveEvents(updated); setEvents(updated); showSuccess(editingId?"Event updated!":"Event added!"); closeForm();
  };
  const handleDelete = (id: string) => {
    if (!confirm("Delete this event?")) return;
    const updated = events.filter(ev=>ev.id!==id); saveEvents(updated); setEvents(updated); showSuccess("Event deleted.");
  };
  const handleContentChange = (section: keyof SiteContent, field: string, value: string) => {
    setSiteContent(prev => ({ ...prev, [section]: { ...(prev[section] as any), [field]: value } }));
  };
  const handleArrayChange = (section: keyof SiteContent, index: number, field: string, value: any) => {
    setSiteContent(prev => {
      const arr = [...(prev[section] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  };
  const handleSaveContent = () => { saveSiteContent(siteContent); showSuccess("Website content saved! Refresh the page to see changes."); };
  const handleResetContent = () => { if(confirm("Reset all content to defaults?")){ resetSiteContent(); setSiteContent(DEFAULT_CONTENT); showSuccess("Content reset to defaults."); } };

  if (!isLoggedIn) return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-4 pt-24 pb-16">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"/>
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shadow-[0_0_30px_rgba(201,169,110,0.15)]"><Shield className="w-8 h-8 text-gold"/></div>
            <div className="text-center"><h1 className="font-display font-black text-2xl text-white">Admin Portal</h1><p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">Elephant God Accelerator</p></div>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"/>
                <input type={showPassword?"text":"password"} value={passwordInput} onChange={e=>setPasswordInput(e.target.value)} placeholder="Enter admin password" disabled={loginAttempts>=3} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:border-gold/60 transition-colors placeholder:text-gray-600"/>
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">{showPassword?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
              </div>
            </div>
            {loginError && <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-semibold"><AlertCircle className="w-3.5 h-3.5 shrink-0"/>{loginError}</div>}
            <button type="submit" disabled={loginAttempts>=3} className="w-full py-3 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all disabled:opacity-40 flex items-center justify-center gap-2 mt-1"><Lock className="w-4 h-4"/>Authenticate</button>
          </form>
          <p className="text-center text-gray-600 text-[11px] mt-6">Restricted to EGA administrators only.</p>
        </div>
      </div>
    </div>
  );

  const tabs = [
    {id:"events",label:"Events",icon:<Calendar className="w-4 h-4"/>},
    {id:"applications",label:"Applications",icon:<FileText className="w-4 h-4"/>},
    {id:"hero",label:"Hero & Stats",icon:<Settings className="w-4 h-4"/>},
    {id:"services",label:"Services",icon:<Settings className="w-4 h-4"/>},
    {id:"testimonials",label:"Testimonials",icon:<Settings className="w-4 h-4"/>},
    {id:"pricing",label:"Pricing",icon:<Settings className="w-4 h-4"/>},
  ] as const;

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/60 transition-colors placeholder:text-gray-600";
  const labelCls = "text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1";
  const sectionCls = "glass-card rounded-2xl p-5 border border-white/5 mb-4";

  return (
    <div className="pt-24 pb-16 bg-bg-dark min-h-screen">
      <section className="relative py-8 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-gold uppercase tracking-wider">Admin Dashboard</span>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">EGA Control Panel</h1>
              <p className="text-gray-400 text-sm mt-1">Manage events and edit all website content.</p>
            </div>
            <button onClick={handleLogout} className="px-5 py-2.5 bg-white/5 border border-white/10 text-gray-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:border-red-500/30 hover:text-red-400 transition-all flex items-center gap-2 shrink-0"><LogOut className="w-4 h-4"/>Logout</button>
          </div>
          <div className="flex gap-2 mt-6 flex-wrap">
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setActiveTab(t.id as typeof activeTab)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab===t.id?"bg-gold text-bg-dark":"bg-white/5 border border-white/10 text-gray-400 hover:text-white"}`}>{t.icon}{t.label}</button>
            ))}
          </div>
        </div>
      </section>

      {successMsg && <div className="fixed top-24 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold shadow-2xl backdrop-blur-md"><CheckCircle2 className="w-4 h-4"/>{successMsg}</div>}

      {activeTab==="events" && (
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end mb-6"><button onClick={openAddForm} className="px-5 py-2.5 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all flex items-center gap-2"><Plus className="w-4 h-4"/>Add Event</button></div>
            {events.length===0 ? (
              <div className="glass-card rounded-3xl p-16 border border-white/5 text-center flex flex-col items-center gap-4"><Calendar className="w-12 h-12 text-gray-600"/><p className="text-gray-400 font-bold">No events yet.</p><button onClick={openAddForm} className="px-6 py-3 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2"><Plus className="w-4 h-4"/>Add First Event</button></div>
            ) : (
              <div className="flex flex-col gap-4">
                {[...events].sort((a,b)=>a.date.localeCompare(b.date)).map(event=>(
                  <div key={event.id} className="glass-card rounded-2xl p-5 border border-white/5 hover:border-gold/15 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 text-center">
                        <span className="text-[10px] font-bold text-gold uppercase">{new Date(event.date+"T00:00:00").toLocaleString("en-IN",{month:"short"})}</span>
                        <span className="text-2xl font-black text-white leading-none">{new Date(event.date+"T00:00:00").getDate()}</span>
                        <span className="text-[10px] font-bold text-gray-500">{new Date(event.date+"T00:00:00").getFullYear()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-white text-base truncate">{event.title}</h3>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{event.desc||"No description."}</p>
                        <div className="flex flex-wrap gap-4 mt-3">
                          <span className="flex items-center gap-1.5 text-xs text-gray-500"><Clock className="w-3.5 h-3.5 text-gold"/>{event.time||"—"}</span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin className="w-3.5 h-3.5 text-gold"/>{event.location}</span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500"><Users className="w-3.5 h-3.5 text-gold"/>{event.capacity||"Open"}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={()=>openEditForm(event)} className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:border-gold/30 hover:text-gold transition-all"><Edit3 className="w-4 h-4"/></button>
                        <button onClick={()=>handleDelete(event.id)} className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:border-red-500/30 hover:text-red-400 transition-all"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab==="hero" && (
        <section className="py-10"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-2xl text-white">Hero & Stats</h2>
            <div className="flex gap-2">
              <button onClick={handleResetContent} className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-wider rounded-xl hover:text-red-400 hover:border-red-500/30 transition-all">Reset</button>
              <button onClick={handleSaveContent} className="px-5 py-2.5 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg flex items-center gap-2"><Save className="w-4 h-4"/>Save Changes</button>
            </div>
          </div>
          <div className={sectionCls}>
            <h3 className="text-gold font-bold text-sm uppercase tracking-widest mb-4">Hero Text</h3>
            <div className="flex flex-col gap-4">
              <div><label className={labelCls}>Badge Text</label><input className={inputCls} value={siteContent.hero.badge} onChange={e=>handleContentChange("hero","badge",e.target.value)}/></div>
              <div><label className={labelCls}>Main Headline</label><textarea className={inputCls+" resize-none"} rows={2} value={siteContent.hero.headline} onChange={e=>handleContentChange("hero","headline",e.target.value)}/></div>
              <div><label className={labelCls}>Subheadline</label><textarea className={inputCls+" resize-none"} rows={3} value={siteContent.hero.subheadline} onChange={e=>handleContentChange("hero","subheadline",e.target.value)}/></div>
            </div>
          </div>
          <div className={sectionCls}>
            <h3 className="text-gold font-bold text-sm uppercase tracking-widest mb-4">Stats Counter</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div><label className={labelCls}>Stat 1 Value</label><input className={inputCls} value={siteContent.hero.stat1Value} onChange={e=>handleContentChange("hero","stat1Value",e.target.value)}/><label className={labelCls+" mt-2"}>Stat 1 Label</label><input className={inputCls} value={siteContent.hero.stat1Label} onChange={e=>handleContentChange("hero","stat1Label",e.target.value)}/></div>
              <div><label className={labelCls}>Stat 2 Value</label><input className={inputCls} value={siteContent.hero.stat2Value} onChange={e=>handleContentChange("hero","stat2Value",e.target.value)}/><label className={labelCls+" mt-2"}>Stat 2 Label</label><input className={inputCls} value={siteContent.hero.stat2Label} onChange={e=>handleContentChange("hero","stat2Label",e.target.value)}/></div>
              <div><label className={labelCls}>Stat 3 Value</label><input className={inputCls} value={siteContent.hero.stat3Value} onChange={e=>handleContentChange("hero","stat3Value",e.target.value)}/><label className={labelCls+" mt-2"}>Stat 3 Label</label><input className={inputCls} value={siteContent.hero.stat3Label} onChange={e=>handleContentChange("hero","stat3Label",e.target.value)}/></div>
            </div>
          </div>
        </div></section>
      )}

      {activeTab==="services" && (
        <section className="py-10"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-2xl text-white">Services</h2>
            <button onClick={handleSaveContent} className="px-5 py-2.5 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg flex items-center gap-2"><Save className="w-4 h-4"/>Save Changes</button>
          </div>
          {siteContent.services.map((svc,i)=>(
            <div key={i} className={sectionCls}>
              <h3 className="text-gold font-bold text-sm uppercase tracking-widest mb-4">Service {i+1}</h3>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Tag</label><input className={inputCls} value={svc.tag} onChange={e=>handleArrayChange("services",i,"tag",e.target.value)}/></div>
                  <div><label className={labelCls}>Title</label><input className={inputCls} value={svc.title} onChange={e=>handleArrayChange("services",i,"title",e.target.value)}/></div>
                </div>
                <div><label className={labelCls}>Description</label><textarea className={inputCls+" resize-none"} rows={2} value={svc.desc} onChange={e=>handleArrayChange("services",i,"desc",e.target.value)}/></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className={labelCls}>Highlight 1</label><input className={inputCls} value={svc.highlight1} onChange={e=>handleArrayChange("services",i,"highlight1",e.target.value)}/></div>
                  <div><label className={labelCls}>Highlight 2</label><input className={inputCls} value={svc.highlight2} onChange={e=>handleArrayChange("services",i,"highlight2",e.target.value)}/></div>
                  <div><label className={labelCls}>Highlight 3</label><input className={inputCls} value={svc.highlight3} onChange={e=>handleArrayChange("services",i,"highlight3",e.target.value)}/></div>
                </div>
              </div>
            </div>
          ))}
        </div></section>
      )}

      {activeTab==="testimonials" && (
        <section className="py-10"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-2xl text-white">Testimonials</h2>
            <button onClick={handleSaveContent} className="px-5 py-2.5 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg flex items-center gap-2"><Save className="w-4 h-4"/>Save Changes</button>
          </div>
          {siteContent.testimonials.map((t,i)=>(
            <div key={i} className={sectionCls}>
              <h3 className="text-gold font-bold text-sm uppercase tracking-widest mb-4">Testimonial {i+1}</h3>
              <div className="flex flex-col gap-3">
                <div><label className={labelCls}>Quote</label><textarea className={inputCls+" resize-none"} rows={3} value={t.quote} onChange={e=>handleArrayChange("testimonials",i,"quote",e.target.value)}/></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className={labelCls}>Author Name</label><input className={inputCls} value={t.author} onChange={e=>handleArrayChange("testimonials",i,"author",e.target.value)}/></div>
                  <div><label className={labelCls}>Author Title</label><input className={inputCls} value={t.title} onChange={e=>handleArrayChange("testimonials",i,"title",e.target.value)}/></div>
                  <div><label className={labelCls}>Impact Badge</label><input className={inputCls} value={t.impact} onChange={e=>handleArrayChange("testimonials",i,"impact",e.target.value)}/></div>
                </div>
              </div>
            </div>
          ))}
        </div></section>
      )}

      {activeTab==="pricing" && (
        <section className="py-10"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-2xl text-white">Pricing Tiers</h2>
            <button onClick={handleSaveContent} className="px-5 py-2.5 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg flex items-center gap-2"><Save className="w-4 h-4"/>Save Changes</button>
          </div>
          {siteContent.pricing.map((tier,i)=>(
            <div key={i} className={`${sectionCls} ${tier.highlighted?"border-gold/30":""}`}>
              <h3 className="text-gold font-bold text-sm uppercase tracking-widest mb-4">{tier.name} {tier.highlighted&&<span className="ml-2 bg-gold/20 text-gold text-[10px] px-2 py-0.5 rounded-full">Featured</span>}</h3>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div><label className={labelCls}>Plan Name</label><input className={inputCls} value={tier.name} onChange={e=>handleArrayChange("pricing",i,"name",e.target.value)}/></div>
                  <div><label className={labelCls}>Badge</label><input className={inputCls} value={tier.badge} onChange={e=>handleArrayChange("pricing",i,"badge",e.target.value)}/></div>
                  <div><label className={labelCls}>Price</label><input className={inputCls} value={tier.price} onChange={e=>handleArrayChange("pricing",i,"price",e.target.value)}/></div>
                  <div><label className={labelCls}>Period</label><input className={inputCls} value={tier.period} onChange={e=>handleArrayChange("pricing",i,"period",e.target.value)}/></div>
                </div>
                <div><label className={labelCls}>Description</label><textarea className={inputCls+" resize-none"} rows={2} value={tier.description} onChange={e=>handleArrayChange("pricing",i,"description",e.target.value)}/></div>
                <div><label className={labelCls}>CTA Button Text</label><input className={inputCls} value={tier.cta} onChange={e=>handleArrayChange("pricing",i,"cta",e.target.value)}/></div>
                <div>
                  <label className={labelCls}>Features (one per line)</label>
                  <textarea className={inputCls+" resize-none"} rows={tier.features.length+1} value={tier.features.join("\n")} onChange={e=>handleArrayChange("pricing",i,"features",e.target.value.split("\n") as unknown as string)}/>
                </div>
              </div>
            </div>
          ))}
        </div></section>
      )}

      {activeTab==="applications" && (
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-display font-black text-2xl text-white">Form Submissions</h2>
                <p className="text-gray-400 text-xs mt-1">Review accelerator cohort and club membership applications.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <select 
                  value={appFilter} 
                  onChange={e => setAppFilter(e.target.value as any)} 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider focus:outline-none focus:border-gold/60 cursor-pointer"
                >
                  <option value="all">All Forms</option>
                  <option value="acceleration">Acceleration</option>
                  <option value="membership">Club Membership</option>
                </select>
                <button 
                  onClick={exportToCSV} 
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  Export CSV
                </button>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="glass-card rounded-3xl p-16 border border-white/5 text-center flex flex-col items-center gap-4">
                <FileText className="w-12 h-12 text-gray-600" />
                <p className="text-gray-400 font-bold">No submissions received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications
                  .filter(app => appFilter === "all" || app.type === appFilter)
                  .map(app => (
                    <div 
                      key={app.id} 
                      className="glass-card rounded-2xl p-5 border border-white/5 hover:border-gold/15 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            app.type === "acceleration" 
                              ? "bg-primary/20 text-accent border border-accent/20" 
                              : "bg-gold/20 text-gold border border-gold/20"
                          }`}>
                            {app.type === "acceleration" ? "Acceleration" : "Membership"}
                          </span>
                          <span className="text-[10px] text-gray-500 font-semibold">
                            {new Date(app.createdAt || app.id).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-white text-base truncate">
                          {app.startupName || app.name || "Unnamed Startup"}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                          Founder: <span className="text-white font-medium">{app.founderName || "—"}</span>
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Sector: <span className="text-white font-medium">{app.sector || app.startupSector || "—"}</span>
                        </p>
                        {app.type === "membership" && app.scorecardPercentage !== undefined && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-[10px] text-gray-500 uppercase font-extrabold">Readiness:</span>
                            <span className="text-xs font-black text-gold">{app.scorecardPercentage}%</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5">
                        <button 
                          onClick={() => setSelectedApp(app)} 
                          className="flex-1 py-2 bg-white/5 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Details
                        </button>
                        <button 
                          onClick={() => handleDeleteApp(app.id)} 
                          className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:border-red-500/30 hover:text-red-400 transition-all cursor-pointer"
                          title="Delete Submission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-gold/15 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedApp(null)} 
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="mb-6">
              <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                selectedApp.type === "acceleration" 
                  ? "bg-primary/20 text-accent border border-accent/20" 
                  : "bg-gold/20 text-gold border border-gold/20"
              }`}>
                {selectedApp.type === "acceleration" ? "Accelerator Application" : "Club Membership Application"}
              </span>
              <h2 className="font-display font-black text-2xl text-white mt-2 mb-1">
                {selectedApp.startupName || selectedApp.name || "Unnamed Startup"}
              </h2>
              <p className="text-gray-500 text-xs font-semibold">
                Submitted on {new Date(selectedApp.createdAt || selectedApp.id).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-5">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Founder Name</span>
                <span className="text-sm font-semibold text-white">{selectedApp.founderName || "—"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Startup Name</span>
                <span className="text-sm font-semibold text-white">{selectedApp.startupName || "—"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Sector</span>
                <span className="text-sm font-semibold text-white">{selectedApp.sector || selectedApp.startupSector || "—"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Revenue Level</span>
                <span className="text-sm font-semibold text-white">{selectedApp.revenue || selectedApp.startupRevenue || "—"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Funding Requirement</span>
                <span className="text-sm font-semibold text-white">{selectedApp.fundingReq || selectedApp.startupFundingReq || "—"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Website Address</span>
                {selectedApp.website || selectedApp.startupWebsite ? (
                  <a 
                    href={selectedApp.website || selectedApp.startupWebsite} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-sm font-semibold text-gold hover:underline flex items-center gap-1"
                  >
                    {selectedApp.website || selectedApp.startupWebsite}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-white">—</span>
                )}
              </div>

              {selectedApp.type === "membership" && (
                <>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Founder Email</span>
                    <span className="text-sm font-semibold text-white">{selectedApp.founderEmail || "—"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Founder Phone</span>
                    <span className="text-sm font-semibold text-white">{selectedApp.founderPhone || "—"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">LinkedIn URL</span>
                    {selectedApp.founderLinkedin ? (
                      <a 
                        href={selectedApp.founderLinkedin} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm font-semibold text-gold hover:underline"
                      >
                        {selectedApp.founderLinkedin}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-white">—</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Headquarters Location</span>
                    <span className="text-sm font-semibold text-white">{selectedApp.startupLocation || "—"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Team Size</span>
                    <span className="text-sm font-semibold text-white">{selectedApp.startupTeam || "—"} co-founders/employees</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Entity Registration</span>
                    <span className="text-sm font-semibold text-white">{selectedApp.startupRegistered || "—"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Prior Funding Raised</span>
                    <span className="text-sm font-semibold text-white">{selectedApp.startupRaised || "—"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Scorecard Readiness Percentage</span>
                    <span className="text-sm font-black text-gold">{selectedApp.scorecardPercentage !== undefined ? `${selectedApp.scorecardPercentage}%` : "—"}</span>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Pitch Deck File Name</span>
                    <span className="text-sm font-semibold text-white">{selectedApp.pitchDeck || "—"}</span>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Elevator Pitch</span>
                    <p className="text-sm text-gray-300 bg-white/5 border border-white/10 rounded-xl p-3 leading-relaxed">{selectedApp.startupElevator || "—"}</p>
                  </div>
                </>
              )}

              {selectedApp.type === "acceleration" && (
                <>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Assistant Required For</span>
                    <p className="text-sm text-gray-300 bg-white/5 border border-white/10 rounded-xl p-3 leading-relaxed">{selectedApp.assistantReq || "—"}</p>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Company Profile</span>
                    <p className="text-sm text-gray-300 bg-white/5 border border-white/10 rounded-xl p-3 leading-relaxed">{selectedApp.companyProfile || "—"}</p>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Product Details</span>
                    <p className="text-sm text-gray-300 bg-white/5 border border-white/10 rounded-xl p-3 leading-relaxed">{selectedApp.productDetails || "—"}</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6 pt-5 border-t border-white/5">
              <button 
                onClick={() => setSelectedApp(null)} 
                className="flex-1 py-3 bg-white/5 border border-white/10 text-gray-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                Close Details
              </button>
              <button 
                onClick={() => handleDeleteApp(selectedApp.id)} 
                className="py-3 px-6 bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Delete Submission
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-gold/15 shadow-2xl">
            <button onClick={closeForm} className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"><X className="w-4 h-4"/></button>
            <h2 className="font-display font-black text-xl text-white mb-1">{editingId?"Edit Event":"Add New Event"}</h2>
            <p className="text-gray-500 text-xs mb-6">This event will appear on the public cohort calendar.</p>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold"/>Date <span className="text-red-400">*</span></label><input type="date" name="date" value={form.date} onChange={handleFormChange} required className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/60 [color-scheme:dark]"/></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Event Title <span className="text-red-400">*</span></label><input type="text" name="title" value={form.title} onChange={handleFormChange} placeholder="e.g. Cohort 13 Demo Day" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/60 placeholder:text-gray-600"/></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label><textarea name="desc" value={form.desc} onChange={handleFormChange} placeholder="Short description..." rows={3} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/60 placeholder:text-gray-600 resize-none"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold"/>Time <span className="text-red-400">*</span></label><input type="text" name="time" value={form.time} onChange={handleFormChange} placeholder="e.g. 02:00 PM IST" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/60 placeholder:text-gray-600"/></div>
                <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gold"/>Location <span className="text-red-400">*</span></label><input type="text" name="location" value={form.location} onChange={handleFormChange} placeholder="e.g. Bengaluru" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/60 placeholder:text-gray-600"/></div>
              </div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-gold"/>Capacity / Access</label><input type="text" name="capacity" value={form.capacity} onChange={handleFormChange} placeholder="e.g. Public / Invite Only" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/60 placeholder:text-gray-600"/></div>
              {formError && <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-semibold"><AlertCircle className="w-3.5 h-3.5 shrink-0"/>{formError}</div>}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={closeForm} className="flex-1 py-3 bg-white/5 border border-white/10 text-gray-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-gradient-to-tr from-primary to-secondary text-bg-dark font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"><Save className="w-4 h-4"/>{editingId?"Save Changes":"Add to Calendar"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
