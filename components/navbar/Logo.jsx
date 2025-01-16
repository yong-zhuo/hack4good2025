'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className='items-center font-sans font-extrabold text-xl text-orange-500'><Link href="/home" className='text-orange-400 flex items-center justify-center gap-1'><ShoppingCart className='text-orange-400' />Minimart@MWH</Link></div>
  )
}

export default Logo