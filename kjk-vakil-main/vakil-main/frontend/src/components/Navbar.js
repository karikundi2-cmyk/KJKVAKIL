import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  User, LogOut, FileText, Scale, BookOpen, Video, Users,
  Calendar, Building2, ClipboardList, ScrollText, PenLine,
  Menu, X, ChevronRight
} from 'lucide-react';
import NotificationBell from './NotificationBell';

const clientLinks = [
  { to: '/client/dashboard', icon: Scale, label: 'Intelligence' },
  { to: '/client/cases', icon: BookOpen, label: 'My Cases' },
  { to: '/client/case/new', icon: ClipboardList, label: 'New Case' },
  { to: '/client/affidavit', icon: FileText, label: 'Affidavit Builder' },
  { to: '/client/lawyers', icon: Users, label: 'Find Lawyers' },
  { to: '/firms', icon: Building2, label: 'Firms' },
  { to: '/client/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/client/consultations', icon: Video, label: 'Video Consultations' },
  { to: '/ipc', icon: ScrollText, label: 'IPC Browser' },
];

const lawyerLinks = [
  { to: '/lawyer/dashboard', icon: Scale, label: 'Dashboard' },
  { to: '/firms', icon: Building2, label: 'Firms' },
  { to: '/client/consultations', icon: Video, label: 'Consultations' },
];

const writerLinks = [
  { to: '/writer/dashboard', icon: PenLine, label: 'Dashboard' },
  { to: '/ipc', icon: ScrollText, label: 'IPC Laws' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/');
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const links =
    user?.role === 'client' ? clientLinks :
    user?.role === 'lawyer' ? lawyerLinks :
    user?.role === 'legal_writer' ? writerLinks : [];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-heading text-2xl font-medium tracking-tight" data-testid="navbar-logo">
            VakilSetu
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/services"
              className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm hidden sm:block"
              data-testid="navbar-services"
            >
              Services
            </Link>

            {user && <NotificationBell />}

            {!user ? (
              <Link to="/login" data-testid="navbar-login-button">
                <button className="btn-primary">Login / Signup</button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[#555555] text-sm" data-testid="navbar-user-info">
                  <User className="w-4 h-4" />
                  <span className="hidden md:block">{user.name}</span>
                </div>

                {/* Hamburger */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex flex-col items-center justify-center w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    data-testid="navbar-hamburger"
                    aria-label="Open menu"
                  >
                    {menuOpen ? (
                      <X className="w-5 h-5 text-slate-700" />
                    ) : (
                      <Menu className="w-5 h-5 text-slate-700" />
                    )}
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                      {/* User info header */}
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{user.role?.replace('_', ' ')}</p>
                      </div>

                      {/* Nav links */}
                      <div className="py-2">
                        {links.map(({ to, icon: Icon, label }) => {
                          const isActive = location.pathname === to;
                          return (
                            <Link
                              key={to}
                              to={to}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors group ${
                                isActive
                                  ? 'bg-slate-900 text-white'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-slate-200'
                              }`}>
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span className="flex-1">{label}</span>
                              {!isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400" />}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-slate-100 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                          data-testid="navbar-logout-button"
                        >
                          <span className="w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0">
                            <LogOut className="w-3.5 h-3.5" />
                          </span>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
