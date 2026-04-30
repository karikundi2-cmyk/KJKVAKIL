import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, FileText, Scale, BookOpen, Video, Users, Calendar, Building2, ClipboardList, ScrollText, PenLine } from 'lucide-react';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-heading text-2xl font-medium tracking-tight" data-testid="navbar-logo">
            VakilSetu
          </Link>

          <div className="flex items-center gap-5">
            <Link
              to="/services"
              className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm"
              data-testid="navbar-services"
            >
              Services
            </Link>
            
            {user && user.role === 'client' && (
              <>
                <Link
                  to="/client/dashboard"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                  data-testid="navbar-intelligence"
                >
                  <Scale className="w-4 h-4" /> Intelligence
                </Link>
                <Link
                  to="/client/cases"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                  data-testid="navbar-my-cases"
                >
                  <BookOpen className="w-4 h-4" /> My Cases
                </Link>
                <Link
                  to="/client/affidavit"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                  data-testid="navbar-affidavit"
                >
                  <FileText className="w-4 h-4" /> Affidavit
                </Link>
                <Link
                  to="/client/lawyers"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  <Users className="w-4 h-4" /> Find Lawyers
                </Link>
                <Link
                  to="/firms"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                  data-testid="navbar-firms"
                >
                  <Building2 className="w-4 h-4" /> Firms
                </Link>
                <Link
                  to="/client/case/new"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                  data-testid="navbar-new-case"
                >
                  <ClipboardList className="w-4 h-4" /> New case
                </Link>
                <Link
                  to="/client/bookings"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  <Calendar className="w-4 h-4" /> Bookings
                </Link>
                <Link
                  to="/client/consultations"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                  data-testid="navbar-consultations"
                >
                  <Video className="w-4 h-4" /> Video
                </Link>
                <Link
                  to="/ipc"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  <ScrollText className="w-4 h-4" /> IPC
                </Link>
              </>
            )}

            {user && user.role === 'legal_writer' && (
              <>
                <Link
                  to="/writer/dashboard"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  <PenLine className="w-4 h-4" /> Dashboard
                </Link>
                <Link
                  to="/ipc"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  <ScrollText className="w-4 h-4" /> IPC Laws
                </Link>
              </>
            )}

            {user && user.role === 'lawyer' && (
              <>
                <Link
                  to="/firms"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  <Building2 className="w-4 h-4" /> Firms
                </Link>
                <Link
                  to="/lawyer/dashboard"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm"
                  data-testid="navbar-cases"
                >
                  Dashboard
                </Link>
                <Link
                  to="/client/consultations"
                  className="text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm flex items-center gap-1"
                  data-testid="navbar-lawyer-consultations"
                >
                  <Video className="w-4 h-4" /> Consultations
                </Link>
              </>
            )}

            {user && <NotificationBell />}

            {!user ? (
              <Link to="/login" data-testid="navbar-login-button">
                <button className="btn-primary">
                  Login / Signup
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[#555555] text-sm" data-testid="navbar-user-info">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-[#555555] hover:text-[#111111] transition-colors duration-200 text-sm"
                  data-testid="navbar-logout-button"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
