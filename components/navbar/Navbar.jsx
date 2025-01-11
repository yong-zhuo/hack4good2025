import React from 'react'
import SignInButton from './SignInButton'
import SignUpButton from './SignUpButton'

export const Navbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-[15] h-[75px] bg-slate-500 py-2">
        <div className="mx-auto flex h-full items-center justify-end gap-2 px-8 sm:max-w-7xl md:max-w-full ">
            <SignUpButton />
            <SignInButton />
        </div>
    </div>
  )
}
