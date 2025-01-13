import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthState } from '../types';

const AuthContext = createContext<AuthState>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setState({ user: session.user as any, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user as any || null, loading: false });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);