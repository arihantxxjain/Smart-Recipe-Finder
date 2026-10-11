import { ChefHat, Github, Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-850 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white">
              <ChefHat className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              SmartRecipe <span className="text-emerald-400">Finder</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            An open-source intelligent culinary engine that matches what is inside your pantry to
            delicious global recipes. Reducing food waste one delicious meal at a time.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Designed & Developed by</span>
            <a
              href="https://github.com/arihantxxjain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-semibold hover:underline"
            >
              Arihant Jain
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/" className="hover:text-emerald-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/recipes" className="hover:text-emerald-400 transition">
                Pantry Recipe Search
              </Link>
            </li>
            <li>
              <Link to="/ai-chef" className="hover:text-emerald-400 transition">
                AI Recipe Studio
              </Link>
            </li>
            <li>
              <a href="/#about" className="hover:text-emerald-400 transition">
                About Mission
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-emerald-400 transition">
                Contact & Feedback
              </a>
            </li>
          </ul>
        </div>

        {/* Community & GitHub */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Repository & Author</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="https://github.com/arihantxxjain/Smart-Recipe-Finder"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-emerald-400" />
                <span>GitHub Repository</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/arihantxxjain"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-emerald-400" />
                <span>Arihant&apos;s Profile</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:jainarihant.154@gmail.com"
                className="hover:text-white transition flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>jainarihant.154@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} SmartRecipe Finder by Arihant Jain. Released under the MIT License.</p>
        <p className="flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> using React, Vite & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
