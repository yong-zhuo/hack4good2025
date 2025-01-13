'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

const CartLink = () => {

  const router = useRouter()

  const { user } = useAuthContext()

  const handleClick = () => {
    router.push(`/cart/${user.uid}`);
  };

  return (
    <div className='relative inline-flex w-fit'>
      <Button variant="link" className="text-md text-[#FBF5E5] -p-1" onClick={handleClick}>
        Cart
      </Button>
    </div>
  )
}

export default CartLink