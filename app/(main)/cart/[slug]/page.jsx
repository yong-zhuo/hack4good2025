
import CartCard from '@/components/cart/CartCard'
import CartCardList from '@/components/cart/CartCardList'
import CheckoutButton from '@/components/cart/CheckoutButton'
import CheckUser from '@/components/cart/CheckUser'
import { Card, CardFooter } from '@/components/ui/card'
import { db } from '@/firebase/firebaseConfig'
import { getProductStockQuantity } from '@/firebase/firestore/modifyProduct'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

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

      <div className='text-3xl font-bold text-left mb-8 mt-4 text-pri'>Your Cart</div>
      {cartItems.length === 0 ? (
        <Card><span className='m-5 '>Your cart is empty.</span></Card>
      ) : (
        <CartCardList cartItems={cartItems} userId={slug} totalPrice={totalPrice} />
      )}
    </div>
  )
}

export default page