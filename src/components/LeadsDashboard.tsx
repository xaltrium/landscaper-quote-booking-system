import React, { useState, useMemo } from 'react';
import { CustomerLead } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ShieldCheck, ShieldAlert, PhoneCall, Download, Database, Users, Sparkles, Trash2, Check, Send } from 'lucide-react';

interface LeadsDashboardProps {
  leads: CustomerLead[];
  onClearLeads?: () => void;
  onRemoveLead?: (id: string) => void;
}

export default function LeadsDashboard({ leads, onClearLeads, onRemoveLead }: LeadsDashboardProps) {
  const [filter, setFilter] = useState<'ALL' | 'QUALIFIED' | 'SCREENED OUT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [simulatedActionMessage, setSimulatedActionMessage] = useState<string | null>(null);

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesFilter = filter === 'ALL' || lead.status === filter;
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.postcode.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [leads, filter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = leads.length;
    const qualified = leads.filter(l => l.status === 'QUALIFIED').length;
    const screenedOut = leads.filter(l => l.status === 'SCREENED OUT').length;
    
    // Estimate pipeline revenue (using the lower bounds of budgets for qualified leads)
    const pipelineRevenue = leads.reduce((sum, lead) => {
      if (lead.status !== 'QUALIFIED') return sum;
      let val = 5000; // default
      if (lead.budget === '2.5k-5k') val = 3750;
      else if (lead.budget === '5k-10k') val = 7500;
      else if (lead.budget === '10k-20k') val = 15000;
      else if (lead.budget === '20k-plus') val = 25000;
      return sum + val;
    }, 0);

    return { total, qualified, screenedOut, pipelineRevenue };
  }, [leads]);

  const handleSimulateAction = (name: string, type: 'SMS' | 'Call') => {
    const msg = type === 'SMS' 
      ? `💬 Automated Price-Shield SMS sent to ${name}: "Hi ${name.split(' ')[0]}, your on-site survey is confirmed! See you then!"`
      : `📞 Ringing ${name}... (In production, this routes via click-to-call direct to your mobile)`;
    setSimulatedActionMessage(msg);
    setTimeout(() => setSimulatedActionMessage(null), 5000);
  };

  // Export leads to a JSON file format as an engaging simulation
  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(leads, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'uk_landscaper_leads_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="dashboard-section" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm relative">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Database className="w-4 h-4 text-emerald-800" />
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-800 uppercase">Interactive Lead CRM Sandbox</span>
          </div>
          <h3 className="text-2xl font-bold font-display text-slate-900 tracking-tight">Your Custom Customer Database</h3>
          <p className="text-sm text-slate-500 mt-1">
            This dashboard simulates exactly where qualified leads are instantly pushed. Explore how Sarah and Dave differ.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export Database (.json)
          </button>
          
          {onClearLeads && leads.length > 0 && (
            <button 
              onClick={onClearLeads}
              className="px-4 py-2 hover:bg-red-50 text-red-600 border border-red-100 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all bg-white"
            >
              <Trash2 className="w-3.5 h-3.5" /> Reset Database
            </button>
          )}
        </div>
      </div>

      {/* CRM Scorecard Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Metric 1 */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Total Inquiries</span>
          <span className="text-2xl md:text-3xl font-extrabold font-mono text-slate-800 block mt-1">{stats.total}</span>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" /> Total Meta clicks that filled form
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-mono text-emerald-600 block uppercase font-bold">Qualified Quotes</span>
          <span className="text-2xl md:text-3xl font-extrabold font-mono text-emerald-700 block mt-1">{stats.qualified}</span>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Homeowners, budget £2.5k+
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-mono text-red-500 block uppercase font-bold">Blocked Tyre-Kickers</span>
          <span className="text-2xl md:text-3xl font-extrabold font-mono text-red-600 block mt-1">{stats.screenedOut}</span>
          <div className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> Budget &lt; £2.5k / tenants
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Sparkles className="w-4 h-4 text-yellow-500/40 animate-pulse" />
          </div>
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Active Pipeline Value</span>
          <span className="text-2xl md:text-3xl font-extrabold font-mono text-emerald-800 block mt-1">£{stats.pipelineRevenue.toLocaleString()}</span>
          <div className="text-[11px] text-slate-500 mt-1">
            Expected value of qualified leads
          </div>
        </div>
      </div>

      {/* Simulated notification banner */}
      <AnimatePresence>
        {simulatedActionMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-900 text-emerald-100 px-4 py-3 rounded-xl text-xs font-mono mb-6 border border-emerald-700 flex items-center gap-2"
          >
            <Check className="w-4 h-4 bg-emerald-700 text-emerald-100 rounded-full p-0.5 flex-shrink-0" />
            <span>{simulatedActionMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and search controls */}
      <div className="bg-white border border-slate-150 rounded-2xl p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-150 text-slate-600'
            }`}
          >
            All Contacts ({stats.total})
          </button>
          <button
            onClick={() => setFilter('QUALIFIED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              filter === 'QUALIFIED'
                ? 'bg-emerald-600 text-slate-950'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
            }`}
          >
            <ShieldCheck className="w-3 h-3" /> Qualified ({stats.qualified})
          </button>
          <button
            onClick={() => setFilter('SCREENED OUT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              filter === 'SCREENED OUT'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 hover:bg-red-100 text-red-800'
            }`}
          >
            <ShieldAlert className="w-3 h-3" /> Screened ({stats.screenedOut})
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, postcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-600 w-full md:w-64 text-slate-800"
          />
        </div>
      </div>

      {/* Leads List Grid */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400">
            <Database className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm">No leads match your search criteria.</p>
            <p className="text-xs text-slate-400 mt-1">Submit a lead in the simulator above to see it appear here immediately!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {filteredLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  layoutId={lead.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-white border rounded-2xl p-5 shadow-sm transition-all relative overflow-hidden flex flex-col md:flex-row justify-between gap-6 ${
                    lead.status === 'QUALIFIED' 
                      ? 'border-emerald-200/80 hover:shadow-emerald-50' 
                      : 'border-red-150 hover:shadow-red-50 bg-slate-50/40'
                  }`}
                >
                  {/* Status strip */}
                  <div className={`absolute top-0 left-0 w-1 h-full ${
                    lead.status === 'QUALIFIED' ? 'bg-emerald-600' : 'bg-red-500'
                  }`} />

                  {/* Left Column: Client Details */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900">{lead.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        ID: {lead.id}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Received {lead.submittedAt}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs text-slate-600">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">PHONE</span>
                        <span className="font-semibold">{lead.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">EMAIL</span>
                        <span className="font-semibold break-all">{lead.email}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">LOCATION</span>
                        <span className="font-semibold uppercase">{lead.postcode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Price Shield Criteria */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 min-w-[200px] flex flex-col justify-center space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-[10px] font-mono">BUDGET RANGE:</span>
                      <span className={`font-bold ${lead.status === 'QUALIFIED' ? 'text-emerald-700' : 'text-slate-600'}`}>
                        {lead.budget === 'under-2.5k' ? 'Under £2.5k' :
                         lead.budget === '2.5k-5k' ? '£2.5k – £5k' :
                         lead.budget === '5k-10k' ? '£5k – £10k' :
                         lead.budget === '10k-20k' ? '£10k – £20k' : '£20k+'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-[10px] font-mono">OWN PROPERTY:</span>
                      <span className="font-semibold">{lead.ownsProperty ? '✅ Homeowner' : '❌ Tenant'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-[10px] font-mono">TIMELINE:</span>
                      <span className="font-semibold capitalize">
                        {lead.timeline === 'immediate' ? 'ASAP' :
                         lead.timeline === '1-3-months' ? '1-3 Months' :
                         lead.timeline === '3-6-months' ? '3-6 Months' : 'Pricing only'}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Automated Action / Status */}
                  <div className="flex flex-col justify-center md:items-end min-w-[180px] border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                    {lead.status === 'QUALIFIED' ? (
                      <div className="space-y-2.5 w-full text-left md:text-right">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>QUALIFIED & BOOKED</span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          Consultation Locked In:
                          <span className="block font-semibold text-slate-800 font-sans mt-0.5">
                            📅 {lead.bookedSlot || "Mon 10:00 AM"}
                          </span>
                        </div>
                        <div className="flex items-center md:justify-end gap-1.5 pt-1">
                          <button
                            onClick={() => handleSimulateAction(lead.name, 'Call')}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all"
                            title="Call customer"
                          >
                            <PhoneCall className="w-3 h-3" /> Call
                          </button>
                          <button
                            onClick={() => handleSimulateAction(lead.name, 'SMS')}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-100 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all"
                            title="Send confirmation SMS"
                          >
                            <Send className="w-3 h-3" /> Send SMS
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 w-full text-left md:text-right">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-800 border border-red-150">
                          <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                          <span>SCREENED & BLOCKED</span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          Auto-redirection triggered:
                          <span className="block text-slate-500 font-sans mt-0.5 italic">
                            "Politely referred elsewhere"
                          </span>
                        </div>
                        {onRemoveLead && (
                          <div className="pt-1 text-right">
                            <button
                              onClick={() => onRemoveLead(lead.id)}
                              className="text-red-500 hover:text-red-700 text-[10px] font-semibold font-mono"
                            >
                              [ Delete Lead log ]
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
