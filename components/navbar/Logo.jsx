'use client'

import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className='items-center font-sans font-extrabold text-xl text-[#FBF5E5]'><Link href="/home" className='hover:underline text-[#FBF5E5]'>Marketplace</Link></div>
  )
}

export default Logo