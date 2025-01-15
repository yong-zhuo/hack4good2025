'use client'
import { HomeNavbar } from '@/components/homenavbar/HomeNavbar';

import { useAuthContext } from '@/context/AuthContext';
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '@/components/navbar/Logo';
import { db } from '@/firebase/firebaseConfig';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import SignOutButton from '@/components/homenavbar/SignOutButton';


const layout = ({ children }) => {

  const { user, loading } = useAuthContext();
  const router = useRouter();
  const path = usePathname();
  const containsAdminPath = path.includes('/admin');
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if ((userDoc.exists() || userDoc.data().isAdmin) && !containsAdminPath) {
          router.push('/admin/inventory');
        }
      }
    };


    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading, router]);

  return (

    <div className='flex flex-col min-h-screen bg-[#FBF5E5] flex-grow'>
      <div className="fixed inset-x-0 top-0 z-[15] h-[75px] bg-[#3E5879] py-2">
        <div className="mx-auto flex h-full items-center justify-between gap-2 px-8 sm:max-w-7xl md:max-w-full ">
          <div className='flex flex-row gap-1 items-center font-sans text-xl font-bold text-orange-500'><Link href="/admin" className='text-orange-400 flex items-center justify-center gap-1 font-sans font-extrabold text-xl'><ShoppingCart className='text-orange-400' />Minimart@MWH <span className='font-bold text-xl text-orange-500'>for admins</span></Link> </div>

        </div>
      </div>
      <div className='h-full mx-auto container mt-20'>{children}</div>
    </div>

  )
}

export default layout