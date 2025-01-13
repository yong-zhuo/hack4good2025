'use client'

import { HomeNavbar } from '@/components/homenavbar/HomeNavbar'
import Logo from '@/components/navbar/Logo'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {
    const router = useRouter()
    const handleClick = () => {
        router.back()
    }

  return (
    <main className='bg-sec min-h-screen flex flex-col'>
        <HomeNavbar/>
        <div className='mx-auto mb-20 flex flex-1 items-center justify-between'>
        <div className="mb-20 ml-8 flex flex-1 flex-col justify-center sm:justify-start text-left">
          <h2 className="text-4xl sm:text-7xl font-extrabold text-gray-900 sm:text-left text-center">Oops...</h2>
          <p className="mt-2 sm:text-left text-sm sm:text-xl  text-gray-600  text-center">
            Sorry, the page that you are looking for does not seem to exist or has been removed
          </p>

          <div className="mt-2 w-1/4">
            <Button onClick={async () => router.back()} className="bg-pri w-fit h-fit shadow rounded-md sm:text-md text-xs text-white hover:bg-slate-500 hover:scale-105 transition"><ArrowLeft className="w-5 h-5"/>Back to previous page</Button>
          </div> 
        </div>
        </div>
    </main>
  )
}

export default NotFound