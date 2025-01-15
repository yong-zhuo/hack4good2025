import RequestList from '@/components/admin/requests/RequestList'
import React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'

const page = async () => {

    async function fetchProducts() {
        const ordersCollection = collection(db, 'orders')
        const ordersSnapshot = await getDocs(ordersCollection)
        const pendingProductsList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const productsList = pendingProductsList.filter(product => product.status == 'Pending')
        return productsList
    }

    const products = await fetchProducts()

    return (
        <div>
            <h1 className="text-3xl font-bold text-left mb-8 mt-4 text-pri">Product requests</h1>
            <RequestList products={products} />
        </div>
    )
}

export default page