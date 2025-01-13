'use server'

import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import ProductCard from './ProductCard'

const ProductCardList = async ({productList}) => {

    return (
        <div className='-ml-4 w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-6 gap-x-14 mt-2 mb-3 items-center justify-center '>
            {productList.map(product => (
                <div key={product.id}>
                    <ProductCard name={product.name} image={product.image} price={product.price} productid={product.id} />
                </div>
            ))}
        </div>
    )
}

export default ProductCardList