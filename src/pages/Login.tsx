import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, AlertTriangle } from 'lucide-react';

/* 
 * DEVELOPMENT CREDENTIALS
 * 
 * Admin: admin@flowinvoice.ai / admin123 -> /workspace
 * Client: user@client.com / user123 -> /portal
 * Operations: manager@flowinvoice.ai / manager123 -> /operations
 */

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === 'auth') {
      setError('Google sign-in failed or this account is not authorized.');
    }

    // Log development credentials to console for testing purposes
    console.log(
      '%cFlowInvoice AI - Demo Credentials', 
      'color: #3B82F6; font-weight: bold; font-size: 14px;'
    );
    console.log('Admin: admin@flowinvoice.ai / admin123');
    console.log('Client: user@client.com / user123');
    console.log('Operations: manager@flowinvoice.ai / manager123');
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email);
      if (email === 'admin@flowinvoice.ai') navigate('/workspace');
      else if (email === 'user@client.com') navigate('/portal');
      else if (email === 'manager@flowinvoice.ai') navigate('/operations');
      else navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F14] text-foreground font-sans items-center justify-center relative overflow-hidden">
      
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#0B0F14] pointer-events-none z-0"></div>
      
      {/* Premium Mesh Gradient Glows */}
      {/* Subtle radial blue glow on the left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-blue-600/15 rounded-full filter blur-[150px] opacity-70 pointer-events-none z-0"></div>
      
      {/* Faint purple glow on the right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full filter blur-[150px] opacity-70 pointer-events-none z-0"></div>
      
      {/* Very soft blurred circle on top */}
      <div className="absolute -top-1/4 left-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full filter blur-[150px] opacity-50 pointer-events-none z-0"></div>

      {/* Tiny noise/grain texture overlay at ~4% opacity */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] pointer-events-none mix-blend-overlay z-0"></div>

      <div className="w-full max-w-[380px] p-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-12 h-12 bg-[#151A21] rounded-2xl border border-[#2A3442] flex items-center justify-center mb-6 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <Sparkles size={20} className="text-foreground relative z-10" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Log in to continue.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg flex items-start space-x-3">
              <AlertTriangle size={16} className="text-danger shrink-0 mt-0.5" />
              <span className="text-sm text-danger">{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-foreground block">
              Work Email
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#151A21]/80 backdrop-blur-sm border border-[#2A3442] hover:border-[#2A3442]/80 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-foreground transition-all outline-none shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-foreground block">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#151A21]/80 backdrop-blur-sm border border-[#2A3442] hover:border-[#2A3442]/80 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-foreground transition-all outline-none shadow-sm"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium py-3 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed group text-sm"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full animate-spin"></div>
            ) : (
              <span>Log In</span>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2A3442]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0B0F14] px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-[#151A21]/80 backdrop-blur-sm border border-[#2A3442] hover:border-[#2A3442]/80 hover:bg-[#151A21] font-medium py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-3 text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Sign up option */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account? <button onClick={() => {}} className="text-primary hover:text-primary/80 hover:underline font-medium ml-1 transition-colors">Sign up</button>
        </div>

      </div>
    </div>
  );
}
