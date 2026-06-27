import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Sparkles, Check, Info } from 'lucide-react';

export default function RoiCalculator() {
  const [avgJobValue, setAvgJobValue] = useState<number>(5000);
  const [expectedLeads, setExpectedLeads] = useState<number>(14);
  const [closeRate, setCloseRate] = useState<number>(25); // 25% default

  // Calculations
  const adSpend = 500;
  const costPerLead = Number((adSpend / expectedLeads).toFixed(2));
  
  // Projected sales
  const projectedSalesRaw = expectedLeads * (closeRate / 100);
  const projectedSales = Math.max(1, Math.round(projectedSalesRaw));
  
  const projectedRevenue = projectedSales * avgJobValue;
  const netProfit = projectedRevenue - adSpend;
  const roiMultiplier = Number((projectedRevenue / adSpend).toFixed(1));

  // Determine helper text based on job value
  const getJobScaleLabel = (val: number) => {
    if (val < 4000) return "Small garden update (Patio / Fencing)";
    if (val < 8000) return "Medium garden makeover (Lawn, Decking, Stone)";
    if (val < 15000) return "Full landscaping transformation (Porcelain, Pergola, Turf)";
    return "Premium architectural landscaping & outdoor living spaces";
  };

  return (
    <div id="roi-calculator" className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 md:p-8 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Interactive Calculator
          </span>
          <h3 className="text-2xl font-bold font-display text-slate-950">Project Your Return on Investment</h3>
          <p className="text-sm text-slate-500 mt-1">Adjust the sliders below to see the potential outcome of your 30-day pilot program.</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 font-mono">FIXED AD BUDGET</div>
          <div className="text-2xl font-bold font-mono text-emerald-700">£500</div>
          <div className="text-xs text-slate-400">Paid directly to Meta</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Average Job Value */}
          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                Your Average Job Value
                <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" title="What is the average price of a landscaping job you accept?" />
              </label>
              <span className="text-lg font-bold font-mono text-emerald-800">
                £{avgJobValue.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="2500"
              max="25000"
              step="500"
              value={avgJobValue}
              onChange={(e) => setAvgJobValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>£2.5k (Min target)</span>
              <span>£10k</span>
              <span>£25k+</span>
            </div>
            <div className="mt-2.5 text-xs text-emerald-800 font-medium bg-emerald-50/50 py-1 px-2.5 rounded border border-emerald-100/40">
              ⚡ {getJobScaleLabel(avgJobValue)}
            </div>
          </div>

          {/* Expected Leads */}
          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                Leads Generated (30 Days)
                <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" title="At £30-£40 per qualified lead, £500 benchmark delivers 12-16 leads." />
              </label>
              <span className="text-lg font-bold font-mono text-emerald-800">
                {expectedLeads} Leads
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="24"
              step="1"
              value={expectedLeads}
              onChange={(e) => setExpectedLeads(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>8 (Lower end)</span>
              <span className="text-emerald-700 font-semibold">12 - 16 (Target Benchmark)</span>
              <span>24 (Maximum)</span>
            </div>
            <div className="mt-2.5 text-xs text-slate-500 flex justify-between font-mono">
              <span>Projected Cost Per Lead:</span>
              <span className="font-semibold text-slate-800">£{costPerLead}</span>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                Close Rate (From Qualified Leads)
                <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" title="Percentage of booked survey leads you turn into a paid job." />
              </label>
              <span className="text-lg font-bold font-mono text-emerald-800">
                {closeRate}%
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={closeRate}
              onChange={(e) => setCloseRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>5%</span>
              <span>20% (Typical)</span>
              <span>40% (Expert Closer)</span>
            </div>
            <div className="mt-2.5 text-xs text-slate-500 flex justify-between font-mono">
              <span>Expected Closed Jobs:</span>
              <span className="font-semibold text-emerald-800 font-sans">
                {projectedSalesRaw < 1 
                  ? '1 job (Minimum safety floor)' 
                  : `${projectedSales} ${projectedSales === 1 ? 'Job' : 'Jobs'} closed`}
              </span>
            </div>
          </div>

        </div>

        {/* Output Metrics Panel */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <Sparkles className="text-emerald-400/30 w-8 h-8" />
          </div>
          
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase">30-Day Pilot Forecast</span>
              <h4 className="text-slate-400 text-xs mt-1">If you close just {projectedSales} {projectedSales === 1 ? 'job' : 'jobs'}:</h4>
            </div>

            {/* Projected Revenue */}
            <div>
              <span className="text-slate-400 text-xs flex items-center gap-1 font-mono">
                PROJECTED REVENUE
              </span>
              <div className="text-3xl md:text-4xl font-extrabold font-mono text-emerald-400 mt-1 flex items-baseline">
                £{projectedRevenue.toLocaleString()}
              </div>
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">NET SURPLUS</span>
                <span className="text-base font-bold font-mono text-white mt-0.5 block">
                  £{netProfit.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">MULTIPLIER</span>
                <span className="text-base font-bold font-mono text-emerald-400 mt-0.5 block">
                  {roiMultiplier}x Return
                </span>
              </div>
            </div>
            
            <div className="bg-emerald-950/40 border border-emerald-900/50 p-3.5 rounded-xl text-xs text-emerald-300">
              <span className="font-semibold block mb-0.5">The £0 Agency Fee Advantage:</span>
              Your only risk is the £500 Meta ad budget. Zero agency service fees are charged for 30 days. One average job pays for your ad budget many times over.
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Includes complete Price-Shield setup</span>
          </div>
        </div>
      </div>
      
      {/* Visual Bar Comparison */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono mb-4">Investment vs. Potential Return</h4>
        
        <div className="space-y-3">
          {/* Ad Budget Row */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
              <span>Your Ad Spend (Direct to Meta)</span>
              <span>£500</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div className="bg-slate-400 h-full rounded-full transition-all duration-300" style={{ width: '4%' }}></div>
            </div>
          </div>

          {/* Revenue Return Row */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-900 mb-1">
              <span className="flex items-center gap-1 text-emerald-800">
                Projected Closed Revenue ({projectedSales} {projectedSales === 1 ? 'sale' : 'sales'})
                <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-mono">
                  +{((projectedRevenue - adSpend)/adSpend * 100).toFixed(0)}% Profit
                </span>
              </span>
              <span className="text-emerald-700 font-mono">£{projectedRevenue.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <motion.div 
                className="bg-emerald-600 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(10, (projectedRevenue / 25000) * 100))}%` }}
                transition={{ type: 'spring', damping: 15 }}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-[11px] text-slate-400 text-center">
          *Calculations based on UK Meta lead benchmark costs (£30-£40/lead). Individual results may vary.
        </div>
      </div>
    </div>
  );
}
