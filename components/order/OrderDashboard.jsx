'use server'
import React from 'react'
import { Tabs, TabsContent, TabsList } from '../ui/tabs'
import { TabsTrigger } from '@radix-ui/react-tabs'
import OrderCardList from './OrderCardList'
import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const OrderDashboard = async () => {

    async function fetchOrders() {
        const ordersCollection = collection(db, 'orders')
        const productsCollection = collection(db, 'products')
        const ordersSnapshot = await getDocs(ordersCollection)
        const productsSnapshot = await getDocs(productsCollection)
        const ordersList = ordersSnapshot.docs.map(doc => (
            {
                id: doc.id,
                ...doc.data(),

            }));
        return ordersList;
    }

    async function filterOrders(ordersList, status) {
        return ordersList.filter(order => order.status === status)
    }

    const allProducts = await fetchOrders();
    const [pendingProducts, completedProducts, cancelledProducts] = await Promise.all([
        filterOrders(allProducts, 'pending'),
        filterOrders(allProducts, 'completed'),
        filterOrders(allProducts, 'cancelled')
    ]);


    return (
        <div>
            <div className='text-6xl font-bold text-left mb-8 mt-4 text-pri'>Orders</div>
            <Tabs defaultValue="All">
                <TabsList className="grid w-full grid-cols-4 bg-white text-black shadow border-b-2">
                    <TabsTrigger value="All" className="data-[state=active]:bg-slate-500 rounded-md data-[state=active]:text-white transition">All</TabsTrigger>
                    <TabsTrigger value="Pending" className="data-[state=active]:bg-slate-500 rounded-md data-[state=active]:text-white transition">Pending</TabsTrigger>
                    <TabsTrigger value="Completed" className="data-[state=active]:bg-slate-500 rounded-md data-[state=active]:text-white transition">Completed</TabsTrigger>
                    <TabsTrigger value="Cancelled" className="data-[state=active]:bg-slate-500 rounded-md data-[state=active]:text-white transition">Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="All"><OrderCardList orderList={allProducts} /></TabsContent>
                <TabsContent value="Pending"><OrderCardList orderList={pendingProducts} /></TabsContent>
                <TabsContent value="Completed"><OrderCardList orderList={completedProducts} /></TabsContent>
                <TabsContent value="Cancelled"><OrderCardList orderList={cancelledProducts} /></TabsContent>
            </Tabs>
        </div>
    )
}

export default OrderDashboard