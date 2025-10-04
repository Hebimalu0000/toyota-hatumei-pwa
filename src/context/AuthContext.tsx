import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';
import { getAuth, onAuthStateChanged, User, getIdTokenResult } from 'firebase/auth';
import firebaseApp, { auth } from '@/lib/firebase'; // ★ Default Import に修正

type UserRole = 'student' | 'instructor' | 'admin' | 'venue' | null;

interface AuthContextType {
  currentUser: User | null;
  role: UserRole;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  role: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

// ★ React.FC の型を修正し、children を明示的に受け取るように変更
export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // authインスタンスを使用
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        
        // Custom Claimを取得 (trueでキャッシュを強制的に更新)
        const idTokenResult = await user.getIdTokenResult(true); 
        const userRole = (idTokenResult.claims.role || null) as UserRole;
        
        setRole(userRole);
      } else {
        setCurrentUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []); // authインスタンスはuseEffect外で定義されているため依存配列から除外、または依存配列にauthを含める

  return (
    <AuthContext.Provider value={{ currentUser, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};