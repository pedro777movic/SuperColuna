import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('@Coluna30D:user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: '1',
            name: 'Usuário Teste',
            email,
            avatar: 'https://ui-avatars.com/api/?name=Usuário+Teste&background=29719F&color=fff',
          };
          setUser(mockUser);
          localStorage.setItem('@Coluna30D:user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Credenciais inválidas.'));
        }
      }, 800);
    });
  };

  const register = async (name, email, password) => {
    // Mock register
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: String(Date.now()),
          name,
          email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=29719F&color=fff`,
        };
        setUser(newUser);
        localStorage.setItem('@Coluna30D:user', JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@Coluna30D:user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
