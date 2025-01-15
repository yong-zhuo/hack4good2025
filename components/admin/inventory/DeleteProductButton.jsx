'use client'

import React, { useState } from 'react'
import { Loader, Trash } from 'lucide-react'
import { removeFromCart } from '@/firebase/firestore/modifyProduct'
import { toast, useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/firebase/firestore/admin'

const DeleteProductButton = ({ productId }) => {

    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleRemove = async () => {
        setLoading(true)
        try {
            await deleteProduct(productId);
            setLoading(false)
            toast({
                variant: "success",
                title: "Product deleted",
                description: `Product has been successfully deleted`
            })
            router.refresh()
        } catch (e) {
        
            setLoading(false)
            toast({
                variant: "destructive",
                title: "Error deleting product",
                description: 'Please try again later'
            })
        }
    }

    return (
        <Button className='bg-red-400 text-sec hover:bg-red-500 flex flex-row items-center justify-center shadow-md hover:scale-x-100 duration-500 hover:shadow-lg' onClick={handleRemove}>
            {loading ? <Loader className='animate-spin ' height={12} /> : `Delete`}
        </Button>
    )
}

export default DeleteProductButton 