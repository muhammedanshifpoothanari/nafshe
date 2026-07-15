'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, Sparkles } from 'lucide-react';

export default function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        // Store in localStorage for session state simulation
        localStorage.setItem('vendorSession', JSON.stringify(data.vendor));
        router.push('/vendor/dashboard');
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection failure. Check backend services.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neutral-900 rounded-full filter blur-[120px] opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-800 rounded-full filter blur-[120px] opacity-20" />

      <div className="max-w-md w-full space-y-10 border border-white/10 bg-white/5 p-10 backdrop-blur-md relative z-10">
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-white/5 border border-white/10 rounded-none mb-2">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Vendor Portal</h1>
          <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">Secure tenant orchestration</p>
        </div>

        {error && (
          <div className="p-4 border border-red-500/30 bg-red-500/5 text-red-500 text-[10px] uppercase font-bold tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-widest font-black text-white/40 block">Email Credentials</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vendor@nafshe.sa"
                className="w-full bg-black border border-white/10 pl-12 pr-4 py-4 text-xs font-mono text-white placeholder-white/20 focus:border-white focus:outline-none transition-all rounded-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-widest font-black text-white/40 block">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 pl-12 pr-4 py-4 text-xs font-mono text-white placeholder-white/20 focus:border-white focus:outline-none transition-all rounded-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
              </>
            ) : (
              'Establish Connection'
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-[8px] uppercase tracking-widest text-white/20">
            For access credentials, contact Nafshe Super Admin.
          </p>
        </div>
      </div>
    </div>
  );
}
