import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Wrench, GitBranch, Brain, BarChart2, ArrowRight, Zap, Activity, LayoutDashboard, Target } from 'lucide-react';
import TopNav from '../components/layout/TopNav';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

const categories = [
  {
    icon: Wrench,
    title: 'Tools & Stack',
    color: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/20',
    iconColor: 'text-indigo-400',
    description: 'How integrated and capable your current software stack is. Are your tools talking to each other, or creating more manual work?',
  },
  {
    icon: GitBranch,
    title: 'Workflows & Processes',
    color: 'from-teal-500/20 to-teal-500/5 border-teal-500/20',
    iconColor: 'text-teal-400',
    description: 'How structured, repeatable and efficient your team\'s working processes are. Speed and consistency depend on this.',
  },
  {
    icon: Brain,
    title: 'Team Skills & Confidence',
    color: 'from-violet-500/20 to-violet-500/5 border-violet-500/20',
    iconColor: 'text-violet-400',
    description: 'How comfortable your team is with AI tools today, and whether you have a culture of experimenting and sharing.',
  },
  {
    icon: BarChart2,
    title: 'Data & Reporting',
    color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20',
    iconColor: 'text-cyan-400',
    description: 'How well your team uses data to make decisions, track performance and continuously improve what you do.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-transparent">
      <TopNav />
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-4">About the audit</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
              Built for teams who know they need to move{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                faster on AI
              </span>{' '}
              but aren't sure where to start.
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              20 questions across four areas of organisational readiness. Honest answers get honest results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4 mb-14"
          >
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={cn(
                    "p-6 rounded-2xl bg-white/5 border backdrop-blur-md hover:scale-[1.02] transition-transform duration-300",
                    cat.color.split(' ').pop() || "border-white/10"
                  )}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                  </div>
                  <h3 className="font-bold mb-2 text-white">{cat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{cat.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-2xl mb-10"
          >
            <h2 className="text-xl font-bold mb-4 text-white italic">How the Organisation Dashboard works</h2>
            <div className="space-y-3 text-slate-400 text-sm leading-relaxed">
              <p>Each person who completes the audit enters a shared <strong className="text-white italic">Organisation Code</strong> — a short word or phrase your team agrees on. Think of it like a team room name.</p>
              <p>Once multiple people from different departments have completed the audit, the dashboard aggregates all results and shows a <strong className="text-white">heatmap</strong> comparing each department across all four categories.</p>
              <p>You'll instantly see where the biggest gaps are, which departments are furthest ahead, and what the single most impactful action for the whole organisation would be.</p>
              <p>Share the invite link with colleagues so they can complete their own department audit and add their scores to your dashboard.</p>
            </div>
          </motion.div>

          {/* What good looks like */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mb-14">
            <h2 className="text-xl font-bold mb-2 text-center text-white">What good looks like</h2>
            <p className="text-slate-500 text-center text-sm mb-8">Concrete examples of what an AI-Ready team actually does in practice.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Tools & Stack',
                  color: 'border-indigo-500/20',
                  textColor: 'text-indigo-400',
                  examples: [
                    'Tools are integrated and automated — a brief created in Notion automatically creates a task in Asana and notifies the team in Slack',
                    'The stack is reviewed quarterly and dead tools are cut',
                    'AI is embedded into existing tools rather than bolted on separately',
                  ],
                },
                {
                  title: 'Workflows & Processes',
                  color: 'border-teal-500/20',
                  textColor: 'text-teal-400',
                  examples: [
                    'Campaign briefs follow a standard template, approvals have clear owners, and post-campaign insights are stored and searchable',
                    'Work is regularly repurposed across formats without starting from scratch',
                    "Handoffs are documented — nothing lives only in someone's head",
                  ],
                },
                {
                  title: 'Team Skills & Confidence',
                  color: 'border-violet-500/20',
                  textColor: 'text-violet-400',
                  examples: [
                    "The team has shared prompt libraries, runs monthly AI experiments, and regularly shares what's working",
                    'New AI tools are tested and evaluated within a week of release',
                    'Everyone can articulate at least one way AI improves their own workflow',
                  ],
                },
                {
                  title: 'Data & Reporting',
                  color: 'border-cyan-500/20',
                  textColor: 'text-cyan-400',
                  examples: [
                    'Live dashboards track performance in real time, experiments are structured with clear hypotheses, and data directly informs the next campaign',
                    'Reports are built once and refreshed automatically — not rebuilt each month',
                    'Decisions reference data first, instinct second',
                  ],
                },
              ].map((cat, i) => (
                <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }} className={cn("p-6 rounded-2xl bg-white/5 border backdrop-blur-md hover:scale-[1.01] transition-transform duration-300", cat.color)}>
                  <h3 className={`font-bold mb-3 text-sm ${cat.textColor}`}>{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.examples.map((ex, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/10 flex-shrink-0" />
                        <span className="leading-relaxed">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-14 p-8 sm:p-12 bg-white/[0.03] border border-white/5 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden"
          >
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                Methodology
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white italic tracking-tight">Built on Industry <span className="text-indigo-400 text-[1.1em]">Benchmarks</span>.</h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl font-medium">
                Meridian algorithm is influenced by leading frameworks in digital transformation and AI fluency, designed to provide cross-sector clarity.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                 <a 
                   href="https://zapier.com/blog/raising-ai-fluency-bar-in-hiring/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all"
                 >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors text-sm">Zapier: AI Fluency Bar</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">The foundational methodology for departmental AI readiness and hiring standards.</p>
                    </div>
                 </a>

                 <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-sm">McKinsey AI Playbook</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Strategic pillars for capturing the high-impact value of generative AI in operations.</p>
                    </div>
                 </div>

                 <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                      <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-sm">Microsoft Work Trend Index</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Trends on how "power users" are reshaping the standard 40-hour work week.</p>
                    </div>
                 </div>

                 <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                      <Target className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-sm">Meridian Standards</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Our own evolving dataset of cross-sector AI performance and cultural friction points.</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Decorative background blur */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center">
            <Link to="/audit">
              <Button size="lg" className="h-14 px-10">
                Start the Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
