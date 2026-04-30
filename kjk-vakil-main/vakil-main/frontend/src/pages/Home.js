import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, FileText, Users, Shield, Clock, Award } from 'lucide-react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Navbar />

      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
              <Scale className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Trusted Legal Services Platform</span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight" data-testid="hero-heading">
              Expert Legal Counsel,
              <span className="text-amber-400"> When You Need It</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
              Connect with India's most qualified lawyers. Get AI-powered case analysis and expert legal representation for any matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" data-testid="get-started-button">
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/services" data-testid="learn-more-button">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-lg transition-all border border-white/20">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">500+</div>
              <div className="text-sm text-slate-600">Verified Lawyers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">10K+</div>
              <div className="text-sm text-slate-600">Cases Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">24/7</div>
              <div className="text-sm text-slate-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">98%</div>
              <div className="text-sm text-slate-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-wider text-amber-600 mb-3">Why Choose VakilSetu</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">Professional Legal Solutions</h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">Comprehensive legal services backed by AI technology and experienced professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow" data-testid="feature-1">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6">
                <Scale className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">Expert Legal Network</h3>
              <p className="text-slate-600 leading-relaxed">
                Access India's top-rated lawyers across all specializations with verified credentials and proven track records.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow" data-testid="feature-2">
              <div className="w-14 h-14 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">AI-Powered Analysis</h3>
              <p className="text-slate-600 leading-relaxed">
                Get instant case analysis using advanced AI to identify relevant laws and understand your legal position.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow" data-testid="feature-3">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">Complete Transparency</h3>
              <p className="text-slate-600 leading-relaxed">
                Clear communication, upfront pricing, and complete visibility throughout your legal journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-amber-600 mb-3">Trust & Security</p>
              <h2 className="font-heading text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Your Legal Matters in Safe Hands
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We understand the sensitivity of legal matters. VakilSetu ensures complete confidentiality and professional handling of your case.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Data Protection</h4>
                    <p className="text-sm text-slate-600">Bank-grade encryption for all your sensitive information</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Quick Response</h4>
                    <p className="text-sm text-slate-600">Connect with lawyers within 24 hours of case submission</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Verified Professionals</h4>
                    <p className="text-sm text-slate-600">All lawyers are bar-certified and background-verified</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8">
              <div className="text-6xl font-bold text-slate-900 mb-4">98%</div>
              <div className="text-xl font-semibold text-slate-900 mb-2">Client Satisfaction Rate</div>
              <p className="text-slate-600 mb-6">Based on 10,000+ successfully resolved cases</p>
              <div className="border-t border-slate-200 pt-6">
                <p className="text-sm text-slate-500 italic">
                  "VakilSetu connected me with an excellent lawyer who understood my case perfectly. The AI analysis helped me understand my legal position before even meeting the lawyer."
                </p>
                <p className="text-sm font-semibold text-slate-900 mt-3">— Rajesh Kumar, Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Ready to Resolve Your Legal Matter?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of clients who have found the perfect legal representation through VakilSetu.
          </p>
          <Link to="/login" data-testid="cta-button">
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-10 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
              Get Started Today <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
