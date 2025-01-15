'use server'

import AddProductButton from '@/components/admin/inventory/AddProductButton'
import InventoryList from '@/components/admin/inventory/InventoryList'
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
    <div>
      <div className='text-3xl font-bold text-left mb-8 mt-4 text-pri'>
        Inventory
      </div>
      <div className='flex flex-col gap-y-4'>
        <div className='flex justify-end'>
          <AddProductButton />
        </div>
        <InventoryList products={products}/>
      </div>
    </div>
  )
}

export default page