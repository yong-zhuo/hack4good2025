import ProductCardList from '@/components/home/ProductCardList'
import { HomeNavbar } from '@/components/homenavbar/HomeNavbar'
import React from 'react'

const page = async () => {
  return (
    <div className='mt-5'>
      <div className='-mx-5 text-3xl font-extrabold sm:text-left text-center'>Products</div>
      <div className='w-full mx-auto'>
        <ProductCardList />
      </div>
    </div>
  )
}

export default page