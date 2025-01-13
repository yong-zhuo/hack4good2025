'use server'

import ProductCardList from '@/components/home/ProductCardList'
import { HomeNavbar } from '@/components/homenavbar/HomeNavbar'
import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'

const page = async () => {
   async function fetchProducts() {
    const productsCollection = collection(db, 'products')
    const productsSnapshot = await getDocs(productsCollection)
    const productsList = productsSnapshot.docs.map(doc => (
      {
      id: doc.id,
      ...doc.data()
    }));
    return productsList
   }

   const products = await fetchProducts()

  return (
    <div className='mt-5'>
      <div className='text-6xl font-extrabold text-left ml-10 text-pri'>Products</div>
      <div className='w-fit container mx-auto '>
        <ProductCardList productList={products}/>
      </div>
    </div>
  )
}

export default page