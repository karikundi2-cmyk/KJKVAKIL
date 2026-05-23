import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import ChatWidget from './components/ChatWidget';
import StatusWatcher from './components/StatusWatcher';
import DigestWatcher from './components/DigestWatcher';

import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientHome from './pages/ClientHome';
import MyCases from './pages/MyCases';
import AffidavitBuilder from './pages/AffidavitBuilder';
import Consultations from './pages/Consultations';
import PaymentSuccess from './pages/PaymentSuccess';
import VideoRoom from './pages/VideoRoom';
import LawyerDashboard from './pages/LawyerDashboard';
import FindLawyers from './pages/FindLawyers';
import LawyerBooking from './pages/LawyerBooking';
import MyBookings from './pages/MyBookings';
import Firms from './pages/Firms';
import MultiStepCaseForm from './pages/MultiStepCaseForm';
import IPCBrowser from './pages/IPCBrowser';
import PartyInPerson from './pages/PartyInPerson';
import ContentWriterDashboard from './pages/ContentWriterDashboard';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900" /></div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;
  return children;
};

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client/dashboard" element={<ProtectedRoute allowedRole="client"><ClientHome /></ProtectedRoute>} />
        <Route path="/client/cases" element={<ProtectedRoute allowedRole="client"><MyCases /></ProtectedRoute>} />
        <Route path="/client/affidavit" element={<ProtectedRoute allowedRole="client"><AffidavitBuilder /></ProtectedRoute>} />
        <Route path="/client/consultations" element={<ProtectedRoute><Consultations /></ProtectedRoute>} />
        <Route path="/client/payment-success" element={<ProtectedRoute allowedRole="client"><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/video/:roomId" element={<ProtectedRoute><VideoRoom /></ProtectedRoute>} />
        <Route path="/lawyer/dashboard" element={<ProtectedRoute allowedRole="lawyer"><LawyerDashboard /></ProtectedRoute>} />
        <Route path="/client/lawyers" element={<ProtectedRoute allowedRole="client"><FindLawyers /></ProtectedRoute>} />
        <Route path="/client/lawyers/:lawyerId" element={<ProtectedRoute allowedRole="client"><LawyerBooking /></ProtectedRoute>} />
        <Route path="/client/bookings" element={<ProtectedRoute allowedRole="client"><MyBookings /></ProtectedRoute>} />
        <Route path="/firms" element={<ProtectedRoute><Firms /></ProtectedRoute>} />
        <Route path="/client/case/new" element={<ProtectedRoute allowedRole="client"><MultiStepCaseForm /></ProtectedRoute>} />
        <Route path="/ipc" element={<IPCBrowser />} />
        <Route path="/client/pip" element={<ProtectedRoute allowedRole="client"><PartyInPerson /></ProtectedRoute>} />
        <Route path="/writer/dashboard" element={<ProtectedRoute allowedRole="legal_writer"><ContentWriterDashboard /></ProtectedRoute>} />
      </Routes>
      <ChatWidget />
      <StatusWatcher />
      <DigestWatcher />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: 'transparent', boxShadow: 'none', padding: 0 },
        }}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
