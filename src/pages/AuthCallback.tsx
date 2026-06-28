import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { homePathForRole } from '@/lib/authPaths';

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const { completeOAuthLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Missing login token');
      return;
    }

    completeOAuthLogin(token)
      .then((user) => navigate(homePathForRole(user.role), { replace: true }))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Google sign-in failed');
        setTimeout(() => navigate('/login?error=auth', { replace: true }), 2500);
      });
  }, [completeOAuthLogin, navigate, searchParams]);

  return (
    <div className="min-h-screen bg-[#0B0F14] flex flex-col items-center justify-center text-muted-foreground gap-3">
      {!error ? (
        <>
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm">Completing Google sign-in...</p>
        </>
      ) : (
        <p className="text-sm text-danger max-w-sm text-center px-4">{error}</p>
      )}
    </div>
  );
}
