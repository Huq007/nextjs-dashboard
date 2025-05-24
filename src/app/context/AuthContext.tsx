'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for token in localStorage on initial load
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated and not on auth pages
    if (!token && !pathname?.includes('/login') && !pathname?.includes('/signup')) {
      router.push('/login');
    }
  }, [token, pathname, router]);

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(newToken);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: handleSetToken,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 