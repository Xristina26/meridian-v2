import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, Sparkles, User, Hash, Building2, Briefcase, MapPin, ArrowRight } from 'lucide-react';
import TopNav from '../components/layout/TopNav';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

const questions = [
  // Tools & Stack
  {
    category: 'Tools & Stack',
    text: 'How integrated are your current primary software tools (CRM, Task Management, Communication)?',
    options: ['Completely siloed', 'Slightly connected', 'Moderately integrated', 'Fully automated workflows'],
    tip: 'Integrated tools reduce manual "copy-pasting" and are the foundation for AI automation.'
  },
  {
    category: 'Tools & Stack',
    text: 'How often does your team review and audit your software stack for relevance and AI compatibility?',
    options: ['Never', 'Annually', 'Bi-annually', 'Quarterly or more'],
    tip: 'AI is moving fast. A quarterly review ensures you aren\'t paying for legacy tools that AI could replace or enhance.'
  },
  {
    category: 'Tools & Stack',
    text: 'To what extent is AI natively embedded in the tools you use daily?',
    options: ['Not at all', 'In 1-2 minor tools', 'In most primary tools', 'Fully embedded across entire stack'],
    tip: 'Native AI (like Copilots) is often more effective than external "bolt-on" AI tools.'
  },
  {
    category: 'Tools & Stack',
    text: 'Does your team have a centralized "App Directory" or approved list of AI tools?',
    options: ['No', 'Informal list only', 'Draft policy exists', 'Strictly governed "Golden Stack"'],
    tip: 'Governance prevents "Shadow AI" and ensures data security across the team.'
  },
  {
    category: 'Tools & Stack',
    text: 'How easy is it for your team to adopt and integrate a new AI tool into existing workflows?',
    options: ['Very difficult/Restricted', 'Difficult/Manual', 'Relatively simple', 'Seamless/Automated'],
    tip: 'Agility is a competitive advantage in the AI era. Frictionless adoption is the goal.'
  },
  
  // Workflows & Processes
  {
    category: 'Workflows & Processes',
    text: 'Are your standard operating procedures (SOPs) documented and easily searchable?',
    options: ['No documentation', "In people's heads", 'Partially documented', 'Fully documented & AI-searchable'],
    tip: 'If an AI can\'t read your SOPs, it can\'t help you execute them.'
  },
  {
    category: 'Workflows & Processes',
    text: 'How consistent are the campaign briefs and project definitions across different departments?',
    options: ['Completely inconsistent', 'Varies by manager', 'Mostly standardized', 'Strictly template-driven'],
    tip: 'Standardization is the "clean data" of human workflows. AI thrives on structured inputs.'
  },
  {
    category: 'Workflows & Processes',
    text: 'How often is work repurposed across different formats and channels?',
    options: ['Rarely/Always start from scratch', 'Occasionally manual', 'Frequently with templates', 'Systematically automated'],
    tip: 'Repurposing is where AI provides the highest immediate ROI (e.g., Blog → Social posts).'
  },
  {
    category: 'Workflows & Processes',
    text: 'Do you have clear "Owners" for AI-enhanced process optimization in the team?',
    options: ['No', 'Accidental enthusiasts only', 'Designated role in some teams', 'Fully integrated responsibility'],
    tip: 'Transformation needs a driver. Without ownership, AI adoption remains experimental.'
  },
  {
    category: 'Workflows & Processes',
    text: 'How would you describe the handoff process between different teams or departments?',
    options: ['Chaotic/Frequent missing info', 'Manual/Needs follow-ups', 'Structured/Mostly complete', 'Frictionless/Standardized'],
    tip: 'Poor handoffs are "process leaks". AI can automate the verification and routing of these steps.'
  },

  // Team Skills & Confidence
  {
    category: 'Team Skills & Confidence',
    text: 'How often does your team share AI prompts, experiments, or "wins" with each other?',
    options: ['Never', 'Rarely/Ad-hoc', 'Monthly sessions', 'Daily/Real-time culture'],
    tip: 'Social learning is the fastest way to raise "AI Fluency" across a team.'
  },
  {
    category: 'Team Skills & Confidence',
    text: 'What percentage of the team can articulate how AI directly improves their specific role?',
    options: ['< 10%', '10-40%', '40-70%', '> 70%'],
    tip: 'Personal utility is the key to overcoming AI anxiety and driving adoption.'
  },
  {
    category: 'Team Skills & Confidence',
    text: 'How much time does the team spend on focused AI experimentation and learning per week?',
    options: ['0 hours', '1-2 hours', '3-5 hours', '5+ hours'],
    tip: 'The Zapier study shows that high-performers block out specific "AI R&D" time every week.'
  },
  {
    category: 'Team Skills & Confidence',
    text: 'How comfortable would the team be if a major new AI tool was introduced tomorrow?',
    options: ['Resistant/Anxious', 'Hesitant', 'Optimistic but unsure', 'Excited/Ready to dive in'],
    tip: 'Confidence is a skill. Constant exposure to small AI tools builds muscle for big changes.'
  },
  {
    category: 'Team Skills & Confidence',
    text: 'Is there a "Safe to Fail" culture for AI experimentation in your organisation?',
    options: ['No/Mistakes are punished', 'Not explicitly', 'Mostly encouraged', 'Explicit part of team values'],
    tip: 'Psychological safety is the #1 predictor of successful digital transformation.'
  },

  // Data & Reporting
  {
    category: 'Data & Reporting',
    text: 'How accessible is real-time performance data to individual team members?',
    options: ['Request-only from specialists', 'Limited static reports', 'Self-serve dashboards', 'Real-time & AI-distributed'],
    tip: 'Data democracy allows teams to pivot faster based on what AI tools are actually delivering.'
  },
  {
    category: 'Data & Reporting',
    text: 'Are your experiments (A/B tests, pilots) tracked with clear hypotheses and documented learnings?',
    options: ['Rarely/Informal', 'Occasionally', 'Mostly', 'Systematically for every test'],
    tip: 'Documented experiments prevent "re-learning" the same lessons and build an AI knowledge base.'
  },
  {
    category: 'Data & Reporting',
    text: 'How much manual work is required to prepare monthly or quarterly reports?',
    options: ['Days of manual collation', 'Hours of export/formatting', 'Minimal manual cleanup', 'Fully automated/Real-time'],
    tip: 'Reporting should be a "reflection" phase, not a "data entry" phase. Automation is key.'
  },
  {
    category: 'Data & Reporting',
    text: 'To what extent are decisions driven by data versus "gut instinct"?',
    options: ['Pure instinct', 'Instinct supported by data', 'Data supported by instinct', 'Purely data-driven with AI insights'],
    tip: 'AI can process more variables than a human brain. Data-driven teams outperform intuition-only teams.'
  },
  {
    category: 'Data & Reporting',
    text: 'Does your data follow a consistent structure across all platforms (Single Source of Truth)?',
    options: ['No/Data conflict is common', 'Varies by department', 'Mostly aligned', 'Fully unified data architecture'],
    tip: 'Cleanup is 80% of the work in AI. A unified data architecture is the "fuel" for advanced AI.'
  },
];

const industries = ['Tech', 'Finance', 'Healthcare', 'Marketing & Creative', 'Public Sector', 'Education', 'Retail', 'Other'];
const departments = ['Marketing', 'Comms', 'Product', 'Engineering', 'Operations', 'HR', 'Finance', 'Other'];
const locations = ['UK', 'Europe', 'North America', 'Global', 'Other'];

export default function Audit() {
  const [stage, setStage] = useState<'onboarding' | 'questions'>('onboarding');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    orgCode: '',
    department: '',
    industry: '',
    location: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      setUserData(prev => ({ ...prev, orgCode: code }));
      // If code is provided, skip the code entry step (step 1)
      // We still ask for name (step 0)
    }
  }, []);

  const handleOnboardingNext = () => {
    if (onboardingStep === 0 && userData.orgCode) {
      // If we already have a code (from URL), skip step 1
      setOnboardingStep(2);
      return;
    }

    if (onboardingStep < 4) {
      setOnboardingStep(prev => prev + 1);
    } else {
      setStage('questions');
    }
  };

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    }
  };

  const handleComplete = () => {
    setIsSubmitting(true);
    const categoryScores: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};

    questions.forEach((q, i) => {
      categoryScores[q.category] = (categoryScores[q.category] || 0) + (answers[i] + 1);
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 4;
    });

    const results = Object.keys(categoryScores).map(cat => ({
      name: cat,
      score: Math.round((categoryScores[cat] / categoryCounts[cat]) * 100)
    }));

    // Store rich response
    const response = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...userData,
      results,
      totalScore: Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / results.length)
    };

    const existingResponses = JSON.parse(localStorage.getItem('meridian_responses') || '[]');
    localStorage.setItem('meridian_responses', JSON.stringify([...existingResponses, response]));
    localStorage.setItem('current_audit_id', response.id);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const progress = stage === 'onboarding' 
    ? (onboardingStep / 5) * 100 
    : 10 + (currentStep / questions.length) * 90;

  return (
    <div className="min-h-screen bg-transparent select-none">
      <TopNav />
      
      <div className="pt-32 pb-12 px-6 max-w-2xl mx-auto flex flex-col min-h-[80vh]">
        {/* Typeform-style Progress */}
        <div className="fixed top-24 left-0 w-full h-1 bg-white/5 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 via-teal-400 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {stage === 'onboarding' ? (
            <motion.div
              key={`onboarding-${onboardingStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              {onboardingStep === 0 && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <User className="w-8 h-8" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">What's your name?</h2>
                    <p className="text-slate-400">So we can personalise your results</p>
                  </div>
                  <input
                    autoFocus
                    type="text"
                    value={userData.name}
                    onChange={e => setUserData({...userData, name: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && userData.name && handleOnboardingNext()}
                    placeholder="Your name"
                    className="w-full max-w-md bg-transparent border-b-2 border-white/10 text-3xl font-bold py-4 text-center focus:outline-none focus:border-indigo-500 transition-colors text-white"
                  />
                  {userData.name && (
                    <Button onClick={handleOnboardingNext} className="rounded-xl h-14 px-8 mt-8">
                      Continue <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  )}
                </>
              )}

              {onboardingStep === 1 && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Hash className="w-8 h-8" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Enter your organisation code</h2>
                    <p className="text-slate-400">Choose a short code or use one shared by a colleague</p>
                  </div>
                  <input
                    autoFocus
                    type="text"
                    value={userData.orgCode}
                    onChange={e => setUserData({...userData, orgCode: e.target.value.toLowerCase().replace(/\s/g, '')})}
                    onKeyDown={e => e.key === 'Enter' && userData.orgCode && handleOnboardingNext()}
                    placeholder="e.g. apple-uk"
                    className="w-full max-w-md bg-transparent border-b-2 border-white/10 text-3xl font-bold py-4 text-center focus:outline-none focus:border-indigo-500 transition-colors text-white uppercase tracking-widest"
                  />
                  {userData.orgCode && (
                    <Button onClick={handleOnboardingNext} className="rounded-xl h-14 px-8 mt-8">
                      Continue <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  )}
                </>
              )}

              {onboardingStep === 2 && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Which department are you in?</h2>
                    <p className="text-slate-400">This helps us compare scores across teams</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                    {departments.map(dept => (
                      <button
                        key={dept}
                        onClick={() => {
                          setUserData({...userData, department: dept});
                          setTimeout(handleOnboardingNext, 300);
                        }}
                        className={cn(
                          "p-4 rounded-xl border font-bold transition-all text-sm",
                          userData.department === dept 
                            ? "bg-indigo-500 border-indigo-500 text-white" 
                            : "bg-white/5 border-white/10 hover:border-white/20 text-slate-300"
                        )}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {onboardingStep === 3 && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">What industry are you in?</h2>
                    <p className="text-slate-400">Helps us contextualise your scores</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                    {industries.map(ind => (
                      <button
                        key={ind}
                        onClick={() => {
                          setUserData({...userData, industry: ind});
                          setTimeout(handleOnboardingNext, 300);
                        }}
                        className={cn(
                          "p-4 rounded-xl border font-bold transition-all text-sm",
                          userData.industry === ind 
                            ? "bg-indigo-500 border-indigo-500 text-white" 
                            : "bg-white/5 border-white/10 hover:border-white/20 text-slate-300"
                        )}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {onboardingStep === 4 && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Where are you based?</h2>
                    <p className="text-slate-400">Optional — helps with regional benchmarking</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                    {locations.map(loc => (
                      <button
                        key={loc}
                        onClick={() => {
                          setUserData({...userData, location: loc});
                          setTimeout(handleOnboardingNext, 300);
                        }}
                        className={cn(
                          "p-4 rounded-xl border font-bold transition-all text-sm",
                          userData.location === loc 
                            ? "bg-indigo-500 border-indigo-500 text-white" 
                            : "bg-white/5 border-white/10 hover:border-white/20 text-slate-300"
                        )}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ) : isSubmitting ? (
            <motion.div
              key="submitting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-indigo-400 relative backdrop-blur-3xl shadow-2xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full"
                />
                <Sparkles className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white italic">Calculating your results...</h2>
                <p className="text-slate-400">Benchmarking <span className="text-indigo-400">{userData.name}</span> against {userData.industry} industry standards.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.8)]"
                   />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">{questions[currentStep].category}</span>
                   <span className="text-[10px] font-bold text-slate-700 uppercase">Step {currentStep + 1} of {questions.length}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight text-white italic max-w-xl">
                  {questions[currentStep].text}
                </h2>
              </div>

              <div className="grid gap-3">
                {questions[currentStep].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={() => handleSelect(idx)}
                    className={cn(
                      "group p-5 sm:p-6 rounded-2xl text-left border backdrop-blur-md transition-all flex items-center justify-between relative overflow-hidden",
                      answers[currentStep] === idx 
                        ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_-10px_rgba(79,70,229,0.3)]" 
                        : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-5 relative z-10">
                       <div className={cn(
                         "w-8 h-8 rounded-lg border flex items-center justify-center font-black text-[10px] transition-colors",
                         answers[currentStep] === idx 
                           ? "bg-indigo-500 border-indigo-500 text-white" 
                           : "bg-white/5 border-white/10 group-hover:border-white/30 text-slate-600"
                       )}>
                         {String.fromCharCode(65 + idx)}
                       </div>
                       <span className={cn(
                        "font-bold text-base sm:text-lg",
                        answers[currentStep] === idx ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                      )}>
                        {option}
                      </span>
                    </div>
                    {answers[currentStep] === idx && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white relative z-10"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </motion.div>
                    )}
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </motion.button>
                ))}
              </div>

              {questions[currentStep].tip && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex gap-4 items-start"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      <span className="text-indigo-400 font-black uppercase tracking-widest mr-2 not-italic">Strategic Tip:</span> 
                      {questions[currentStep].tip}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between pt-12 border-t border-white/5">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (currentStep > 0) setCurrentStep(prev => prev - 1);
                    else setStage('onboarding');
                  }}
                  className="rounded-xl h-12 text-slate-500 hover:text-white"
                >
                  <ChevronLeft className="mr-2 w-5 h-5" />
                  Back
                </Button>
                
                {currentStep === questions.length - 1 ? (
                  <Button
                    size="lg"
                    disabled={answers[currentStep] === -1}
                    onClick={handleComplete}
                    className="rounded-2xl h-14 px-10 font-black italic tracking-tight"
                  >
                    FINISH AUDIT
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={answers[currentStep] === -1}
                    className="rounded-xl h-12 text-indigo-400 border-indigo-400/20"
                  >
                    Next
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
