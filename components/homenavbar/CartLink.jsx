'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const CartLink = () => {

  const router = useRouter()


  const handleClick = () => {
    router.push('/cart');
  };

  return (
    <Button variant="link" className="text-md text-[#FBF5E5] -p-1" onClick={handleClick}>Cart</Button>
  )
}

export default CartLink