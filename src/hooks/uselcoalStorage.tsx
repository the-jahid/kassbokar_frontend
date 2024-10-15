'use client'
import { useState, useEffect } from 'react';

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);
    }
  }, []);

  const saveAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      setAuthToken(token);
    } else {
      console.error('localStorage is not available');
    }
  };

  const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    } else {
      console.error('localStorage is not available');
      return null;
    }
  };

  const deleteAuthToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      setAuthToken(null);
    } else {
      console.error('localStorage is not available');
    }
  };

  return {
    authToken,
    saveAuthToken,
    getAuthToken,
    deleteAuthToken,
  };
};

export default useAuthToken;









