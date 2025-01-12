'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const CartLink = () => {

    const router = useRouter()


  return (
    <Button variant="link" className="text-md text-[#FBF5E5]" onClick={router.push('/cart')}>Cart</Button>
  )
}

export default CartLink