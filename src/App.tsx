import React, { useState, useEffect } from 'react';
import { CustomerLead, LandscaperApplication } from './types';
import RoiCalculator from './components/RoiCalculator';
import PriceShieldDemo from './components/PriceShieldDemo';
import LeadsDashboard from './components/LeadsDashboard';
import OfferDetails from './components/OfferDetails';
import LandscaperApplicationForm from './components/LandscaperApplication';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Users, 
  FileCheck, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import heroImage from './assets/images/landscaping_hero_1782574482901.jpg';
import logoImage from './assets/images/localflow-logo.png';

// Initial preloaded mock leads in the database
const INITIAL_MOCK_LEADS: CustomerLead[] = [
  {
    id: "lead_uq83n1ka",
    name: "James Sterling",
    phone: "07712 400921",
    email: "james.sterling@outlook.com",
    postcode: "GU1 4HG",
    budget: "10k-20k",
    timeline: "immediate",
    ownsProperty: true,
    bookedSlot: "Mon 10:00 AM (Site Survey)",
    status: "QUALIFIED",
    submittedAt: "10:14 AM"
  },
  {
    id: "lead_pl92z0xw",
    name: "Emma Thurgood",
    phone: "07755 902231",
    email: "emma.thurgood@gmail.com",
    postcode: "OX2 6EE",
    budget: "5k-10k",
    timeline: "1-3-months",
    ownsProperty: true,
    bookedSlot: "Tue 2:00 PM (Site Survey)",
    status: "QUALIFIED",
    submittedAt: "08:45 AM"
  },
  {
    id: "lead_ty74a2cb",
    name: "Gary McArthur",
    phone: "07700 900088",
    email: "gary.mc88@hotmail.co.uk",
    postcode: "BS1 6PL",
    budget: "under-2.5k",
    timeline: "immediate",
    ownsProperty: false,
    bookedSlot: null,
    status: "SCREENED OUT",
    submittedAt: "Yesterday"
  },
  {
    id: "lead_ka39x1hd",
    name: "Charlotte Vance",
    phone: "07799 112233",
    email: "charlotte.vance@vancedesign.com",
    postcode: "RG1 4NW",
    budget: "10k-20k",
    timeline: "immediate",
    ownsProperty: true,
    bookedSlot: "Wed 11:30 AM (Site Survey)",
    status: "QUALIFIED",
    submittedAt: "Yesterday"
  },
  {
    id: "lead_ty42f1aa",
    name: "Robert Finch",
    phone: "07711 556677",
    email: "rfinch76@yahoo.co.uk",
    postcode: "LS12 3BA",
    budget: "under-2.5k",
    timeline: "3-6-months",
    ownsProperty: true,
    bookedSlot: null,
    status: "SCREENED OUT",
    submittedAt: "2 days ago"
  }
];

export default function App() {
  const [leads, setLeads] = useState<CustomerLead[]>(() => {
    const savedLeads = localStorage.getItem('uk_landscaper_leads');
    return savedLeads ? JSON.parse(savedLeads) : INITIAL_MOCK_LEADS;
  });

  const [landscaperApps, setLandscaperApps] = useState<LandscaperApplication[]>(() => {
    const savedApps = localStorage.getItem('uk_landscaper_apps');
    return savedApps ? JSON.parse(savedApps) : [];
  });

  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  // Sync leads to LocalStorage
  useEffect(() => {
    localStorage.setItem('uk_landscaper_leads', JSON.stringify(leads));
  }, [leads]);

  // Sync applications to LocalStorage
  useEffect(() => {
    localStorage.setItem('uk_landscaper_apps', JSON.stringify(landscaperApps));
  }, [landscaperApps]);

  const handleLeadAdded = (newLead: CustomerLead) => {
    // Put new lead at the top
    setLeads(prev => [newLead, ...prev]);
  };

  const handleClearLeads = () => {
    setLeads(INITIAL_MOCK_LEADS);
  };

  const handleRemoveLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const handleApplicationSubmitted = (newApp: LandscaperApplication) => {
    setLandscaperApps(prev => [newApp, ...prev]);
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    {
      q: "Is there really £0 in agency setup or service fees?",
      a: "Yes, 100% correct. I am launching this specialized marketing practice exclusively for UK landscapers. To prove the power of our 'Price-Shield' system, I do all the setup work, landing page creation, Meta integrations, copywriting, and daily ad optimizations for 30 days for £0 in agency fees. No catch, no contracts."
    },
    {
      q: "Where does the £500 budget go and who handles it?",
      a: "The £500 is your ad budget paid directly to Meta (Facebook & Instagram) via your own secure ad account. I will configure your business profile and set up billing under your name. We never touch or hold your money, ensuring 100% transparency. Your only financial risk is this direct ad cost."
    },
    {
      q: "What is the 'Price-Shield' system and how does it filter people?",
      a: "Typical lead generators (like Bark or RatedPeople) sell cheap £15 lead logs to 5 different landscapers at once. Homeowners on those platforms are often looking for small £100 fence repairs or lawn trims. Our system creates your own exclusive landing page that forces prospects through strict screening: budget check (£2,500 minimum), property ownership confirmation, and high-intent timeline. If they don't qualify, the system politely filters them out so they never reach your calendar."
    },
    {
      q: "Do I really get to keep everything if I don't close a high-ticket job?",
      a: "Yes. If we launch the 30-day pilot and you don't close at least one job and make a massive return on that £500, we part ways. You keep the custom high-converting landing pages, the full customer lead database (CRM), our winning Meta ad creatives, and all the calendar automations I built for you. No licensing fees or requests for returned files. They are Yours, forever."
    },
    {
      q: "How many leads can I expect, and are they shared with others?",
      a: "No. These leads are 100% exclusive to you—built on your own brand. Based on UK industry ad benchmarks (£20–£50 cost per qualified lead), a £500 budget generates 10 to 25 screened leads. At a normal closing rate of 25%, that results in 2 to 6 closed high-ticket sales."
    },
    {
      q: "Why are you doing this for £0?",
      a: "Because I am launching this specialized niche agency and I need massive, undeniable UK case studies. I know that once you see £15,000+ in high-ticket landscaping revenue booked directly onto your calendar in month 1, you'll want to hire me to keep running it in month 2. If not, you walk away with a free setup and no hard feelings."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Exclusivity Header Alert Bar */}
      <div className="bg-amber-50 border-b border-amber-100 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap text-xs font-semibold text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <span>UK Trade Exclusivity Hold: Only partnering with ONE landscaper per geographic area.</span>
          <a href="#application-section" className="underline hover:text-amber-950 font-bold ml-1 flex items-center gap-0.5">
            Check availability in your postcode <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Primary Header/Nav */}
      <header className="border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoImage} alt="LocalFlow Growth logo" className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain" />
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <a href="#the-offer" className="hover:text-emerald-700 transition-colors">THE PRICE-SHIELD™</a>
            <a href="#roi-calculator" className="hover:text-emerald-700 transition-colors">RESULTS & MATH</a>
            <a href="#dashboard-section" className="hover:text-emerald-700 transition-colors">LEAD CRM SANDBOX</a>
            <a href="#faqs" className="hover:text-emerald-700 transition-colors">GUARANTEE & FAQS</a>
          </nav>

          <div>
            <a 
              href="#application-section"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold transition-all uppercase tracking-wider"
            >
              UK LANDSCAPERS ONLY
            </a>
          </div>
        </div>
      </header>

      <main className="space-y-24 pb-24">
        
        {/* SECTION 1: HERO SECTION */}
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-4">
                SPECIALIZED UK LANDSCAPING OFFER
              </div>
              
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.1] mb-6">
                Fill Your Calendar with <span className="text-emerald-700 font-black italic underline underline-offset-4 tracking-tighter">£2.5k+</span> Projects.
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                We build your custom lead-engine and manage it for <span className="font-bold text-slate-900">30 days for £0 in agency fees</span>. Your only cost is a £500 Meta ad budget paid directly to them.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a 
                  href="#price-shield-demo"
                  className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-all shadow-md text-center flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  Test Price-Shield Demo <ChevronRight className="w-4 h-4" />
                </a>
                <a 
                  href="#application-section"
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-950 text-white text-sm font-bold rounded-xl transition-all text-center flex items-center justify-center gap-1.5 uppercase tracking-wide"
                >
                  Claim Your 30-Day Trial
                </a>
              </div>

              {/* Minimal social proof / pilot metrics */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                <div>
                  <div className="text-2xl font-bold font-mono text-slate-900">£0</div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Agency Fees</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-emerald-700">£2.5k+</div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Quality Shield</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-slate-900">100%</div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Risk-Free</div>
                </div>
              </div>
            </div>

            {/* Hero Image / Widget Graphic */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-100">
                {/* Beautiful garden photo generated by tool */}
                <img 
                  src={heroImage} 
                  alt="High-ticket garden landscaping makeover project showcase" 
                  className="w-full h-[320px] md:h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-250 shadow-lg flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[9px] font-mono text-emerald-800 font-bold block uppercase">Homeowner Match</span>
                    <span className="font-bold text-slate-900 text-sm block">Sarah Jenkins (Guildford)</span>
                    <span className="text-xs text-slate-500 block">Project: New Patio Design · Budget: £8.5k</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold font-mono shrink-0">
                    QUALIFIED
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center italic">
                *Typical premium project captured by the system. Price-Shield weeds out cheap requests and focuses exclusively on £2,500+ inquiries.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 2: THE PROBLEM (WHY OTHERS FAIL YOU) */}
        <section id="the-problem" className="bg-slate-50 py-16 border-y border-slate-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">The Industry Trap</span>
              <h3 className="text-3xl font-bold font-display text-slate-950 mt-1">
                Why Standard Lead Generators Waste Your Time and Money
              </h3>
              <p className="text-slate-500 text-sm mt-2">
                If you've bought leads on Bark, RatedPeople, or local flyers, you already know the painful reality:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Problem 1 */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3">
                <span className="text-2xl">👥</span>
                <h4 className="font-bold text-slate-900 text-sm">Shared Leads (The Price War)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Brokers sell the exact same customer log to 5 local landscapers simultaneously. You are forced into a race to the bottom, cutting your margins just to win the bid.
                </p>
              </div>

              {/* Problem 2 */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3">
                <span className="text-2xl">💸</span>
                <h4 className="font-bold text-slate-900 text-sm">Tyre-Kickers & Cheap Repairs</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Most online inquiries are renters or bargain hunters wanting a £100 fence fix, single paving slab repair, or basic weeding. You waste hours driving out to quote on non-profitable jobs.
                </p>
              </div>

              {/* Problem 3 */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3">
                <span className="text-2xl">📱</span>
                <h4 className="font-bold text-slate-900 text-sm">The "Admin Chase" Exhaustion</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  You spend your evenings typing messages, calling leads that don't pick up, and chasing details. By the time they answer, they've either bought elsewhere or lost interest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE LIVE PRICE-SHIELD DEMO SIMULATION */}
        <section id="the-offer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy explainers */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                PROVE IT FIRST
              </span>
              <h3 className="text-3xl font-bold font-display text-slate-950 tracking-tight leading-tight">
                Watch the 'Price-Shield' Screen Your Calls In Real-Time
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Homeowners who click your custom ads land on a specialized, high-converting qualification flow.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Budget Verification Gating</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      We screen budgets prior to any phone call. People wanting £100 patch-ups are politely redirected, saving your fuel and travel time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Property Ownership Check</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Only homeowners are prompted to book site surveys. Renters or commercial tenants without signature authority are flagged and archived.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Automated Calendar Booking</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Qualified prospects lock in a slot on your schedule right after submitting details, entirely hands-off for you.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <strong>Try it yourself:</strong> Use the live console simulator on the right. See what Dave (Tyre-Kicker) experiences versus Sarah (Dream Client), then see them map instantly onto our sandbox database below.
                </div>
              </div>
            </div>

            {/* Simulated Live Console Wrapper */}
            <div className="lg:col-span-7">
              <PriceShieldDemo onLeadAdded={handleLeadAdded} />
            </div>

          </div>
        </section>

        {/* SECTION 4: LIVE SANDBOX LEADS DATABASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <LeadsDashboard 
            leads={leads} 
            onClearLeads={handleClearLeads}
            onRemoveLead={handleRemoveLead}
          />
        </section>

        {/* SECTION 5: ROI CALCULATOR */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-bold">Revenue Projections</span>
            <h3 className="text-3xl font-bold font-display text-slate-950 mt-1">
              Do the Maths: What's a £500 Investment Worth?
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              With agency setup fees at <strong>£0</strong> for the first 30 days, your ad spend return multiplier is incredibly high. Move the sliders to fit your business.
            </p>
          </div>
          
          <RoiCalculator />
        </section>

        {/* SECTION 6: CORE VALUE PILLARS & GUARANTEE DETAILS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfferDetails />
        </section>

        {/* SECTION 7: EXCLUSIVE Postcode Registration Form */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">Limited Pilot Intake</span>
            <h3 className="text-3xl font-bold font-display text-slate-900 mt-1">
              Check If Your Region Is Open
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Only one landscaper is accepted per exclusive UK postal sector to prevent lead-splitting or brand conflicts. Submit your business basics below to apply.
            </p>
          </div>

          <LandscaperApplicationForm onApplicationSubmitted={handleApplicationSubmitted} />

          {landscaperApps.length > 0 && (
            <div className="mt-8 bg-slate-50 border border-slate-200/60 rounded-2xl p-5 max-w-xl mx-auto">
              <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider text-center font-bold mb-3">
                Live Postcode Submissions Log (Current Session)
              </span>
              <div className="space-y-2.5 max-h-[150px] overflow-y-auto">
                {landscaperApps.map((app) => (
                  <div key={app.id} className="bg-white border border-slate-100 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-800">{app.businessName}</strong> ({app.location})
                      <span className="block text-[10px] text-slate-400">Owner: {app.contactName} · Applied {app.submittedAt}</span>
                    </div>
                    <span className="bg-amber-100 text-amber-850 px-2 py-0.5 rounded font-bold text-[10px] font-mono animate-pulse">
                      PENDING REVIEW
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SECTION 8: DETAILED FAQS */}
        <section id="faqs" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-emerald-800 mx-auto mb-3" />
            <h3 className="text-3xl font-bold font-display text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Everything you need to know about the £0 fee, the £500 Meta spend, and our Price-Shield software guarantee.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div 
                  key={idx} 
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm md:text-base font-display">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-emerald-700' : ''
                    }`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-slate-100 text-xs md:text-sm text-slate-500 leading-relaxed bg-slate-50/20">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-700 text-white rounded flex items-center justify-center font-bold text-sm shadow-sm">
                L
              </div>
              <div>
                <span className="font-bold text-white text-base tracking-tight block">LocalFlow Growth</span>
                <span className="text-[9px] font-mono text-emerald-500 uppercase block tracking-wider">
                  UK Specialized Landscaper Marketing Practice
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-400">
              <a href="#the-offer" className="hover:text-white">The Offer</a>
              <a href="#price-shield-demo" className="hover:text-white">Price-Shield™ Demo</a>
              <a href="#roi-calculator" className="hover:text-white">ROI Calculator</a>
              <a href="#dashboard-section" className="hover:text-white">Lead CRM Sandbox</a>
              <a href="#application-section" className="hover:text-white text-emerald-400 font-bold">Apply Now</a>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6 space-y-4">
            <p className="leading-relaxed text-slate-500 max-w-4xl">
              Disclaimer: LocalFlow Growth is an independent trade lead acquisition practice. We are not associated, affiliated, endorsed by, or in any way officially connected with Meta Platforms, Inc., Facebook, Instagram, or any of their subsidiaries. All trademarks, logos, and brand names are the property of their respective owners. UK Meta ad benchmarks and costs per lead of £20–£50 are estimates based on active industry sector diagnostics in 2026 and fluctuate based on seasonal demand, geography, and local market competitiveness.
            </p>
          </div>
        </div>

        {/* Professional Polish Bottom Status Bar */}
        <div className="bg-white px-6 lg:px-12 py-5 border-t border-slate-200 mt-10 flex flex-col sm:flex-row justify-between items-center text-[11px] font-bold text-slate-500 gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-6 italic">
            <span>📍 UK-WIDE SERVICE</span>
            <span>✅ £0 AGENCY FEES (FIRST 30 DAYS)</span>
            <span>📊 META BENCHMARK LEAD COST: £20-50</span>
          </div>
          <div className="text-slate-400 font-medium font-sans">
            © 2026 LOCALFLOW GROWTH. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

    </div>
  );
}
