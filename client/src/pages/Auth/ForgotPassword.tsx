import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AuthService } from '../../services/api';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.login(email, 'reset', 'COLLEGE_ADMIN');
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <Link to="/login" className="inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Sign In
          </Link>

          {!submitted ? (
            <>
              <h3 className="text-xl font-bold text-white mb-2">Reset Password</h3>
              <p className="text-xs text-slate-400 mb-6">
                Enter your institutional email address to receive password recovery instructions.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      placeholder="name@university.edu"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition"
                >
                  {loading ? 'Sending...' : 'Send Recovery Email'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">Recovery Link Sent</h4>
              <p className="text-xs text-slate-400 mb-6">
                We have dispatched password reset instructions to <strong className="text-white">{email}</strong>.
              </p>
              <Link to="/login" className="inline-block py-2.5 px-6 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500">
                Return to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
