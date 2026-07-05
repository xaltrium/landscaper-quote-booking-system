import React from 'react';
import { ShieldCheck, Calendar, Users, Cpu, FileCheck, ArrowRight, Ban } from 'lucide-react';

export default function OfferDetails() {
  return (
    <div className="space-y-16">
      
      {/* 4-Column Core Value Pillars */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-3xl font-bold font-display text-slate-900 tracking-tight">
            How the 'Price-Shield' System Works For You
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            No admin. No cold calling tyre-kickers. Just highly qualified residential landscaping quotes scheduled directly on your phone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-extrabold text-sm">
              1
            </div>
            <h4 className="font-bold text-slate-900 font-display text-base">Meta Ad Ingress</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We deploy hyper-targeted local Facebook & Instagram ads featuring your stunning past projects to capture the attention of high-budget homeowners.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-extrabold text-sm">
              2
            </div>
            <h4 className="font-bold text-slate-900 font-display text-base">Budget-Screen Filter</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Before they can book, prospects are greeted by the 'Price-Shield'. We ask their budget, property ownership, and start date, filtering out repairs &lt;£2,500.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-extrabold text-sm">
              3
            </div>
            <h4 className="font-bold text-slate-900 font-display text-base">Instant Calendar Booking</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Qualified homeowners are automatically prompted to book a physical site survey on your linked Google/Outlook calendar. No email-tag back and forth.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-extrabold text-sm">
              4
            </div>
            <h4 className="font-bold text-slate-900 font-display text-base">Zero Admin Hand-off</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              The customer receives SMS reminders. You simply wake up, look at your calendar, and drive to pre-qualified high-ticket garden surveys.
            </p>
          </div>
        </div>
      </div>

      {/* The Ironclad Guarantee Panel */}
      <div className="bg-slate-900 text-white p-8 md:p-10 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
          <ShieldCheck className="w-96 h-96 text-emerald-500" />
        </div>

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-block px-3 py-1 bg-emerald-950/80 border border-emerald-800/80 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest">
            🛡️ Ironclad Price-Shield Guarantee
          </div>
          
          <h3 className="text-2xl md:text-4xl font-extrabold leading-tight text-white">
            The <span className="text-emerald-400 font-black italic underline underline-offset-4 tracking-tighter">"Keep It All"</span> Guarantee.
          </h3>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            If you don’t close at least one high-ticket job and see a massive return on that £500, we part ways and you <span className="font-bold text-white">keep every asset I built for you</span>—landing pages, customer database, and ad creatives—for free.
          </p>

          <div className="border-t border-slate-800 pt-6 mt-6">
            <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-widest mb-4">
              If We Part Ways After 30 Days, You Keep 100% For Free:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="text-emerald-400 mt-0.5">✔</span>
                <div>
                  <strong className="text-white block font-sans">Custom Landing Pages</strong>
                  High-converting layouts built explicitly for your UK coverage zone.
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="text-emerald-400 mt-0.5">✔</span>
                <div>
                  <strong className="text-white block font-sans">Active Leads Database</strong>
                  All homeowner data, contact profiles, and postcodes captured in your CRM.
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="text-emerald-400 mt-0.5">✔</span>
                <div>
                  <strong className="text-white block font-sans">Winning Ad Creatives</strong>
                  Ad graphics, high-performing text hooks, and target audience configurations.
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="text-emerald-400 mt-0.5">✔</span>
                <div>
                  <strong className="text-white block font-sans">Quote Booking Automations</strong>
                  The calendar synchronization pipeline, automated SMS, and email triggers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmarks comparison */}
      <div className="border border-slate-150 rounded-2xl p-6 md:p-8 bg-slate-50/50">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-6 text-center">
          UK Landscaping Lead Benchmarks vs. Our Target Pilot Metrics
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-1 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <span className="text-slate-400 text-[10px] font-mono uppercase">Average Cost Per Lead</span>
            <div className="text-2xl font-bold font-mono text-slate-800">20-40</div>
            <p className="text-[11px] text-slate-500">Standard Meta paid benchmark across UK landscaping markets.</p>
          </div>

          <div className="space-y-1 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <span className="text-slate-400 text-[10px] font-mono uppercase">Projected Leads volume</span>
            <div className="text-2xl font-bold font-mono text-emerald-800">10 – 25 Leads</div>
            <p className="text-[11px] text-slate-500">From your direct £500 Meta budget. Fully screened via 'Price-Shield'.</p>
          </div>

          <div className="space-y-1 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <span className="text-slate-400 text-[10px] font-mono uppercase">Target Sales conversion</span>
            <div className="text-2xl font-bold font-mono text-emerald-800">3 – 4 Closed Jobs</div>
            <p className="text-[11px] text-slate-500">Homeowners ready for £2.5k+ garden overhauls or patio designs.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
