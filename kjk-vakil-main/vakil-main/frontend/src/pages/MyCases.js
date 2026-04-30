import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Loader2, FileText, MapPin, Calendar, Clock, Shield, ChevronDown, ChevronUp, CheckCircle, Circle, AlertCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_URL from '../lib/api';
import CaseChat from '../components/CaseChat';
import { useAuth } from '../contexts/AuthContext';

const STATUS_PIPELINE = [
  { key: 'submitted', label: 'Submitted', desc: 'Case submitted to the platform' },
  { key: 'analyzed', label: 'Analyzed', desc: 'AI intelligence analysis complete' },
  { key: 'open', label: 'Open', desc: 'Case is open for lawyer assignment' },
  { key: 'accepted', label: 'Accepted', desc: 'Lawyer has accepted the case' },
  { key: 'in-progress', label: 'In Progress', desc: 'Actively being worked on' },
  { key: 'resolved', label: 'Resolved', desc: 'Case successfully resolved' },
];

const statusColors = {
  submitted: 'bg-blue-50 text-blue-700 border-blue-200',
  analyzed: 'bg-amber-50 text-amber-700 border-amber-200',
  open: 'bg-green-50 text-green-700 border-green-200',
  accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'in-progress': 'bg-purple-50 text-purple-700 border-purple-200',
  resolved: 'bg-slate-100 text-slate-700 border-slate-300',
};

const CaseTimeline = ({ currentStatus, statusHistory }) => {
  const currentIndex = STATUS_PIPELINE.findIndex(s => s.key === currentStatus);

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Case Progress</p>
      <div className="relative">
        {STATUS_PIPELINE.map((stage, i) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isPending = i > currentIndex;
          const historyEntry = statusHistory?.find(sh => sh.status === stage.key);

          return (
            <div key={stage.key} className="flex gap-3 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  isDone ? 'bg-green-500' : isCurrent ? 'bg-amber-500 ring-4 ring-amber-100' : 'bg-slate-200'
                }`}>
                  {isDone ? (
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                {i < STATUS_PIPELINE.length - 1 && (
                  <div className={`w-0.5 flex-1 mt-1 ${isDone ? 'bg-green-300' : 'bg-slate-200'}`} style={{ minHeight: '20px' }} />
                )}
              </div>
              <div className="flex-1 pt-0.5 pb-2">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${isDone ? 'text-green-700' : isCurrent ? 'text-amber-700' : 'text-slate-400'}`}>
                    {stage.label}
                  </p>
                  {isCurrent && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">Current</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{stage.desc}</p>
                {historyEntry?.notes && (
                  <p className="text-xs text-slate-500 mt-1 italic">"{historyEntry.notes}"</p>
                )}
                {historyEntry?.timestamp && (
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    {new Date(historyEntry.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MyCases = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCase, setExpandedCase] = useState(null);
  const [openChatCase, setOpenChatCase] = useState(null);
  const [unreadByCase, setUnreadByCase] = useState({});

  const fetchMyCases = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/my-cases`);
      setCases(data);
    } catch (err) {
      console.error('Failed to fetch cases', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMyCases(); }, [fetchMyCases]);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/messages/unread-summary`);
        setUnreadByCase(data?.per_case || {});
      } catch {}
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50" data-testid="my-cases-page">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900" data-testid="my-cases-title">My Cases</h1>
            <p className="text-sm text-slate-500 mt-1">Track all your submitted legal cases</p>
          </div>
          <span className="text-sm bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-medium shadow-sm">
            {cases.length} case{cases.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24" data-testid="loading">
            <Loader2 className="w-10 h-10 text-slate-300 animate-spin" />
          </div>
        ) : cases.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center" data-testid="no-cases">
            <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No cases yet</h3>
            <p className="text-sm text-slate-500">Submit your first case through the Intelligence Engine</p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="cases-list">
            {cases.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                data-testid={`case-item-${i}`}
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900">{c.case_type} Law</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[c.case_status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          {c.case_status}
                        </span>
                        {(c.nyayId || c.nyay_id) && (
                          <span className="text-xs bg-slate-900 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Shield className="w-3 h-3" /> {c.nyayId || c.nyay_id}
                          </span>
                        )}
                        {unreadByCase[c.id] > 0 && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold" data-testid={`unread-badge-${c.id}`}>
                            <MessageCircle className="w-3 h-3" /> {unreadByCase[c.id]} new
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{c.description}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400">
                        {c.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>}
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        {c.urgency && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.urgency}</span>}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {expandedCase === c.id
                        ? <ChevronUp className="w-5 h-5 text-slate-400" />
                        : <ChevronDown className="w-5 h-5 text-slate-400" />
                      }
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCase === c.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-5 py-5 bg-slate-50/80">
                        {c.lawyer_name && (
                          <div className="flex items-center justify-between gap-2 text-sm mb-4 bg-white border border-slate-200 rounded-xl px-4 py-3">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                              <span className="text-slate-600">Assigned Lawyer:</span>
                              <span className="font-semibold text-slate-900">{c.lawyer_name}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenChatCase(openChatCase === c.id ? null : c.id);
                                if (openChatCase !== c.id) {
                                  setUnreadByCase((prev) => ({ ...prev, [c.id]: 0 }));
                                }
                              }}
                              className={`relative flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                                openChatCase === c.id
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200'
                              }`}
                              data-testid={`chat-toggle-${c.id}`}
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              {openChatCase === c.id ? 'Close Chat' : 'Message Lawyer'}
                              {unreadByCase[c.id] > 0 && openChatCase !== c.id && (
                                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                  {unreadByCase[c.id] > 9 ? '9+' : unreadByCase[c.id]}
                                </span>
                              )}
                            </button>
                          </div>
                        )}

                        {openChatCase === c.id && c.lawyer_name && (
                          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                            <CaseChat
                              caseId={c.id}
                              currentUserId={user?.id}
                              currentUserName={user?.name}
                              otherPartyName={c.lawyer_name}
                            />
                          </div>
                        )}

                        <CaseTimeline
                          currentStatus={c.case_status}
                          statusHistory={c.status_history || []}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCases;
