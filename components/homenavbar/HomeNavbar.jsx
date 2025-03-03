'use client'

import React from 'react'
import Logo from '../navbar/Logo'
import SignOutButton from './SignOutButton'
import Link from 'next/link'
import CartLink from './CartLink'
import { useAuthContext } from '@/context/AuthContext'

export const HomeNavbar = () => {

  const { user } = useAuthContext();

  const userUid = user == null ? "" : user.uid;

  return (
    <div className="fixed inset-x-0 top-0 z-[15] h-[75px] bg-[#3E5879] py-2">
      <div className="mx-auto flex flex-row h-full items-center justify-between gap-2 px-8 sm:max-w-7xl md:max-w-full ">
        <Logo />
        <div className='items-center justify-center flex flex-row gap-4'>
          <Link href="/home" className='hover:underline text-[#FBF5E5]'>Home</Link>
          <CartLink />
          <Link href={`/requests/${userUid}`} className='hover:underline text-[#FBF5E5]'>Requests</Link>
          <Link href="/vouchers" className='hover:underline text-[#FBF5E5]'>Vouchers</Link>
          <Link href="/account" className='hover:underline text-[#FBF5E5]'>Account</Link>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}

