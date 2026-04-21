import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function TopNav() {
  return (
    <nav className="fixed top-4 left-4 right-4 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl z-50 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-lg flex items-center justify-center text-white">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-white">Meridian</span>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link to="/about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            About
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
