'use server'

import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'

const page = async ({ params }) => {
  const { slug } = await params

  const fetchCartItems = async () => {
    const cartCollectionRef = collection(db, 'users', slug, 'cart')
    const cartSnapshot = await getDocs(cartCollectionRef)
    const cartItems = cartSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return cartItems
  }

  const cartItems = await fetchCartItems()

  return (
    <div className="">
      <div className='text-6xl font-bold text-left mb-8 mt-4 text-pri'>Your Cart</div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="mb-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h2 className="text-xl font-medium">{item.name}</h2>
                  <p className="text-gray-500">${item.price}</p>
                  <p className="text-gray-500">Quantity: {item.selectedQuantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default page