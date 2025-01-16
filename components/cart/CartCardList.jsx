'use client'
import React from 'react'
import { Card, CardFooter } from '../ui/card'
import CheckoutButton from './CheckoutButton'
import CartCard from './CartCard'
import { useAuthContext } from '@/context/AuthContext'
import { notFound } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

const CartCardList = ({ cartItems, userId, totalPrice }) => {

    const { user, loading } = useAuthContext()

    if (loading || user == null) {
        return <Skeleton>
            <Card className="w-full mx-auto container">
                <div className='m-5 px-5 items-center justify-center flex'>
                    <Loader2 className='text-pri animate-spin h-12 w-12' />
                </div>
                <CardFooter className='flex flex-row justify-between items-center'>
                    <div>
                        <p className='font-bold translate-x-4 sm:text-3xl text-sm text-wrap flex-row flex items-center justify-center'>Total Price: <Loader2 className='text-pri animate-spin h-8 w-8'/></p>
                    </div>
                    <div className='flex justify-end -translate-x-4'>
                    </div>
                </CardFooter>
            </Card>
        </Skeleton>
    }

    if ((userId != user.uid) && !loading) {
        notFound()
    }

    return (
        <Card className="w-full mx-auto container">
            <div className='m-5 px-5 '>
                {cartItems.map(item => (
                    <CartCard key={item.id} product={item} userId={userId} />
                ))}
            </div>
            <CardFooter className='flex flex-row justify-between items-center'>
                <div>
                    <p className='font-bold translate-x-4 sm:text-3xl text-sm text-wrap'>Total Price: {totalPrice} vouchers</p>
                </div>
                <div className='flex justify-end -translate-x-4'>
                    <CheckoutButton userId={userId} cartItems={cartItems} />
                </div>
            </CardFooter>
        </Card>
    )
}

export default CartCardList