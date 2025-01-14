'use server'

import CartCard from '@/components/cart/CartCard'
import CheckoutButton from '@/components/cart/CheckoutButton'
import CheckUser from '@/components/cart/CheckUser'
import { Card, CardFooter } from '@/components/ui/card'
import { db } from '@/firebase/firebaseConfig'
import { getProductStockQuantity } from '@/firebase/firestore/modifyProduct'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'

const page = async ({ params }) => {
  const { slug } = await params

  const fetchCartItems = async () => {
    const cartCollectionRef = collection(db, 'users', slug, 'cart')
    const cartSnapshot = await getDocs(cartCollectionRef)
    const cartItems = await Promise.all(
      cartSnapshot.docs.map(async (doc) => {
        const stockQuantity = await getProductStockQuantity(doc.id)

        return {
          id: doc.id,
          ...doc.data(),
          stockQuantity: stockQuantity
        }
      }))

    return cartItems
  }

  const cartItems = await fetchCartItems()

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.selectedQuantity;
  }, 0);

  return (
    <div className="">

      <div className='text-6xl font-bold text-left mb-8 mt-4 text-pri'>Your Cart</div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Card className="w-full mx-auto container">
          <ul className='m-5 px-5'>
            <div className='h-[1px] bg-pri opacity-25 mb-4' />
            {cartItems.map(item => (
              <CartCard key={item.id} product={item} userId={slug} />
            ))}
          </ul>
          <CardFooter className='flex flex-row justify-between items-center'>
            <div>
              <p className='font-bold translate-x-4 text-3xl text-orange-400'>Total Price: {totalPrice} points</p>
            </div>
            <div className='flex justify-end -translate-x-4'>
              <CheckoutButton userId={slug} cartItems={cartItems} />
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default page