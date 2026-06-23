/* 
 * Elephant God Accelerator (EGA) 2.0 Global JS
 * Core interactivity, animations, and forms logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroCanvas();
  initTimeline();
  initProgramTabs();
  initPortfolio();
  initMentors();
  initCalendar();
  initApplicationWizard();
  initInvestorForm();
  initScorecard();
  initModals();
  initCounters();
});

/* ==========================================================================
   1. NAVBAR & MOB MENU
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Change nav background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // Highlight active menu link based on current filename
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   2. HERO INTERACTIVE CANVAS (Ecosystem Network)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // Resize handler
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle configuration
  const particles = [];
  const particleCount = 65;
  const connectionDistance = 120;
  
  // Mouse position tracker
  const mouse = { x: null, y: null, radius: 150 };
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 1.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      
      // Node Types for colors
      const r = Math.random();
      if (r < 0.25) this.color = '#FF4D6D'; // Startup Crimson
      else if (r < 0.5) this.color = '#FFB703'; // Capital Gold
      else if (r < 0.75) this.color = '#00F5D4'; // Tech Aqua
      else this.color = '#ffffff'; // General
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap-around bounds
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;

      // Mouse interactive push
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow for lines
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDistance) {
          const alpha = (1 - (dist / connectionDistance)) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw and update particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup handler
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrameId);
  });
}

/* ==========================================================================
   3. STARTUP GROWTH ROADMAP TIMELINE
   ========================================================================== */
function initTimeline() {
  const nodes = document.querySelectorAll('.timeline-node');
  const slides = document.querySelectorAll('.timeline-slide');
  const progressFill = document.querySelector('.timeline-progress-fill');

  if (!nodes.length || !slides.length) return;

  nodes.forEach((node, index) => {
    node.addEventListener('click', () => {
      // Deactivate all nodes and active states
      nodes.forEach(n => n.classList.remove('active'));
      slides.forEach(s => s.classList.remove('active'));

      // Activate clicked node
      node.classList.add('active');
      const slideId = node.getAttribute('data-step');
      const activeSlide = document.getElementById(`step-${slideId}`);
      if (activeSlide) {
        activeSlide.classList.add('active');
      }

      // Update progress bar length
      const totalSteps = nodes.length - 1;
      const progressPercent = (index / totalSteps) * 100;
      if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
      }
    });
  });
}

/* ==========================================================================
   4. PROGRAMS & SERVICES TAB SYSTEM
   ========================================================================== */
function initProgramTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.program-pane');

  if (!tabBtns.length || !panes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tabTarget = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(tabTarget);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. PORTFOLIO SHOWCASE (Data, Search, Filters)
   ========================================================================== */
const portfolioData = [
  { name: 'Genie Pads', url: 'http://www.geniepads.in/', desc: 'Founded with a vision to redefine menstrual health, Genie Pads is committed to empowering women and promoting a healthier planet through innovative approach to menstrual hygiene.', sector: 'Healthcare', stage: 'Validation', location: 'Bengaluru' },
  { name: 'Melvin Jones', url: 'https://melvinjones.in/', desc: 'The fashion brand dedicated to making a planet-positive impact. Redefining the fashion industry by exclusively using natural, eco-friendly fabrics and trims.', sector: 'Consumer Brands', stage: 'Product Market Fit', location: 'Mumbai' },
  { name: 'Ingo Electric', url: 'https://ingoelectric.com/', desc: 'Modern micro-mobility solutions to combat traffic congestion, making travel faster, safer, and completely seamless using custom electric vehicles.', sector: 'Mobility', stage: 'Growth', location: 'Bengaluru' },
  { name: 'Sutton and Shaw', url: 'http://www.suttonandshaw.com/', desc: 'Gateway to timeless, sustainable design connecting influential designers with a commitment to innovation, backed by 140+ years of collective expertise.', sector: 'Consumer Brands', stage: 'Scale', location: 'Delhi' },
  { name: 'Tribal Brew Coffee', url: 'https://www.tribalbrew.coffee/', desc: 'Transforming India\'s coffee scene with grab-and-go artisanal chains based on the 5 A\'s: Artisanal, Authentic, Aspirational, Affordable, Accessible.', sector: 'Consumer Brands', stage: 'Growth', location: 'Bengaluru' },
  { name: 'Mykhaana', url: 'https://www.mykhaana.in/', desc: 'Cloud kitchen operator specializing in corporate food catering, canteen management, and an app-based aggregator of home chefs and home bakers.', sector: 'Consumer Brands', stage: 'Product Market Fit', location: 'Hyderabad' },
  { name: 'Ammamma’s', url: 'https://www.ammammas.in/', desc: 'Ready-to-cook foods reinventing convenience. Wholesome unprocessed food options providing enormous savings in prep time, grounded in Indian tradition.', sector: 'Consumer Brands', stage: 'Scale', location: 'Chennai' },
  { name: 'Olive Living', url: 'https://www.oliveliving.com/', desc: 'Innovating sustainable housing models and bespoke corporate/business travelers accommodation solutions for a greener, flexible future.', sector: 'Real Estate', stage: 'Growth', location: 'Bengaluru' },
  { name: 'NES (Nordische Energy)', url: 'https://www.nordischeenergy.com/', desc: 'Cutting-edge Research & Development and mobility technology firm specializing in clean energy innovations for global automotive markets.', sector: 'Mobility', stage: 'Fundraising', location: 'Pune' },
  { name: 'Discreet Arts', url: 'https://www.discreetarts.com/', desc: 'Top tier international animation studio delivering high-quality 2D/3D digital products, character design, and reliable content production partnerships.', sector: 'Technology', stage: 'Scale', location: 'Hyderabad' },
  { name: 'Abnandan Enviro', url: '#', desc: 'Creating simplified, decentralized systems for automated collection, sorting, and processing of dry waste, aided by Machine Intelligence and IoT devices.', sector: 'Sustainability', stage: 'Idea', location: 'Chennai' },
  { name: 'Zero Touch', url: 'https://zerotouch.in/', desc: 'Redefining corporate and domestic hygiene spaces with smart sensor-enabled toilets and clean-tech manufacturing systems.', sector: 'Manufacturing', stage: 'Validation', location: 'Ahmedabad' },
  { name: 'R Cube MedTech', url: 'http://www.rcubemedtech.com/', desc: 'Marketing, distributing, and scaling innovative medical devices. Focused on tech transfers, localized production (TOT), and healthcare advisory.', sector: 'Healthcare', stage: 'Growth', location: 'Bengaluru' },
  { name: 'Just Connect Electricals', url: 'https://www.justconnectelectricals.com/', desc: 'Industrial processing and custom assembly of high-grade power cords, wiring harness structures, and electrical components with zero lag.', sector: 'Manufacturing', stage: 'Scale', location: 'Noida' },
  { name: 'Myniwa', url: 'https://myniwa.com/', desc: 'An exclusive, curated destination marketplace for sustainable, organic, and artisanal lifestyle brands.', sector: 'Sustainability', stage: 'Product Market Fit', location: 'Bengaluru' },
  { name: 'Elephantgod Infra LLP', url: '#', desc: 'Real estate planning and contract solutions setting up startup incubation centers, business parks, and raising venture building networks.', sector: 'Real Estate', stage: 'Fundraising', location: 'Bengaluru' },
  { name: 'Spykke', url: '#', desc: 'Smart shared smartphone charging networks and developing fast-charging battery pack technologies for consumer devices.', sector: 'Technology', stage: 'Growth', location: 'Mumbai' },
  { name: 'Enumerati Solutions LLP', url: 'http://www.cosmiceye.in/', desc: 'Delivers advanced data & video analytics, AI-driven insights, custom visualization systems, and strategic tech services across multiple industries.', sector: 'AI & Data', stage: 'Product Market Fit', location: 'Bengaluru' }
];

function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const searchInput = document.getElementById('portfolio-search');
  const sectorFilter = document.getElementById('filter-sector');
  const stageFilter = document.getElementById('filter-stage');

  if (!grid) return;

  function renderPortfolio(items) {
    grid.innerHTML = '';
    if (items.length === 0) {
      grid.innerHTML = `<div class="glass-card" style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No portfolio companies match your criteria.</div>`;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'portfolio-card';
      
      const linkHtml = item.url !== '#' 
        ? `<a href="${item.url}" target="_blank" class="portfolio-link">Visit Website <i class="fas fa-external-link-alt"></i></a>`
        : `<span class="portfolio-link" style="color: var(--text-muted); cursor: not-allowed;">Website Offline</span>`;

      card.innerHTML = `
        <div class="portfolio-top">
          <h3>${item.name}</h3>
          <p class="portfolio-desc">${item.desc}</p>
        </div>
        <div class="portfolio-bottom">
          <span class="portfolio-tag">${item.sector}</span>
          ${linkHtml}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function filterItems() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const sector = sectorFilter ? sectorFilter.value : '';
    const stage = stageFilter ? stageFilter.value : '';

    const filtered = portfolioData.filter(item => {
      const matchQuery = item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
      const matchSector = sector === '' || item.sector === sector;
      const matchStage = stage === '' || item.stage === stage;
      return matchQuery && matchSector && matchStage;
    });

    renderPortfolio(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterItems);
  if (sectorFilter) sectorFilter.addEventListener('change', filterItems);
  if (stageFilter) stageFilter.addEventListener('change', filterItems);

  // Initial render
  renderPortfolio(portfolioData);
}

/* ==========================================================================
   6. MENTOR SHOWCASE (Data, Search, Filters)
   ========================================================================== */
const mentorsData = [
  { name: 'Ramani Iyer', title: 'Founder & Chief Mentor', company: 'Elephant God Accelerator (Co-Founder, JustDial)', expertise: 'Strategic Planning, Growth Strategy, Global Expansion, Joint Ventures', sector: 'General Business', stage: 'Scale', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Dr. Vivek Anand', title: 'Tech Venture Partner', company: 'Ex-director AI, Siemens', expertise: 'Artificial Intelligence, SaaS Scaling, Technical Architecture', sector: 'AI & Data', stage: 'Product Market Fit', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Meera Deshpande', title: 'Go-To-Market Advisor', company: 'Global Brands Corp', expertise: 'Brand Positioning, Social Media Growth, GTM execution, PR strategies', sector: 'Consumer Brands', stage: 'Validation', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Anil K. Hegde', title: 'Finance & Compliance Counsel', company: 'Vedic Ventures', expertise: 'Financial Modeling, Corporate Structuring, M&A due diligence', sector: 'Healthcare', stage: 'Fundraising', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Sanjay Krishnan', title: 'Operations Lead Advisor', company: 'Metro-Logistics Ltd', expertise: 'KPI Tracking, Supply Chain systems, Manufacturing Operations', sector: 'Mobility', stage: 'Growth', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200' }
];

function initMentors() {
  const grid = document.getElementById('mentors-grid');
  const searchInput = document.getElementById('mentor-search');
  const expertiseFilter = document.getElementById('filter-expertise');

  if (!grid) return;

  function renderMentors(items) {
    grid.innerHTML = '';
    if (items.length === 0) {
      grid.innerHTML = `<div class="glass-card" style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No mentors match your search criteria.</div>`;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'mentor-card';
      card.innerHTML = `
        <div class="mentor-header">
          <div class="mentor-avatar">
            <img src="${item.img}" alt="${item.name}">
          </div>
        </div>
        <div class="mentor-body">
          <h3>${item.name}</h3>
          <div style="font-size:0.85rem; font-weight:600; color:var(--primary); margin-bottom: 0.2rem;">${item.title}</div>
          <div class="mentor-company">${item.company}</div>
          <p class="mentor-bio">Expertise in <strong>${item.expertise}</strong>.</p>
          <div class="mentor-tags">
            <span class="mentor-tag">${item.stage} Stage</span>
            <span class="mentor-tag">${item.sector}</span>
          </div>
          <div class="mentor-footer">
            <span class="mentor-industry">${item.sector}</span>
            <a href="https://linkedin.com" target="_blank" style="color:var(--text-muted); font-size:1.1rem;"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function filterMentors() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const expertise = expertiseFilter ? expertiseFilter.value : '';

    const filtered = mentorsData.filter(item => {
      const matchQuery = item.name.toLowerCase().includes(query) || item.expertise.toLowerCase().includes(query);
      const matchExpertise = expertise === '' || item.sector === expertise;
      return matchQuery && matchExpertise;
    });

    renderMentors(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterMentors);
  if (expertiseFilter) expertiseFilter.addEventListener('change', filterMentors);

  renderMentors(mentorsData);
}

/* ==========================================================================
   7. INTERACTIVE EVENT CALENDAR
   ========================================================================== */
const mockEvents = {
  '2026-06-18': { title: 'Seed Funding Matchmaking Meetup', time: '14:00 - 17:00 IST', location: 'EGA Bangalore Hub & Online', desc: 'Exclusive pitching session connecting early-stage sustainability startups with premium family offices.' },
  '2026-06-23': { title: 'Venture Building Masterclass: Scaling GTM', time: '11:00 - 13:00 IST', location: 'Interactive Webinar', desc: 'Hosted by EGA Chief Mentors. Insights on optimizing customer acquisition and building sales funnels.' },
  '2026-06-29': { title: 'India Startup Ecosystem Demo Day', time: '10:00 - 16:00 IST', location: 'Taj West End, Bengaluru', desc: 'Our cohort showcase to 50+ institutional VCs, corporate partners, and prominent angel syndicates.' }
};

function initCalendar() {
  const grid = document.getElementById('calendar-grid');
  const details = document.getElementById('event-details-area');
  const monthLabel = document.getElementById('calendar-month-label');

  if (!grid || !details) return;

  // Render June 2026 Calendar
  const year = 2026;
  const month = 5; // June is 5 in JS Date (0-indexed)
  
  // June 2026 starts on a Monday (1)
  const startDayOffset = 1;
  const daysInMonth = 30;

  if (monthLabel) monthLabel.textContent = 'June 2026';

  // Add weekday headers
  grid.innerHTML = '';
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weekdays.forEach(day => {
    const label = document.createElement('div');
    label.className = 'calendar-day-label';
    label.textContent = day;
    grid.appendChild(label);
  });

  // Render empty offset cells
  for (let i = 0; i < startDayOffset; i++) {
    const empty = document.createElement('div');
    grid.appendChild(empty);
  }

  // Render day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const dateKey = `${year}-06-${dayStr}`;
    
    cell.innerHTML = `<span class="calendar-date">${day}</span>`;
    
    if (mockEvents[dateKey]) {
      cell.classList.add('has-event');
      const dot = document.createElement('div');
      dot.className = 'calendar-event-dot';
      cell.appendChild(dot);
    }

    cell.addEventListener('click', () => {
      // Toggle active border
      document.querySelectorAll('.calendar-cell').forEach(c => c.classList.remove('active'));
      cell.classList.add('active');

      renderEventDetails(dateKey);
    });

    grid.appendChild(cell);
  }

  function renderEventDetails(dateKey) {
    const event = mockEvents[dateKey];
    if (event) {
      details.innerHTML = `
        <h3 style="color: var(--secondary);">Selected Date Details</h3>
        <div class="details-event-card">
          <h3>${event.title}</h3>
          <div class="details-event-meta">
            <span><i class="far fa-clock"></i> ${event.time}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;">${event.desc}</p>
          <button class="btn btn-primary" onclick="registerForEvent('${event.title}')" style="width: 100%;">Register For Event</button>
        </div>
      `;
    } else {
      const parts = dateKey.split('-');
      const formattedDate = `${parts[2]} June ${parts[0]}`;
      details.innerHTML = `
        <h3 style="color: var(--secondary);">Selected Date Details</h3>
        <p style="color: var(--text-secondary); margin-top: 1.5rem;">No accelerator events scheduled for <strong>${formattedDate}</strong>.</p>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">Please select a date marked with a coral dot for active programs.</p>
      `;
    }
  }

  // Default select first event day
  renderEventDetails('2026-06-18');
  setTimeout(() => {
    const cells = grid.querySelectorAll('.calendar-cell');
    if (cells.length > 17) {
      cells[17].classList.add('active'); // 18th cell is index 17
    }
  }, 100);
}

window.registerForEvent = function(eventTitle) {
  alert(`Thank you! You have successfully registered for: "${eventTitle}". Event join links have been sent to your email.`);
};

/* ==========================================================================
   8. MULTI-STEP STARTUP APPLICATION WIZARD
   ========================================================================== */
function initApplicationWizard() {
  const form = document.getElementById('apply-wizard-form');
  const steps = document.querySelectorAll('.form-step-pane');
  const nextBtns = document.querySelectorAll('.next-step');
  const prevBtns = document.querySelectorAll('.prev-step');
  const stepNodes = document.querySelectorAll('.wizard-step-node');
  const progressLine = document.querySelector('.wizard-step-line');

  if (!form || !steps.length) return;

  let currentStep = 0;

  function updateSteps() {
    steps.forEach((step, idx) => {
      if (idx === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    stepNodes.forEach((node, idx) => {
      if (idx < currentStep) {
        node.className = 'wizard-step-node completed';
      } else if (idx === currentStep) {
        node.className = 'wizard-step-node active';
      } else {
        node.className = 'wizard-step-node';
      }
    });

    if (progressLine) {
      const percentage = (currentStep / (steps.length - 1)) * 100;
      progressLine.style.width = `${percentage}%`;
    }
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStepInputs(currentStep)) {
        currentStep++;
        updateSteps();
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep--;
      updateSteps();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStepInputs(currentStep)) {
      const formData = new FormData(form);
      const appData = {};
      formData.forEach((value, key) => {
        appData[key] = value;
      });

      // Persist to localStorage
      const existing = JSON.parse(localStorage.getItem('ega_applications') || '[]');
      existing.push({
        id: Date.now(),
        date: new Date().toISOString(),
        ...appData
      });
      localStorage.setItem('ega_applications', JSON.stringify(existing));

      alert('Application submitted successfully! Our venture partner team will review your pitch deck and get in touch within 3 business days.');
      form.reset();
      currentStep = 0;
      updateSteps();
    }
  });

  function validateStepInputs(stepIdx) {
    const pane = steps[stepIdx];
    const inputs = pane.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--primary)';
        isValid = false;
      } else {
        input.style.borderColor = 'var(--border-color)';
      }
    });

    if (!isValid) {
      alert('Please fill out all required fields marked with red borders.');
    }
    return isValid;
  }
}

/* ==========================================================================
   9. INVESTOR HUB REGISTRATION & MATCHMAKING
   ========================================================================== */
function initInvestorForm() {
  const form = document.getElementById('investor-register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const investorData = {};
    formData.forEach((value, key) => {
      investorData[key] = value;
    });

    const existing = JSON.parse(localStorage.getItem('ega_investors') || '[]');
    existing.push({
      id: Date.now(),
      date: new Date().toISOString(),
      ...investorData
    });
    localStorage.setItem('ega_investors', JSON.stringify(existing));

    alert('Thank you for joining the Elephant God Accelerator Investor Network! A Partner will contact you shortly to share matching startup deal flows.');
    form.reset();
  });
}

/* ==========================================================================
   10. FUNDING READINESS ASSESSMENT (Scorecard Tool)
   ========================================================================== */
const scorecardQuestions = [
  {
    text: "What is your startup's current revenue status?",
    options: [
      { text: "Pre-revenue / Idea Stage", points: 1 },
      { text: "Prototype/MVP launched, initial customer testing", points: 2 },
      { text: "Early commercial revenue (Less than ₹5L/month)", points: 3 },
      { text: "Scaling revenue (Greater than ₹5L/month, growing)", points: 5 }
    ]
  },
  {
    text: "Describe your core product or service state:",
    options: [
      { text: "Conceptual/Idea only", points: 1 },
      { text: "Working prototype or wireframes", points: 2 },
      { text: "Beta product live with users, iterating daily", points: 4 },
      { text: "Fully launched production-ready product with IP/Defensibility", points: 5 }
    ]
  },
  {
    text: "What is the team size and composition?",
    options: [
      { text: "Solo founder", points: 1 },
      { text: "2-3 co-founders, no external team", points: 3 },
      { text: "Co-founders + core technical/operational staff", points: 4 },
      { text: "Fully rounded management team + execution divisions", points: 5 }
    ]
  },
  {
    text: "Have you validated market size and customer demand?",
    options: [
      { text: "Based on general desk research and estimates", points: 1 },
      { text: "Conducted 20+ customer interviews, positive feedback", points: 3 },
      { text: "Paying pilots / initial paying customers in place", points: 4 },
      { text: "Established high Net Promoter Score (NPS) and repeat transactions", points: 5 }
    ]
  },
  {
    text: "What is your previous fundraising history?",
    options: [
      { text: "Bootstrapped completely", points: 2 },
      { text: "Raised grants or friends & family funding", points: 3 },
      { text: "Raised angel syndicate / institutional pre-seed round", points: 5 }
    ]
  }
];

function initScorecard() {
  const startBtn = document.getElementById('scorecard-start');
  const welcomePane = document.getElementById('scorecard-welcome');
  const qBox = document.getElementById('scorecard-qbox');
  const progress = document.getElementById('scorecard-progress-bar');
  const resultPane = document.getElementById('scorecard-result');
  const resultVerdict = document.getElementById('result-verdict');
  const resultFeedback = document.getElementById('result-feedback');
  const scorePercent = document.getElementById('score-percent');
  const circleFill = document.querySelector('.circle-fill');

  if (!startBtn || !qBox) return;

  let currentQ = 0;
  let totalScore = 0;
  const maxScore = scorecardQuestions.length * 5;

  startBtn.addEventListener('click', () => {
    welcomePane.style.display = 'none';
    qBox.style.display = 'block';
    renderQuestion();
  });

  function renderQuestion() {
    const question = scorecardQuestions[currentQ];
    qBox.innerHTML = `
      <div class="scorecard-question">Q${currentQ + 1}: ${question.text}</div>
      <div class="scorecard-options">
        ${question.options.map((opt, idx) => `
          <button class="scorecard-option-btn" data-points="${opt.points}">
            <span class="scorecard-option-bullet"></span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
    `;

    // Update progress bar
    const percent = ((currentQ + 1) / scorecardQuestions.length) * 100;
    if (progress) progress.style.width = `${percent}%`;

    // Attach click events to options
    qBox.querySelectorAll('.scorecard-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.add('selected');
        const points = parseInt(btn.getAttribute('data-points'));
        totalScore += points;

        setTimeout(() => {
          currentQ++;
          if (currentQ < scorecardQuestions.length) {
            renderQuestion();
          } else {
            showResults();
          }
        }, 300);
      });
    });
  }

  function showResults() {
    qBox.style.display = 'none';
    resultPane.style.display = 'block';
    
    const scorePercentage = Math.round((totalScore / maxScore) * 100);
    if (scorePercent) scorePercent.textContent = `${scorePercentage}%`;

    // Radial circle dashoffset calculation
    if (circleFill) {
      const radius = circleFill.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (scorePercentage / 100) * circumference;
      circleFill.style.strokeDasharray = `${circumference}`;
      circleFill.style.strokeDashoffset = `${offset}`;
    }

    let verdict = "";
    let feedback = "";
    let verdictClass = "";

    if (scorePercentage >= 80) {
      verdict = "Highly Funding Ready";
      verdictClass = "readiness-high";
      feedback = "Outstanding! Your startup has strong operational metrics, validation, and team structure. You are extremely attractive to VCs and angel networks. We recommend applying immediately to our accelerator program for curated investor introductions.";
    } else if (scorePercentage >= 50) {
      verdict = "Moderate Readiness";
      verdictClass = "readiness-medium";
      feedback = "Good progress! Your startup has validated core concepts and has initial traction, but requires growth systems, corporate partnerships, and financial polishing. Elephant God Accelerator can help refine your model and secure fundraising.";
    } else {
      verdict = "Early / Foundation Phase";
      verdictClass = "readiness-low";
      feedback = "Your venture is in the foundation phase. You need to focus on customer validation, developing a robust MVP, and structuring operations. Apply to our startup mentorship module to align your business parameters before approaching investors.";
    }

    if (resultVerdict) {
      resultVerdict.textContent = verdict;
      resultVerdict.className = `result-verdict ${verdictClass}`;
    }
    if (resultFeedback) {
      resultFeedback.textContent = feedback;
    }
  }
}

/* ==========================================================================
   11. INTEGRATIONS & MODALS (WhatsApp & Calendly)
   ========================================================================== */
function initModals() {
  const modal = document.getElementById('meeting-modal');
  const closeBtn = document.querySelector('.modal-close');
  const meetingTriggers = document.querySelectorAll('.schedule-meeting-trigger');
  const form = document.getElementById('meeting-schedule-form');

  if (!modal || !closeBtn) return;

  meetingTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('meeting-date').value;
      const time = document.getElementById('meeting-time').value;
      
      const existing = JSON.parse(localStorage.getItem('ega_meetings') || '[]');
      existing.push({
        id: Date.now(),
        dateRequested: new Date().toISOString(),
        meetingDate: date,
        meetingTime: time,
        email: form.querySelector('input[type="email"]').value
      });
      localStorage.setItem('ega_meetings', JSON.stringify(existing));

      alert(`Success! Your meeting has been scheduled for ${date} at ${time}. Check your email for the Google Meet calendar invite.`);
      modal.style.display = 'none';
      form.reset();
    });
  }
}

/* ==========================================================================
   12. DYNAMIC COUNTERS (Scroll Triggered)
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'));
        const speed = 200; // lower is slower
        const count = 0;
        
        let current = 0;
        const step = Math.ceil(targetValue / 50);
        
        const update = () => {
          current += step;
          if (current >= targetValue) {
            target.textContent = targetValue + (target.getAttribute('data-suffix') || '');
          } else {
            target.textContent = current + (target.getAttribute('data-suffix') || '');
            requestAnimationFrame(update);
          }
        };
        
        update();
        obs.unobserve(target); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
