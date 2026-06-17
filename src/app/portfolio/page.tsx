"use client";

import React, { useState } from "react";
import { Search, ExternalLink } from "lucide-react";

export default function PortfolioPage() {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedStage, setSelectedStage] = useState("");

  const companies = [
    {
      name: "Genie Pads",
      sector: "Healthcare",
      stage: "PMF",
      desc: "Founded with a vision to redefine menstrual health, Genie Pads is committed to promoting a healthier planet through innovative approach to menstrual hygiene.",
      url: "http://www.geniepads.in/",
      logo: "/logos/geniepads.jpg",
    },
    {
      name: "Melvin Jones",
      sector: "Consumer Brands",
      stage: "PMF",
      desc: "The fashion brand dedicated to making a planet-positive impact. Redefining the fashion industry by exclusively using natural, eco-friendly fabrics and trims.",
      url: "https://melvinjones.in/",
      logo: "/logos/melvinjones.jpg",
    },
    {
      name: "Ingo Electric",
      sector: "Mobility",
      stage: "Growth",
      desc: "Modern micro-mobility solutions to combat traffic congestion, making travel faster, safer, and completely seamless using custom electric vehicles.",
      url: "https://ingoelectric.com/",
      logo: null,
    },
    {
      name: "Sutton and Shaw",
      sector: "Healthcare",
      stage: "Validation",
      desc: "Vetted medical diagnostics and device research. Developing high-precision early screening devices for cardiovascular biomarkers.",
      url: "https://suttonandshaw.com/",
      logo: "/logos/suttonandshaw.jpg",
    },
    {
      name: "Tribal Brew Coffee",
      sector: "Consumer Brands",
      stage: "Growth",
      desc: "Transforming India's coffee scene with grab-and-go artisanal chains based on the 5 A's: Artisanal, Authentic, Aspirational, Affordable, Accessible.",
      url: "https://www.tribalbrew.coffee/",
      logo: "/logos/tribalbrew.jpg",
    },
    {
      name: "Mykhaana",
      sector: "Consumer Brands",
      stage: "Validation",
      desc: "Curated frozen gourmet food deliveries, matching home-cooked nutritional parameters with quick preparation options.",
      url: "http://mykhaana.in/",
      logo: "/logos/mykhaana.jpg",
    },
    {
      name: "Ammamma's",
      sector: "Consumer Brands",
      stage: "Scale",
      desc: "Traditional ready-to-cook fresh foods using high-quality grains, offering natural, healthy batters, flatbreads, and traditional Indian sides.",
      url: "http://www.ammammas.com/",
      logo: "/logos/ammammas.jpg",
    },
    {
      name: "Olive Living",
      sector: "Real Estate",
      stage: "Scale",
      desc: "Premium co-living and managed student accommodation spaces across tier-1 cities, optimizing modern layouts and community facilities.",
      url: "https://oliveliving.com/",
      logo: "/logos/olive.jpg",
    },
    {
      name: "NES",
      sector: "Technology",
      stage: "Validation",
      desc: "Custom IT architectures, engineering consulting, and industrial system integrations for automated manufacturing pipelines.",
      url: "https://nesconsultancy.com/",
      logo: "/logos/nes.jpg",
    },
    {
      name: "Discreet Arts",
      sector: "Technology",
      stage: "Scale",
      desc: "International animation studio specializing in 2D/3D CGI series, feature films, and game asset development for global networks.",
      url: "https://discreetartsglobal.com/",
      logo: "/logos/discreetarts.jpg",
    },
    {
      name: "Abnandan Enviro",
      sector: "Sustainability",
      stage: "Idea",
      desc: "Effluent water treatment engineering and hazardous organic solid waste conversion frameworks for sustainable industrial parks.",
      url: "http://abnandanenviro.com/",
      logo: "/logos/abnandanenviro.jpg",
    },
    {
      name: "Zero Touch",
      sector: "Technology",
      stage: "Validation",
      desc: "IoT-based contact-free digital systems for retail, automated checkout points, and contactless terminal logs.",
      url: "http://zerotouch.in/",
      logo: "/logos/zerotouch.jpg",
    },
    {
      name: "R Cube MedTech",
      sector: "Healthcare",
      stage: "Validation",
      desc: "Custom orthopedic orthopedic implants, bio-compatible joint models, and pre-surgery 3D layout engineering systems.",
      url: "https://www.rcubemedtech.com/",
      logo: "/logos/rcubemedtech.jpg",
    },
    {
      name: "Just Connect Electricals",
      sector: "Manufacturing",
      stage: "Growth",
      desc: "Smart modular electrical sockets, home automation relays, and fire-safe wiring components for residential townships.",
      url: "https://justconnect.co.in/",
      logo: "/logos/justconnect.jpg",
    },
    {
      name: "Myniwa",
      sector: "Sustainability",
      stage: "Validation",
      desc: "Home hydroponics, indoor soil-free farming units, and organic kitchen garden setups for high-density metropolitan apartments.",
      url: "https://myniwa.com/",
      logo: "/logos/myniwa.jpg",
    },
    {
      name: "CosmicEye",
      sector: "Technology",
      stage: "Growth",
      desc: "Advanced satellite-based monitoring and remote sensing intelligence platforms, providing real-time geo-spatial analytics for agricultural, industrial, and climate risk modeling.",
      url: "https://cosmiceye.co/",
      logo: "/logos/cosmiceye.jpg",
    },
    {
      name: "Elephantgod Infra LLP",
      sector: "Real Estate",
      stage: "Scale",
      desc: "Eco-friendly industrial warehousing layouts, logistics hubs, and cold storage constructions in southern Indian states.",
      url: "http://elephantgodinfra.com/",
      logo: "/logos/elephantgodinfra.jpg",
    },
    {
      name: "Spykke",
      sector: "Mobility",
      stage: "Scale",
      desc: "India's largest power bank rental sharing network. Instant charging points across cafe networks, multiplexes, and transit terminals.",
      url: "https://spykke.com/",
      logo: "/logos/spykke.jpg",
    },
    {
      name: "Enumerati Solutions LLP",
      sector: "Technology",
      stage: "PMF",
      desc: "Venture analytics, financial reporting architectures, and automated dashboard integrations for investment companies.",
      url: "http://www.enumerati.in/",
      logo: null,
    },
    {
      name: "Charze Max",
      sector: "Mobility",
      stage: "Growth",
      desc: "Smart electric vehicle charging network and infrastructure solutions, powering the future of micro-mobility and passenger EVs.",
      url: "#",
      logo: "/logos/charzemax.jpg",
    },
    {
      name: "World 5 Fund",
      sector: "Sustainability",
      stage: "Scale",
      desc: "International green transition fund investing in early-stage clean-tech, carbon offset assets, and sustainable resource projects.",
      url: "#",
      logo: "/logos/world5fund.jpg",
    },
    {
      name: "DEFA",
      sector: "Technology",
      stage: "Growth",
      desc: "Digital education and future-readiness academy, providing customized skill development curricula and corporate training models.",
      url: "#",
      logo: "/logos/defa.jpg",
    },
    {
      name: "DesiLLM",
      sector: "Technology",
      stage: "PMF",
      desc: "Large Language Model pre-training and fine-tuning suite optimized for Indian languages and localized enterprise compliance.",
      url: "#",
      logo: "/logos/desillm.jpg",
    },
    {
      name: "GRV Academy",
      sector: "Education",
      stage: "Scale",
      desc: "Premium business management and vocational academy delivering highly specialized industry-ready curricula and training programs.",
      url: "https://grv.edu.in/",
      logo: "/logos/grvacademy.jpg",
    },
  ];

  const filtered = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.desc.toLowerCase().includes(search.toLowerCase());
    const matchesSector = selectedSector === "" || company.sector === selectedSector;
    const matchesStage = selectedStage === "" || company.stage === selectedStage;
    return matchesSearch && matchesSector && matchesStage;
  });

  return (
    <div className="pt-24 pb-16 bg-bg-dark min-h-screen relative overflow-hidden theme-dark">
      {/* cyber-grid & glowing spots for depth */}
      <div className="absolute inset-0 cyber-grid pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-2/3 left-10 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Page Header */}
      <section className="relative py-12 overflow-hidden border-b border-gray-200 bg-gradient-to-r from-bg-dark to-bg-surface/30 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-extrabold text-gold uppercase tracking-wider bg-bg-surface border border-gray-200 px-3 py-1 rounded-full">
            Venture Directory
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl mt-4 mb-4 text-white leading-tight">
            EGA <span className="gradient-text-gold">Portfolio</span> Companies
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Meet the next generation of Indian market leaders. These high-potential teams cover technology, sustainable consumer brands, healthcare, mobility, and big data engineering.
          </p>
        </div>
      </section>

      {/* Directory Filter controls */}
      <section className="py-8 bg-bg-surface/50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search startup name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-bg-surface border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gold"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-bg-surface border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-gold shrink-0 cursor-pointer"
            >
              <option value="" className="bg-bg-surface text-gray-500">All Sectors</option>
              <option value="Healthcare" className="bg-bg-surface text-gray-300">Healthcare & MedTech</option>
              <option value="Consumer Brands" className="bg-bg-surface text-gray-300">Consumer Brands</option>
              <option value="Mobility" className="bg-bg-surface text-gray-300">Mobility</option>
              <option value="Sustainability" className="bg-bg-surface text-gray-300">Sustainability</option>
              <option value="Technology" className="bg-bg-surface text-gray-300">Technology & SaaS</option>
              <option value="Real Estate" className="bg-bg-surface text-gray-300">Real Estate</option>
              <option value="Manufacturing" className="bg-bg-surface text-gray-300">Manufacturing</option>
            </select>

            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-bg-surface border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-gold shrink-0 cursor-pointer"
            >
              <option value="" className="bg-bg-surface text-gray-500">All Stages</option>
              <option value="Idea" className="bg-bg-surface text-gray-300">Idea Stage</option>
              <option value="Validation" className="bg-bg-surface text-gray-300">Validation / Pilot</option>
              <option value="PMF" className="bg-bg-surface text-gray-300">Product-Market Fit</option>
              <option value="Growth" className="bg-bg-surface text-gray-300">Growth Phase</option>
              <option value="Scale" className="bg-bg-surface text-gray-300">National Scale-up</option>
            </select>
          </div>
        </div>
      </section>

       {/* Directory Grid */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500 text-sm italic border border-dashed border-gray-300 rounded-2xl">
              No portfolio companies found matching your filter coordinates.
            </div>
          ) : (
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
              {filtered.map((company) => (
                 <div
                  key={company.name}
                  className="glass-card p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-200 hover:border-gold/20 flex flex-col md:flex-row gap-8 sm:gap-10 items-center md:items-stretch text-left transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg w-full"
                >
                  {/* Left Column: Very Big Logo */}
                  <div className="shrink-0 flex items-center justify-center">
                    {company.logo ? (
                      <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl bg-white border border-gray-200 flex items-center justify-center p-4 shadow-md">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center font-display font-black text-6xl sm:text-7xl md:text-8xl text-gold shadow-md">
                        {company.name[0]}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Info details */}
                  <div className="flex-1 flex flex-col justify-between w-full py-1">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                        <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                          {company.name}
                        </h3>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 text-[10px] font-extrabold bg-bg-surface border border-gray-200 rounded-full text-gold uppercase tracking-wider">
                            {company.sector}
                          </span>
                          <span className="px-3 py-1 text-[10px] font-extrabold bg-bg-surface border border-gray-200 rounded-full text-accent uppercase tracking-wider">
                            {company.stage}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                        {company.desc}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 flex justify-end">
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 border border-gold/30 hover:border-gold/80 text-gold hover:bg-gold/5 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 group cursor-pointer shadow-sm"
                      >
                        Visit Website{" "}
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
