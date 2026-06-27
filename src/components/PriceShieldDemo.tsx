import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, Calendar, ArrowRight, RefreshCw, User, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { CustomerLead } from '../types';

interface PriceShieldDemoProps {
  onLeadAdded: (lead: CustomerLead) => void;
}

export default function PriceShieldDemo({ onLeadAdded }: PriceShieldDemoProps) {
  const [step, setStep] = useState<number>(1); // 1: Info/Selection, 2: Budget Q, 3: Ownership Q, 4: Timeline Q, 5: Contact Info, 6: Calendar Booking, 7: Final Outcome
  const [quizState, setQuizState] = useState({
    budget: '' as any,
    ownsProperty: null as boolean | null,
    timeline: '' as any,
    name: '',
    email: '',
    phone: '',
    postcode: '',
    bookedSlot: null as string | null
  });

  const [isSimulatedTyreKicker, setIsSimulatedTyreKicker] = useState<boolean>(false);

  // Restart simulation
  const handleReset = () => {
    setStep(1);
    setQuizState({
      budget: '',
      ownsProperty: null,
      timeline: '',
      name: '',
      email: '',
      phone: '',
      postcode: '',
      bookedSlot: null
    });
    setIsSimulatedTyreKicker(false);
  };

  // Pre-fill as Tyre Kicker for educational demo
  const startTyreKickerDemo = () => {
    setIsSimulatedTyreKicker(true);
    setStep(2); // Go to first question
  };

  // Pre-fill as Dream High-Ticket Client
  const startDreamClientDemo = () => {
    setIsSimulatedTyreKicker(false);
    setStep(2); // Go to first question
  };

  const handleBudgetSelect = (value: any) => {
    setQuizState(prev => ({ ...prev, budget: value }));
    // In our Price-Shield logic, if budget is 'under-2.5k', they are immediately flagged
    setStep(3);
  };

  const handleOwnershipSelect = (owns: boolean) => {
    setQuizState(prev => ({ ...prev, ownsProperty: owns }));
    setStep(4);
  };

  const handleTimelineSelect = (time: any) => {
    setQuizState(prev => ({ ...prev, timeline: time }));
    // Skip details if we want a fast demo, but let's go to contact info
    setStep(5);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizState.name || !quizState.phone) return;
    
    // Check if filtered out
    const isFiltered = quizState.budget === 'under-2.5k' || quizState.ownsProperty === false;
    
    if (isFiltered) {
      // Screened out immediately!
      createAndSubmitLead(null, 'SCREENED OUT');
      setStep(7); // Jump straight to filtered screen
    } else {
      setStep(6); // Booking step
    }
  };

  const handleBooking = (slot: string) => {
    setQuizState(prev => ({ ...prev, bookedSlot: slot }));
    createAndSubmitLead(slot, 'QUALIFIED');
    setStep(7);
  };

  const createAndSubmitLead = (slot: string | null, finalStatus: 'QUALIFIED' | 'SCREENED OUT') => {
    const newLead: CustomerLead = {
      id: `lead_${Math.random().toString(36).substr(2, 9)}`,
      name: quizState.name || (isSimulatedTyreKicker ? "Dave Smith (Tyre-Kicker)" : "Sarah Jenkins (High-Ticket)"),
      phone: quizState.phone || (isSimulatedTyreKicker ? "07700 900077" : "07711 922334"),
      email: quizState.email || (isSimulatedTyreKicker ? "dave.tyre@hotmail.co.uk" : "sarah.jenkins@gmail.com"),
      postcode: quizState.postcode || (isSimulatedTyreKicker ? "LS1 1BA" : "RG1 2NE"),
      budget: quizState.budget || '5k-10k',
      timeline: quizState.timeline || 'immediate',
      ownsProperty: quizState.ownsProperty ?? true,
      bookedSlot: slot,
      status: finalStatus,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onLeadAdded(newLead);
  };

  // Mock slots
  const mockSlots = [
    "Mon 10:00 AM (Site Survey)",
    "Mon 2:00 PM (Site Survey)",
    "Tue 11:30 AM (Site Survey)",
    "Wed 9:00 AM (Site Survey)",
    "Wed 4:00 PM (Site Survey)"
  ];

  return (
    <div id="price-shield-demo" className="bg-slate-950 text-white rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Visual background indicator */}
      <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-500 flex items-center gap-1.5 border-l border-b border-slate-800 rounded-bl-xl bg-slate-900/50">
        <span className={`w-1.5 h-1.5 rounded-full ${step === 7 ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`}></span>
        {step === 7 ? 'SIMULATION RECAP' : 'LIVE CONSOLE SIMULATOR'}
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/20">
            Price-Shield™ Live Demo
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight">Experience Your Automated Funnel</h3>
        <p className="text-slate-400 text-sm mt-1">
          Test the homeowner journey. See how the system auto-qualifies luxury jobs and screens out small £500 repairs.
        </p>
      </div>

      {/* Screen container */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 min-h-[380px] flex flex-col justify-between relative">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Selection Entrance */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 my-auto"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold">Choose an archetype to simulate:</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  See how our filtering algorithms separate high-margin garden designs from small handyman requests.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option A: Dream Client */}
                <button
                  onClick={startDreamClientDemo}
                  className="bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 p-5 rounded-xl text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-emerald-400 font-bold text-sm">Archetype A</span>
                      <span className="bg-emerald-500 text-slate-950 text-[10px] px-2 py-0.5 rounded font-bold font-mono">DREAM CLIENT</span>
                    </div>
                    <h5 className="font-semibold text-white">Sarah Jenkins</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Wants a slate porcelain patio installation. Budget: <strong className="text-emerald-300">£8,500</strong>. Owns property.
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Simulate Sarah's path <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Option B: Tyre Kicker */}
                <button
                  onClick={startTyreKickerDemo}
                  className="bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 p-5 rounded-xl text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-red-400 font-bold text-sm">Archetype B</span>
                      <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold font-mono">TYRE-KICKER</span>
                    </div>
                    <h5 className="font-semibold text-white">Dave Smith</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Wants a broken fence post replaced. Budget: <strong className="text-red-300">£400</strong>. Renting.
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-red-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Simulate Dave's path <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Budget Screening Question */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 my-auto"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Question 1 of 3 (Budget Filter)</span>
                <h4 className="text-lg font-bold font-display text-white mt-1">What is the estimated budget for your garden transformation?</h4>
                <p className="text-xs text-slate-400 mt-0.5">The Price-Shield automatically redirects and screens out work below £2.5k.</p>
              </div>

              {isSimulatedTyreKicker ? (
                <div className="bg-red-950/20 border border-red-900/40 p-3 rounded-lg text-xs text-red-300 mb-2">
                  💡 <strong>Simulator Help:</strong> Dave represents a typical budget seeker. Click the red button to see the automatic shield logic.
                </div>
              ) : (
                <div className="bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-lg text-xs text-emerald-300 mb-2">
                  💡 <strong>Simulator Help:</strong> Sarah is a premium buyer. Click any £2.5k+ option to advance as a qualified lead.
                </div>
              )}

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => handleBudgetSelect('under-2.5k')}
                  className={`w-full py-3 px-4 rounded-xl text-left border transition-all text-sm flex justify-between items-center ${
                    isSimulatedTyreKicker 
                      ? 'bg-red-900/30 border-red-500/80 text-red-200 shadow-md shadow-red-950' 
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-750'
                  }`}
                >
                  <span>Under £2,500 (Minor Repairs / Fencing)</span>
                  {isSimulatedTyreKicker && <span className="text-[10px] bg-red-600 text-white font-mono px-1.5 py-0.5 rounded font-bold">Dave's Choice</span>}
                </button>
                <button
                  onClick={() => handleBudgetSelect('2.5k-5k')}
                  className={`w-full py-3 px-4 rounded-xl text-left border transition-all text-sm flex justify-between items-center ${
                    !isSimulatedTyreKicker 
                      ? 'bg-emerald-950/40 border-emerald-800 hover:bg-emerald-900/40' 
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-750'
                  }`}
                >
                  <span>£2,500 – £5,000 (Small/Medium Garden Transformation)</span>
                  {!isSimulatedTyreKicker && <span className="text-[10px] bg-emerald-600 text-slate-950 font-mono px-1.5 py-0.5 rounded font-bold">Sarah's Range</span>}
                </button>
                <button
                  onClick={() => handleBudgetSelect('5k-10k')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-left text-sm transition-all"
                >
                  <span>£5,000 – £10,000 (Full-Scale Landscaping)</span>
                </button>
                <button
                  onClick={() => handleBudgetSelect('10k-20k')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-left text-sm transition-all"
                >
                  <span>£10,000+ (Premium Garden Overhaul)</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Ownership Screening Question */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 my-auto"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Question 2 of 3 (Ownership Filter)</span>
                <h4 className="text-lg font-bold font-display text-white mt-1">Do you own the residential property where landscaping is needed?</h4>
                <p className="text-xs text-slate-400 mt-0.5">We strictly filter out tenants or renters, as only owners sign off on £2.5k+ remodels.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={() => handleOwnershipSelect(true)}
                  className={`py-6 px-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    !isSimulatedTyreKicker 
                      ? 'bg-emerald-950/40 border-emerald-800' 
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-750'
                  }`}
                >
                  <span className="text-2xl">🏡</span>
                  <span className="text-sm font-semibold">Yes, I am the homeowner</span>
                  {!isSimulatedTyreKicker && <span className="text-[9px] bg-emerald-600 text-slate-950 font-mono px-1.5 py-0.2 rounded font-bold">Sarah's Choice</span>}
                </button>

                <button
                  onClick={() => handleOwnershipSelect(false)}
                  className={`py-6 px-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    isSimulatedTyreKicker 
                      ? 'bg-red-900/30 border-red-500/80 text-red-200' 
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-750'
                  }`}
                >
                  <span className="text-2xl">🏢</span>
                  <span className="text-sm font-semibold">No, I am renting/leasing</span>
                  {isSimulatedTyreKicker && <span className="text-[9px] bg-red-600 text-white font-mono px-1.5 py-0.2 rounded font-bold">Dave's Choice</span>}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Timeline Question */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 my-auto"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Question 3 of 3 (Intent Filter)</span>
                <h4 className="text-lg font-bold font-display text-white mt-1">When would you ideally like to start this garden transformation?</h4>
                <p className="text-xs text-slate-400 mt-0.5">Knowing timeline lets you schedule high-urgency surveys immediately.</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => handleTimelineSelect('immediate')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-left text-sm transition-all flex justify-between items-center"
                >
                  <span>As soon as possible (Ready to book)</span>
                  {!isSimulatedTyreKicker && <span className="text-[9px] bg-emerald-600 text-slate-950 font-mono px-1.5 py-0.2 rounded font-bold">Sarah's Choice</span>}
                </button>
                <button
                  onClick={() => handleTimelineSelect('1-3-months')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-left text-sm transition-all"
                >
                  <span>In the next 1 to 3 months (Planning stage)</span>
                </button>
                <button
                  onClick={() => handleTimelineSelect('3-6-months')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-left text-sm transition-all"
                >
                  <span>Just researching prices for next year</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Contact Details */}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Contact Authentication</span>
                <h4 className="text-lg font-bold font-display text-white mt-0.5">Where should we send your custom design quote summary?</h4>
                <p className="text-xs text-slate-400">Your system verifies real postcodes and phone numbers to ensure high-intent contact.</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400">FULL NAME</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder={isSimulatedTyreKicker ? "Dave Smith" : "Sarah Jenkins"}
                        value={quizState.name}
                        onChange={e => setQuizState({ ...quizState, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400">UK POSTCODE</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder={isSimulatedTyreKicker ? "LS1 1BA" : "RG1 2NE"}
                        value={quizState.postcode}
                        onChange={e => setQuizState({ ...quizState, postcode: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 uppercase text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400">MOBILE PHONE (For booking SMS notification)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder={isSimulatedTyreKicker ? "07700 900077" : "07711 922334"}
                      value={quizState.phone}
                      onChange={e => setQuizState({ ...quizState, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400">EMAIL ADDRESS</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder={isSimulatedTyreKicker ? "dave.tyre@hotmail.co.uk" : "sarah.jenkins@gmail.com"}
                      value={quizState.email}
                      onChange={e => setQuizState({ ...quizState, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                    />
                  </div>
                </div>

                {/* Simulated auto-fill button */}
                <button
                  type="button"
                  onClick={() => {
                    if (isSimulatedTyreKicker) {
                      setQuizState(prev => ({
                        ...prev,
                        name: "Dave Smith",
                        email: "dave.tyre@hotmail.co.uk",
                        phone: "07700 900077",
                        postcode: "LS1 1BA"
                      }));
                    } else {
                      setQuizState(prev => ({
                        ...prev,
                        name: "Sarah Jenkins",
                        email: "sarah.jenkins@gmail.com",
                        phone: "07711 922334",
                        postcode: "RG1 2NE"
                      }));
                    }
                  }}
                  className="text-xs text-emerald-400 underline hover:text-emerald-300 block pt-1"
                >
                  ⚡ Auto-fill simulated details
                </button>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm mt-4 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  Verify Quote & Continue <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 6: Automated Calendar Booking */}
          {step === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4 my-auto"
            >
              <div className="text-center">
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-mono border border-emerald-500/25">
                  ✅ STAGE 1 PASSED: HIGHLY QUALIFIED
                </span>
                <h4 className="text-lg font-bold font-display mt-2 text-white">Select a Free Consultation Slot</h4>
                <p className="text-xs text-slate-400 mt-1">
                  The homeowner chooses their preferred slot, completely automated. This books directly onto your integrated calendar.
                </p>
              </div>

              <div className="bg-emerald-950/15 border border-emerald-900/30 p-3 rounded-xl flex items-start gap-2.5 text-xs text-emerald-400">
                <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Zero Manual Admin:</strong> Homeowner is prompted to lock in their consultation immediately, ensuring they don't buy from a competitor instead.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {mockSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBooking(slot)}
                    className="py-2.5 px-3 rounded-lg bg-slate-850 hover:bg-emerald-900/30 hover:border-emerald-800 border border-slate-750 text-left text-xs transition-all flex items-center gap-2 text-slate-200"
                  >
                    <span className="text-emerald-500">🗓️</span> {slot}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 7: Simulation Outcome Recaps */}
          {step === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5 my-auto text-center"
            >
              {quizState.budget === 'under-2.5k' || quizState.ownsProperty === false ? (
                /* Tyre-Kicker Shielded Screen */
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-red-500/15 text-red-500 rounded-full flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-display text-red-400">🛡️ Price-Shield Active: Lead Blocked!</h4>
                    <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                      <strong>Dave Smith</strong> was filtered out before booking or wasting your travel time.
                    </p>
                  </div>
                  
                  <div className="bg-red-950/20 border border-red-900/30 text-left p-4 rounded-xl text-xs space-y-2 text-red-200 max-w-lg mx-auto">
                    <p>🚨 <strong>Reason Filtered:</strong> Budget of under £2,500 / Does not own property.</p>
                    <p>⚡ <strong>What Dave Saw:</strong> A polite message advising that we are fully booked for minor repair work, but providing a guide on typical landscaping costs or referring them elsewhere.</p>
                    <p>💼 <strong>Benefit to you:</strong> Zero time wasted. You never receive a phone alert, no driving out to quote on fencing, no typing quotes. Your focus remains 100% on high-ticket projects.</p>
                  </div>
                </div>
              ) : (
                /* High-Ticket Client Booked Screen */
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-display text-emerald-400">🎉 Lead Successfully Booked!</h4>
                    <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                      <strong>Sarah Jenkins</strong> successfully passed the Price-Shield and locked in a site consultation.
                    </p>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-900/30 text-left p-4 rounded-xl text-xs space-y-2 text-emerald-300 max-w-lg mx-auto">
                    <p>✅ <strong>Lead Status:</strong> High-intent Owner looking for a <strong>{quizState.budget === '2.5k-5k' ? '£2.5k - £5k' : '£5k+'}</strong> project.</p>
                    <p>📅 <strong>Calendar Booking:</strong> {quizState.bookedSlot || "Mon 10:00 AM (Site Survey)"}</p>
                    <p>🔔 <strong>Automated Action:</strong> System pushes Sarah's details directly into your dashboard, adds the meeting to your phone calendar, and triggers SMS confirmation to Sarah.</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Run Another Test
                </button>
                <a
                  href="#dashboard-section"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                >
                  Check Live Sandbox Dashboard <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
