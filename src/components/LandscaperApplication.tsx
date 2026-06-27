import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle, Check, Landmark, Calendar, MapPin, Building, Phone, Mail, Link } from 'lucide-react';
import { LandscaperApplication } from '../types';

interface LandscaperApplicationProps {
  onApplicationSubmitted: (app: LandscaperApplication) => void;
}

export default function LandscaperApplicationForm({ onApplicationSubmitted }: LandscaperApplicationProps) {
  const [step, setStep] = useState<number>(1); // 1: Info, 2: Business details, 3: Budget & capacity, 4: Contact, 5: Finished
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    location: '',
    monthlyCapacity: 3,
    hasAdBudget: null as boolean | null,
    marketingMethod: '',
    email: '',
    phone: '',
    website: ''
  });

  const handleNext = () => {
    if (step === 2 && (!form.businessName || !form.contactName || !form.location)) return;
    if (step === 3 && form.hasAdBudget === null) return;
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.phone) return;

    const newApp: LandscaperApplication = {
      id: `app_${Math.random().toString(36).substr(2, 9)}`,
      businessName: form.businessName,
      contactName: form.contactName,
      email: form.email,
      phone: form.phone,
      website: form.website,
      location: form.location,
      monthlyCapacity: form.monthlyCapacity,
      hasAdBudget: form.hasAdBudget || false,
      status: 'PENDING',
      submittedAt: new Date().toLocaleDateString('en-GB')
    };

    onApplicationSubmitted(newApp);
    setStep(5);
  };

  return (
    <div id="application-section" className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden max-w-3xl mx-auto">
      {/* Glow */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-900 rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Steps Indicator */}
      {step < 5 && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-mono tracking-widest text-emerald-400 font-bold uppercase">INTAKE PHASE {step}/4</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num} 
                className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                  num === step ? 'bg-emerald-500 w-12' : num < step ? 'bg-emerald-800' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* Step 1: Invitation & Overview */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
                Apply for the 30-Day £0 Agency Fee Trial
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white">
                Let's Secure Your Area for the 30-Day Pilot
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Because I offer a full-scale customized implementation (building landing pages, integrations, and managing ads for 30 days) and guarantee a closed sale, I can only partner with <strong>one landscaper per region</strong>. Apply below to check slot availability in your territory.
              </p>
            </div>

            <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs text-slate-300">
              <h4 className="font-semibold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Partnership Checklist:
              </h4>
              <ul className="space-y-2 pl-1.5">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Able to accept £2,500 – £15,000+ landscaping or garden overhaul contracts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Ready to invest a £500 ad budget paid directly to Meta (no agency markups)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Can handle 12 to 16 newly booked homeowner design surveys over the next month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Registered business covering a specific regional territory in the UK
                </li>
              </ul>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-2 group"
              >
                Start Verification App <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Business details */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-lg font-bold font-display text-white">Business Information</h4>
              <p className="text-xs text-slate-400 mt-1">Please enter your trade details to confirm coverage area.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Business / Trade Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Landscaping Services"
                    value={form.businessName}
                    onChange={e => setForm({ ...form, businessName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-850 border border-slate-750 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Owner / Contact Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-base text-slate-500">👤</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Paul Harrison"
                      value={form.contactName}
                      onChange={e => setForm({ ...form, contactName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-850 border border-slate-750 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">UK Coverage Area / City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Leeds & West Yorkshire"
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-850 border border-slate-750 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!form.businessName || !form.contactName || !form.location}
                onClick={handleNext}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Marketing & Budget validation */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-lg font-bold font-display text-white">Capacity & Budget Compatibility</h4>
              <p className="text-xs text-slate-400 mt-1">We must verify your capacity and direct ad investment setup.</p>
            </div>

            <div className="space-y-5">
              {/* Slider for monthly capacity */}
              <div className="bg-slate-850 p-4 rounded-xl border border-slate-750">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-200">How many high-ticket garden surveys can you accept each month?</label>
                  <span className="text-xs font-bold font-mono text-emerald-400">{form.monthlyCapacity} Projects</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={form.monthlyCapacity}
                  onChange={e => setForm({ ...form, monthlyCapacity: Number(e.target.value) })}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 Survey/Month</span>
                  <span>5 Surveys</span>
                  <span>10+ Surveys</span>
                </div>
              </div>

              {/* Toggle budget */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Are you ready to invest £500 directly to Meta as your ad budget?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, hasAdBudget: true })}
                    className={`py-4 rounded-xl border text-sm font-semibold transition-all ${
                      form.hasAdBudget === true 
                        ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950' 
                        : 'bg-slate-850 border-slate-750 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    Yes, £500 direct to Meta
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, hasAdBudget: false })}
                    className={`py-4 rounded-xl border text-sm font-semibold transition-all ${
                      form.hasAdBudget === false 
                        ? 'bg-red-950/20 border-red-900/30 text-red-300' 
                        : 'bg-slate-850 border-slate-750 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    No, I do not have a budget
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  *I charge £0 in agency services for 30 days. The £500 is paid directly to Meta for ad placements, meaning you retain complete billing control.
                </p>
              </div>

              {/* Marketing method */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">How do you currently acquire landscaping leads?</label>
                <select
                  value={form.marketingMethod}
                  onChange={e => setForm({ ...form, marketingMethod: e.target.value })}
                  className="w-full bg-slate-850 border border-slate-750 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-slate-200"
                >
                  <option value="">Select current primary channel...</option>
                  <option value="word-of-mouth">Word of Mouth / Referrals</option>
                  <option value="subcontracting">Subcontracting for developers</option>
                  <option value="social-media">Organic Facebook / Instagram / Nextdoor</option>
                  <option value="local-flyers">Local directories / Magazines / Flyers</option>
                  <option value="lead-brokers">Lead Brokers (Bark, MyBuilder, RatedPeople)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                disabled={form.hasAdBudget === null}
                onClick={handleNext}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Contact & Submission */}
        {step === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-lg font-bold font-display text-white">Contact & Final Submission</h4>
              <p className="text-xs text-slate-400 mt-1">Provide your details to submit your application and check regional exclusive rights.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. paul@apexlandscaping.co.uk"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-850 border border-slate-750 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Direct Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 07700 900011"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-850 border border-slate-750 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Website, Social Page or Trade Portfolio (Optional)</label>
                <div className="relative">
                  <Link className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="url"
                    placeholder="e.g. https://facebook.com/apexlandscaping"
                    value={form.website}
                    onChange={e => setForm({ ...form, website: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-850 border border-slate-750 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-white"
                  />
                </div>
              </div>

              <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 text-xs text-slate-400 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Area Exclusivity:</strong> By submitting, you check exclusivity for <strong>{form.location || "your region"}</strong>. If approved, I will freeze competitors' applications for your designated radius immediately.
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!form.email || !form.phone || form.hasAdBudget === false}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-1.5"
                >
                  {form.hasAdBudget === false ? "Incompatible Budget" : "Submit Pilot Application"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 5: Success Outcome */}
        {step === 5 && (
          <motion.div
            key="step-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-6"
          >
            <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/25">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold font-display text-emerald-400">Application Received!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{form.contactName}</strong>. Your territory checks for <strong>{form.location}</strong> are now pending review.
              </p>
            </div>

            <div className="bg-slate-850 p-5 rounded-2xl border border-slate-750 text-left text-xs text-slate-300 max-w-lg mx-auto space-y-2 leading-relaxed">
              <span className="text-[10px] font-mono text-emerald-400 block font-bold">NEXT MANUAL STEPS:</span>
              <p>📍 <strong>Exclusivity Lock:</strong> I have placed a temporary 48-hour hold on new landscaping requests covering <strong>{form.location}</strong>.</p>
              <p>📞 <strong>Intake Phone Call:</strong> I will contact you directly via <strong>{form.phone}</strong> in the next 1-2 business days to verify your portfolio, synchronize your Google/Outlook calendar, and set up your Meta ads manager.</p>
              <p>💻 <strong>No-Risk Setup:</strong> Remember, you pay £0 in agency setup or management fees. If the campaign does not perform, you keep all of our visual and backend setups forever, absolutely free.</p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Reset Intake Form
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
