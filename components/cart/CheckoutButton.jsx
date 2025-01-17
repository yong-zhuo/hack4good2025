'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { sendRequest } from '@/firebase/firestore/modifyProduct'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'

const CheckoutButton = ({ userId, cartItems, totalPrice }) => {

    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleCheckout = async () => {
        setLoading(true)
        try {
            const userDoc = doc(db, 'users', userId)
            const userDocRef = await getDoc(userDoc)

            if (userDocRef.data().balance < totalPrice) {
                toast({
                    variant: "destructive",
                    title: 'Insufficient vouchers',
                    description: 'Please request for more vouchers to proceed',
                })
            } else {
                await sendRequest(userId, cartItems)
                toast({
                    variant: "success",
                    title: 'Request sent successfully',
                })
            }
            setLoading(false)
            router.refresh()
        } catch (error) {
            setLoading(false)
            toast({
                variant: "destructive",
                title: 'Error',
                message: `${error.message}`,
            })
        }
    }

    return (
        <div><Button className="bg-orange-400 text-sec hover:bg-orange-300 hover:scale-x-100 shadow-md hover:shadow-lg duration-500" onClick={handleCheckout}>{loading ? <Loader className='animate-spin ' height={12} /> : 'Send Request'}</Button></div>
    )
}

export default CheckoutButton