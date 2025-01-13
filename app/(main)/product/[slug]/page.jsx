'use server'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { db } from '@/firebase/firebaseConfig'
import { collection, doc, getDoc } from 'firebase/firestore'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({ params }) => {
  const { slug } = await params

  const fetchProduct = async () => {
    const productDoc = doc(db, 'products', slug);
    const product = await getDoc(productDoc)

    if (!product.exists()) {
      notFound()
    }

    return product.data()
  }

  const product = await fetchProduct()

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mt-12 p-12">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <img src={product.image} alt={product.name} className="w-fit h-fit object-cover border-2 shadow-lg border-pri rounded-xl" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div className='gap-3'>
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
        </div>
        <div className="h-[1px] bg-pri" />
        <div>
          <h2 className="font-medium text-2xl">${product.price}</h2>
          <p className="text-gray-500">{product.quantity == 0 ? 'Out of stock' : `${product.quantity} left`}</p>
        </div>
        <div className="h-[1px] bg-pri" />
      </div>
    </div>
  )
}

export default page