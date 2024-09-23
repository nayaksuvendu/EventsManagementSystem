import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  
        const { isLoggedIn,isAdmin} = useSelector((state) => state?.auth); // Accessing auth state
        return isLoggedIn && isAdmin ? children :(<Navigate to="login"/>)
      }
  
