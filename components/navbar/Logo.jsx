'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className='items-center font-sans font-extrabold text-xl text-[#FBF5E5]'><Link href="/home" className='text-[#FBF5E5] flex items-center justify-center gap-1'><ShoppingCart className='text-sec'/>Marketplace</Link></div>
  )
}

export default Logo