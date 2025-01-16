'use server'

import React from 'react'
import SignInButton from './SignInButton'
import SignUpButton from './SignUpButton'
import AdminButton from './AdminButton'
import Logo from './Logo'
import ForgetPassword from './ForgetPassword'

export const Navbar = async () => {
  return (
    <div className="fixed inset-x-0 top-0 z-[15] h-[75px] bg-[#3E5879] py-2">
      <div className="mx-auto flex h-full items-center justify-between gap-2 px-8 sm:max-w-7xl md:max-w-full ">
        <Logo />
        <div>
          <AdminButton />
          <ForgetPassword />
          <SignUpButton />
          <SignInButton />
        </div>
      </div>
    </div>
  )
}
