import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutDashboard, Activity } from 'lucide-react';
import TopNav from '../components/layout/TopNav';
import { Button } from '@/src/components/ui/button';

export default function Home() {
  const navigate = useNavigate();

  const [orgCode, setOrgCode] = useState('');

  const joinOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (orgCode) {
      localStorage.setItem('current_org_code', orgCode);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      <TopNav />
      
      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 max-w-5xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
           className="space-y-12"
        >
          <div className="space-y-4">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2 }}
               className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]"
             >
               Meridian
             </motion.div>
             <motion.h1 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="text-6xl md:text-[7.5rem] font-black tracking-[calc(-0.06em)] text-white leading-[0.85] italic"
             >
               Where do you <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-teal-400 to-cyan-400">actually</span> stand?
             </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 max-w-2xl mx-auto pt-4"
          >
            <p className="text-xl md:text-2xl font-bold text-white/90 leading-tight">
              An organisational AI readiness audit <br /> 
              & benchmarking platform.
            </p>
            <p className="text-slate-400 leading-relaxed text-lg">
              Used by high-performing teams to benchmark AI fluency, identify process leaks, and quantify the impact of automation.
            </p>
          </motion.div>

          <div className="flex flex-col items-center gap-12 pt-8">
            <motion.div 
              initial={{ opacity: 0, s: 0.9 }}
              animate={{ opacity: 1, s: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button size="lg" className="h-20 px-12 rounded-[2rem] group shadow-[0_0_50px_-10px_rgba(79,70,229,0.5)] font-black text-xl italic hover:scale-105 transition-transform" onClick={() => navigate('/audit')}>
                START AUDIT
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <motion.div 
                whileFocus={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 pl-6 rounded-[2rem] backdrop-blur-xl"
              >
                 <input 
                   type="text" 
                   value={orgCode}
                   onChange={e => setOrgCode(e.target.value.toLowerCase())}
                   placeholder="Enter Org Code..." 
                   className="bg-transparent border-none text-white font-bold placeholder:text-slate-600 focus:ring-0 w-32"
                 />
                 <Button variant="outline" className="rounded-2xl h-14 px-6 border-white/5 bg-white/10 hover:bg-white/20" onClick={joinOrg}>
                    Join Team
                 </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-10 text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]"
            >
              <div className="flex items-center gap-3">
                 <Activity className="w-4 h-4 text-indigo-500" />
                 Real-time Heatmaps
              </div>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="flex items-center gap-3">
                 <LayoutDashboard className="w-4 h-4 text-teal-400" />
                 Sector Benchmarking
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Decorative Blurs with subtle rotation */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" 
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" 
      />
    </div>
  );
}
