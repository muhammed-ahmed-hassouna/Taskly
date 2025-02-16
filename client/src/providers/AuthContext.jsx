import { createContext, useContext, useState } from 'react';
import { getUserCookies } from 'utils/methods';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUserCookies());

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);