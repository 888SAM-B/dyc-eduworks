import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin } from '../api/index.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('dyc_admin_token');
    const username = localStorage.getItem('dyc_admin_user');
    if (token && username) setAdmin({ token, username });
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const { data } = await loginAdmin({ username, password });
    localStorage.setItem('dyc_admin_token', data.token);
    localStorage.setItem('dyc_admin_user', data.username);
    setAdmin({ token: data.token, username: data.username });
  };

  const logout = () => {
    localStorage.removeItem('dyc_admin_token');
    localStorage.removeItem('dyc_admin_user');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
