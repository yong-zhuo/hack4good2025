'use client'

import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const ProductCardList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, 'products')
            const productsSnapshot = await getDocs(productsCollection)
            const productsList = productsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsList);
        }

        fetchProducts();
    }, [])



    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map(product => (
                <div key={product.id}>
                    <ProductCard name={product.name} image={product.image} price={product.price}/>
                </div>
            ))}
        </div>
    )
}

export default ProductCardList