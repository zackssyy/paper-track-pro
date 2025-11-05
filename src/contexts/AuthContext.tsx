import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
  generatedId: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (userId: string, password?: string) => boolean;
  logout: () => void;
  skipLogin: (role: 'admin' | 'user') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static users data
const USERS: User[] = [
  { id: 'admin-001', name: 'Admin User', role: 'admin', generatedId: 'ADM001' },
  { id: 'user-001', name: 'John Doe', role: 'user', generatedId: 'USR001' },
  { id: 'user-002', name: 'Jane Smith', role: 'user', generatedId: 'USR002' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (generatedId: string, password?: string) => {
    const user = USERS.find(u => u.generatedId === generatedId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const skipLogin = (role: 'admin' | 'user') => {
    const user = USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, skipLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export { USERS };
