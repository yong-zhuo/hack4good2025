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
    <div className='min-h-screen bg-[#FBF5E5]'><HomeNavbar />{children}</div>
  )
}

export default layout