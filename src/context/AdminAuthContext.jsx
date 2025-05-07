import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current admin data on mount
  useEffect(() => {
    const fetchCurrentAdmin = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/profile`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }

        const data = await response.json();
        setCurrentAdmin(data);
        localStorage.setItem('adminData', JSON.stringify(data));
      } catch (err) {
        setError(err.message);
        // Try to get data from localStorage if API fails
        const cachedData = localStorage.getItem('adminData');
        if (cachedData) {
          setCurrentAdmin(JSON.parse(cachedData));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentAdmin();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setCurrentAdmin(data);
      localStorage.setItem('adminData', JSON.stringify(data));
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_API_URL}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      setCurrentAdmin(null);
      localStorage.removeItem('adminData');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update admin profile
  const updateProfile = async (updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }

      setCurrentAdmin(prev => ({ ...prev, ...data }));
      localStorage.setItem('adminData', JSON.stringify({ ...currentAdmin, ...data }));
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentAdmin;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        currentAdmin,
        loading,
        error,
        login,
        logout,
        updateProfile,
        isAuthenticated,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider; 