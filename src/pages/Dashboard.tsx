import { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from 'recharts';
import { 
  Download, Share2, AlertTriangle, CheckCircle2, TrendingUp,
  Wrench, GitBranch, Brain, BarChart2, Copy, Users, ChevronDown, ListFilter,
  Lightbulb, Target, Zap, Building2, ArrowRight, Activity
} from 'lucide-react';
import TopNav from '../components/layout/TopNav';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

interface Response {
  id: string;
  name: string;
  orgCode: string;
  department: string;
  industry: string;
  location: string;
  timestamp: string;
  results: { name: string; score: number }[];
  totalScore: number;
}

const icons = {
  'Tools & Stack': Wrench,
  'Workflows & Processes': GitBranch,
  'Team Skills & Confidence': Brain,
  'Data & Reporting': BarChart2,
};

const categories = ['Tools & Stack', 'Workflows & Processes', 'Team Skills & Confidence', 'Data & Reporting'];

export default function Dashboard() {
  const [allResponses, setAllResponses] = useState<Response[]>([]);
  const [selectedOrgCode, setSelectedOrgCode] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('meridian_responses');
    const currentId = localStorage.getItem('current_audit_id');
    
    if (saved) {
      const parsed = JSON.parse(saved);
      setAllResponses(parsed);
      
      // Auto-select org code from most recent current audit or first in list
      if (currentId) {
        const current = parsed.find((r: Response) => r.id === currentId);
        if (current) setSelectedOrgCode(current.orgCode);
      } else if (parsed.length > 0) {
        setSelectedOrgCode(parsed[parsed.length - 1].orgCode);
      }
    }
  }, []);

  const orgResponses = useMemo(() => {
    return allResponses.filter(r => r.orgCode === selectedOrgCode);
  }, [allResponses, selectedOrgCode]);

  const aggregateResults = useMemo(() => {
    if (orgResponses.length === 0) return categories.map(cat => ({ name: cat, score: 0 }));

    return categories.map(cat => {
      const scores = orgResponses.map(r => r.results.find(res => res.name === cat)?.score || 0);
      return {
        name: cat,
        score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      };
    });
  }, [orgResponses]);

  const deptHeatmap = useMemo(() => {
    const depts = Array.from(new Set(orgResponses.map(r => r.department)));
    return depts.map(dept => {
      const deptResponses = orgResponses.filter(r => r.department === dept);
      const scores = categories.map(cat => {
        const catScores = deptResponses.map(r => r.results.find(res => res.name === cat)?.score || 0);
        return Math.round(catScores.reduce((a, b) => a + b, 0) / catScores.length);
      });
      return {
        name: dept,
        scores,
        total: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      };
    });
  }, [orgResponses]);

  const insights = useMemo(() => {
    if (orgResponses.length === 0) return null;

    // Biggest Gap
    const sortedCategories = [...aggregateResults].sort((a, b) => a.score - b.score);
    const biggestGap = sortedCategories[0];

    // Top Performer (Dept)
    const sortedDepts = [...deptHeatmap].sort((a, b) => b.total - a.total);
    const topPerformer = sortedDepts[0];

    return {
      biggestGap: {
        title: biggestGap.name,
        desc: `Your lowest scoring category at ${biggestGap.score}%. Focus your next AI training here.`
      },
      topPerformer: {
        title: topPerformer.name,
        desc: `Leading the way with ${topPerformer.total}% readiness. Share their workflows across the org.`
      },
      topAction: {
        title: 'Centralise Toolstack',
        desc: 'Invest in integrating your tool stack — disconnected tools are creating manual work.'
      }
    };
  }, [aggregateResults, deptHeatmap, orgResponses]);

  const totalOrgScore = Math.round(aggregateResults.reduce((acc, r) => acc + r.score, 0) / (aggregateResults.length || 1));

  const getStatus = (score: number) => {
    if (score > 80) return { label: 'Strategic', color: 'text-teal-400', bg: 'bg-teal-500/10' };
    if (score > 50) return { label: 'Practical', color: 'text-indigo-400', bg: 'bg-indigo-500/10' };
    return { label: 'Foundational', color: 'text-amber-400', bg: 'bg-amber-500/10' };
  };

  const currentStatus = getStatus(totalOrgScore);

  const downloadSummary = () => {
    if (!orgResponses.length) return;
    
    let content = `MERIDIAN AI READINESS AUDIT - ORGANISATION SUMMARY\n`;
    content += `Organisation Code: ${selectedOrgCode}\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `Responses: ${orgResponses.length}\n`;
    content += `================================================\n\n`;
    content += `OVERALL SCORE: ${totalOrgScore}%\n\n`;
    content += `DEPARTMENTAL BREAKDOWN:\n`;
    deptHeatmap.forEach(dept => {
      content += `- ${dept.name}: ${dept.total}%\n`;
    });
    
    content += `\nSTRATEGIC INSIGHTS:\n`;
    content += `- Biggest Gap: ${insights?.biggestGap.title} (${insights?.biggestGap.desc})\n`;
    content += `- Top Action: ${insights?.topAction.title} (${insights?.topAction.desc})\n`;
    
    content += `\nRECOMMENDED ROADMAP:\n`;
    content += `- Establish an internal AI "Win" channel in Slack/Teams.\n`;
    content += `- Audit toolstack to remove surplus SaaS subscriptions.\n`;
    content += `- Formalise an AI Governance Board.\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meridian-audit-${selectedOrgCode.toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <TopNav />
      
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-12">
        {/* Header and Org Detail */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-white/5">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                 Organisation Dashboard
               </div>
               <span className="text-slate-700 text-xs font-bold">Code: <span className="text-white italic tracking-widest">{selectedOrgCode}</span></span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight italic">
              AI Readiness <span className="text-indigo-400 italic">Report</span>
            </h1>
            <div className="flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
               <div className="flex items-center gap-2">
                 <Users className="w-4 h-4" />
                 <span>{orgResponses.length} Responses</span>
               </div>
               <div className="w-1 h-1 rounded-full bg-white/10" />
               <div className="flex items-center gap-2">
                 <Building2 className="w-4 h-4" />
                 <span>{deptHeatmap.length} Departments</span>
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl h-14 px-6 bg-white/5 border-white/10" onClick={() => {
              const url = window.location.origin + '/audit?code=' + selectedOrgCode;
              navigator.clipboard.writeText(url);
              alert('Invite link copied to clipboard!');
            }}>
              <Copy className="mr-2 w-4 h-4" />
              Copy Invite Link
            </Button>
            <Button className="rounded-2xl h-14 px-8 shadow-[0_0_30px_-10px_rgba(79,70,229,0.4)]" onClick={downloadSummary}>
              <Download className="mr-2 w-4 h-4" />
              Download Report
            </Button>
          </div>
        </header>

        {/* Top Summary Card */}
        <div className="grid lg:grid-cols-12 gap-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="lg:col-span-12 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 overflow-hidden relative"
           >
             <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                <div className="relative w-64 h-64 shrink-0">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle
                       cx="128"
                       cy="128"
                       r="110"
                       stroke="currentColor"
                       strokeWidth="20"
                       fill="transparent"
                       className="text-white/5"
                     />
                     <motion.circle
                       cx="128"
                       cy="128"
                       r="110"
                       stroke="currentColor"
                       strokeWidth="20"
                       strokeDasharray={691}
                       initial={{ strokeDashoffset: 691 }}
                       animate={{ strokeDashoffset: 691 - (691 * totalOrgScore) / 100 }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       fill="transparent"
                       className="text-indigo-500"
                       strokeLinecap="round"
                     />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-7xl font-black text-white leading-none">{totalOrgScore}</span>
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">/100</span>
                   </div>
                </div>

                <div className="flex-1 space-y-6 text-center lg:text-left">
                   <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-xs uppercase tracking-[0.2em]", currentStatus.bg, currentStatus.color)}>
                      <Zap className="w-4 h-4" />
                      {currentStatus.label} Level AI Readiness
                   </div>
                   <h2 className="text-4xl font-black text-white tracking-tight">Your organisation is <span className="text-indigo-400">{currentStatus.label.toLowerCase()}</span>.</h2>
                   <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                     Based on results from your team, you have established foundational AI awareness. 
                     Moving to the next tier requires <strong className="text-white">Workflow Standardisation</strong> and increased 
                     <strong className="text-white"> Data Interoperability</strong>.
                   </p>
                </div>
             </div>
             
             {/* Background glow decoration */}
             <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
           </motion.div>
        </div>

        {/* Key Insights Grid */}
        <section className="space-y-6">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Strategic Insights</h3>
           <div className="grid md:grid-cols-3 gap-6">
              {insights && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-4 group transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                       <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Growth Gap</h4>
                       <p className="text-xl font-bold text-white tracking-tight">{insights.biggestGap.title}</p>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{insights.biggestGap.desc}</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-4 group transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                       <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Internal Leader</h4>
                       <p className="text-xl font-bold text-white tracking-tight">{insights.topPerformer.title}</p>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{insights.topPerformer.desc}</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-4 group transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                       <Zap className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Priority Pivot</h4>
                       <p className="text-xl font-bold text-white tracking-tight">{insights.topAction.title}</p>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{insights.topAction.desc}</p>
                  </motion.div>
                </>
              )}
           </div>
        </section>

        {/* Actionable Recommendations (The Value Add) */}
        <section className="space-y-6">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Recommended Roadmap</h3>
           <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-600/5 border border-indigo-500/20 rounded-[2.5rem] p-10 space-y-8">
                 <div className="space-y-2">
                    <h4 className="text-2xl font-black text-white italic">Immediate Quick Wins</h4>
                    <p className="text-slate-400 text-sm">Low effort actions to boost current readiness scores.</p>
                 </div>
                 <div className="space-y-4">
                    {[
                      { icon: Zap, text: 'Establish an internal AI "Win" channel in Slack/Teams.' },
                      { icon: Target, text: 'Audit toolstack to remove at least 2 legacy SaaS subscriptions.' },
                      { icon: Brain, text: 'Run a 30-minute "Basic Prompting" deep-dive for all managers.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                         <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <item.icon className="w-4 h-4" />
                         </div>
                         <span className="text-sm text-slate-200 font-medium">{item.text}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-gradient-to-br from-teal-600/20 to-teal-600/5 border border-teal-500/20 rounded-[2.5rem] p-10 space-y-8">
                 <div className="space-y-2">
                    <h4 className="text-2xl font-black text-white italic">Strategic Long-Term</h4>
                    <p className="text-slate-400 text-sm">Structural changes required for "Strategic" level maturity.</p>
                 </div>
                 <div className="space-y-4">
                    {[
                      { icon: Activity, text: 'Implement a Unified Data Architecture across all departments.' },
                      { icon: Building2, text: 'Shift from "Project-based" to "Process-based" AI automation.' },
                      { icon: ListFilter, text: 'Formalise an "AI Governance Board" for tool evaluation.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                         <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                            <item.icon className="w-4 h-4" />
                         </div>
                         <span className="text-sm text-slate-200 font-medium">{item.text}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Heatmap Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3.5rem] overflow-hidden shadow-2xl"
        >
          <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="space-y-1">
               <h2 className="text-2xl font-black text-white italic">The Organisation Heatmap</h2>
               <p className="text-sm text-slate-500">Comparative AI readiness across the organisation tracks.</p>
             </div>
             <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold uppercase text-slate-500">
                   <div className="w-2 h-2 rounded-full bg-amber-500" />
                   Foundational
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold uppercase text-slate-500">
                   <div className="w-2 h-2 rounded-full bg-indigo-500" />
                   Practical
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold uppercase text-slate-500">
                   <div className="w-2 h-2 rounded-full bg-teal-500" />
                   Strategic
                </div>
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-8 text-left text-[10px] font-black uppercase tracking-widest border-r border-white/5 text-slate-500 min-w-[200px]">Department</th>
                  {categories.map(cat => (
                    <th key={cat} className="p-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">{cat}</th>
                  ))}
                  <th className="p-8 text-center text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/5">Total</th>
                </tr>
              </thead>
              <tbody>
                {deptHeatmap.map((dept, idx) => (
                  <tr key={dept.name} className="border-t border-white/5">
                    <td className="p-8 font-black border-r border-white/5 text-lg text-white italic">{dept.name}</td>
                    {dept.scores.map((s, i) => (
                      <td key={i} className="p-8 text-center">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 * i + 0.1 * idx }}
                          className={cn(
                            "w-14 h-14 rounded-3xl mx-auto flex items-center justify-center font-black text-base transition-transform hover:scale-110 cursor-help",
                            s > 80 ? 'bg-teal-500 text-slate-950 shadow-[0_0_20px_-5px_rgba(20,184,166,0.5)]' : 
                            s > 50 ? 'bg-indigo-500 text-white shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]' : 
                            'bg-amber-500 text-slate-950 shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)]'
                          )}
                          title={`${dept.name} ${categories[i]}: ${s}%`}
                        >
                          {s}
                        </motion.div>
                      </td>
                    ))}
                    <td className="p-8 text-center bg-indigo-400/5">
                        <span className="text-xl font-black text-white italic">{dept.total}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Library of Sources */}
        <section className="space-y-6">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Resource Library</h3>
           <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://zapier.com/blog/raising-ai-fluency-bar-in-hiring/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Raising the AI Fluency Bar</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Zapier Engineering Framework</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </a>
              
              <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Organisational AI Maturity Model</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Meridian Proprietary Standards</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-slate-700" />
              </div>
           </div>
        </section>

        {/* All Responses List */}
        <section className="space-y-6">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">All Team Responses</h3>
           <div className="grid gap-4">
              {orgResponses.map(resp => (
                <motion.div 
                  key={resp.id}
                  layout
                  className="group bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl font-black text-white italic">
                        {resp.name.charAt(0)}
                     </div>
                     <div className="space-y-1">
                        <h5 className="text-xl font-bold text-white tracking-tight">{resp.name}</h5>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                           <span>{resp.department}</span>
                           <span className="w-1 h-1 rounded-full bg-white/10" />
                           <span>{resp.location}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-12">
                     <div className="hidden lg:flex items-center gap-4">
                        {resp.results.map(res => (
                           <div key={res.name} className="space-y-1" title={res.name}>
                              <div className="w-1 h-12 bg-white/10 rounded-full overflow-hidden">
                                 <div className="w-full bg-indigo-500" style={{ height: `${res.score}%`, marginTop: `${100 - res.score}%` }} />
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="flex items-center gap-4">
                        <div className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider", getStatus(resp.totalScore).bg, getStatus(resp.totalScore).color)}>
                           {getStatus(resp.totalScore).label}
                        </div>
                        <div className="text-3xl font-black text-white italic w-20 text-right">
                           {resp.totalScore}%
                        </div>
                        <ChevronDown className="w-5 h-5 text-slate-600 transition-transform group-hover:translate-y-0.5" />
                     </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>

        <div className="flex items-center justify-center gap-4 pt-12">
           <Button variant="ghost" onClick={() => navigate('/audit')} className="text-slate-500 hover:text-white transition-colors h-14 px-8 rounded-2xl">
             Retake the Audit
           </Button>
           <Button variant="outline" onClick={() => navigate('/')} className="h-14 px-8 rounded-2xl border-white/10 text-white">
              Back to Home
           </Button>
        </div>
      </main>
    </div>
  );
}
