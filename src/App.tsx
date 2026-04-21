import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Audit from './pages/Audit';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
