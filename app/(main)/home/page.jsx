import ProductCardList from '@/components/home/ProductCardList'
import { HomeNavbar } from '@/components/homenavbar/HomeNavbar'
import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'

export const dynamic = 'force-dynamic';
export const fetchCache = "force-no-store";

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
      <img src='https://mwh.muhammadiyah.org.sg/wp-content/uploads/2021/06/WhatsApp-Image-2021-06-25-at-4.12.37-PM-e1624614364771.jpeg' className='w-full h-96 object-cover mb-5' />
      <div className='text-4xl font-bold text-left text-pri'>Products
        <div className="h-[1px] bg-pri" />
      </div>

      <div className='w-fit '>
        <ProductCardList productList={products} />
      </div>
    </div>
  )
}

export default page