'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'

const CheckoutButton = ({userId, cartId, cartItems}) => {

    const { toast } = useToast()

    const handleCheckout = async () => {
        try {
            toast({
                variant: "success",
                title: 'Request sent successfully',
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: 'Error',
                message: `${error.message}`,
            })
        }
    }

  return (
    <div><Button className="bg-orange-400 text-sec hover:bg-orange-300 hover:scale-x-100 shadow-md hover:shadow-lg duration-500">Send Request</Button></div>
  )
}

export default CheckoutButton