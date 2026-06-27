import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';

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
    // Log development credentials to console for testing purposes
    console.log(
      '%cFlowInvoice AI - Demo Credentials', 
      'color: #3B82F6; font-weight: bold; font-size: 14px;'
    );
    console.log('Admin: admin@flowinvoice.ai / admin123');
    console.log('Client: user@client.com / user123');
    console.log('Operations: manager@flowinvoice.ai / manager123');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      if (email === 'admin@flowinvoice.ai' && password === 'admin123') {
        login('admin');
        navigate('/workspace');
      } else if (email === 'user@client.com' && password === 'user123') {
        login('client');
        navigate('/portal');
      } else if (email === 'manager@flowinvoice.ai' && password === 'manager123') {
        login('manager');
        navigate('/operations');
      } else {
        setError('Invalid email or password.');
        setIsLoading(false);
      }
    }, 600);
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

        {/* Sign up option */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account? <button onClick={() => {}} className="text-primary hover:text-primary/80 hover:underline font-medium ml-1 transition-colors">Sign up</button>
        </div>

      </div>
    </div>
  );
}
