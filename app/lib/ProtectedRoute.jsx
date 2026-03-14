"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

function ProtectedRoute({children}) {
  const {data:user,status}=useSession()
  useEffect(()=>{
    console.log("Session user:", user);
    if(status === "unauthenticated"){
      window.location.href = '/login';
    }
  },[user,status])
  return <>{children}</>;
}

export default ProtectedRoute
