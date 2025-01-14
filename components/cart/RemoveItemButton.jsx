'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Loader, Trash } from 'lucide-react'
import { removeFromCart } from '@/firebase/firestore/modifyProduct'
import { toast, useToast } from '@/hooks/use-toast'
import { set } from 'zod'
import { useRouter } from 'next/navigation'

const RemoveItemButton = ({ userId, productId }) => {

  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRemove = async () => {
    setLoading(true)
    try {
      await removeFromCart(userId, productId)
      setLoading(false)
      router.refresh()
    } catch (e) {
      setLoading(false)
      toast({
        variant: "destructive",
        title: `${e.message}`,
        message: `Please try again later.`,
      })
    }
  }

  return (
    <Button className='bg-red-400 text-sec hover:bg-red-500 flex flex-row items-center justify-center shadow-md hover:scale-x-100 duration-500 hover:shadow-lg' onClick={handleRemove}>
      {loading ? <Loader className='animate-spin ' height={12} /> : `Remove Item`}
    </Button>
  )
}

export default RemoveItemButton