'use client';

import { useState } from 'react';
import { NafsheFooter } from '@/components/nafshe-footer';
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login for demo
    setTimeout(() => {
      login(email, password);
      router.push('/profile');
    }, 1000);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      
      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md space-y-12 animate-fade-in-up">
          
          {/* Header */}
          <div className="text-center space-y-4">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 border border-primary/10 mb-2">
                <ShieldCheck className="w-6 h-6 text-accent" />
             </div>
             <h1 className="text-3xl font-light text-luxury tracking-wide">
               {isLogin ? 'Welcome Back' : 'Create an Account'}
             </h1>
             <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
               {isLogin ? 'Access your private collection' : 'Join the Nafshe elite circle'}
             </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
               <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-muted/20 border-b border-border focus:border-accent outline-none text-sm transition-all placeholder:text-muted-foreground"
                  />
               </div>
               <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-muted/20 border-b border-border focus:border-accent outline-none text-sm transition-all placeholder:text-muted-foreground"
                  />
               </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-accent transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.3em] font-bold shadow-2xl shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Footer Toggle */}
          <div className="text-center space-y-6">
             <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already a member?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-foreground font-bold hover:text-accent transition-colors"
                >
                  {isLogin ? 'Join Now' : 'Login Here'}
                </button>
             </p>
             
             <div className="pt-8 border-t border-border">
                <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground leading-relaxed">
                  By continuing, you agree to the Nafshe <br /> 
                  <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
                </p>
             </div>
          </div>

        </div>
      </main>

      <NafsheFooter />
    </div>
  );
}
