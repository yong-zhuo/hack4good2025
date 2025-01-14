'use server'
import React from 'react'
import { Card, CardFooter } from '../ui/card'
import CheckoutButton from './CheckoutButton'
import CartCard from './CartCard'
import { useAuthContext } from '@/context/AuthContext'
import { notFound } from 'next/navigation'

const CartCardList = ({cartItems, userId, totalPrice}) => {


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