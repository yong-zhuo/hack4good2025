'use client'
import { HomeNavbar } from '@/components/homenavbar/HomeNavbar';

import { useAuthContext } from '@/context/AuthContext';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'


const layout = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading]);

  return (

    <div className='flex flex-col min-h-screen bg-[#FBF5E5] flex-grow'>
      <HomeNavbar />
      <div className='h-full mx-auto container mt-20'>{children}</div>
    </div>

  )
}

export default layout