'use server'

import { db } from '@/firebase/firebaseConfig'
import { collection, doc, getDoc } from 'firebase/firestore'
import { redirect } from 'next/dist/server/api-utils'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({params}) => {
  const { slug } = await params

  const fetchProduct = async () => {
    const productDoc = doc(db, 'products', slug);
    const productSnapshot = await getDoc(productDoc)

    if (!productSnapshot.exists()) {
      notFound()
    }
  }

  const product = await fetchProduct()

  return (
    <div>{slug}</div>
  )
}

export default page