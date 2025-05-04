import React from 'react';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { Navigate, Outlet } from 'react-router-dom';


export const ProtectedAdminRoute = () => {

    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
      const checkAuth = async () => {
        const loggedIn = await isLoggedIn();
        setAuthorized(loggedIn);
      };
  
      checkAuth();
    }, []);
  
    if (authorized == null) return <p>Loading...</p>;

  return authorized  ? <Outlet /> : <Navigate to="/admin-login" replace />;
};



export const PublicRoute = () => {

    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
      const checkAuth = async () => {
        const loggedIn = await isLoggedIn();
        setAuthorized(loggedIn);
      };
  
      checkAuth();
    }, []);
  
    if (authorized == null) return <p>Loading...</p>;

  
  return authorized ? <Navigate to="/admin-pannel" replace /> : <Outlet />;
};