'use server'
import React from 'react'
import { Tabs, TabsContent, TabsList } from '../ui/tabs'
import { TabsTrigger } from '@radix-ui/react-tabs'
import OrderCardList from './OrderCardList'
import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { Card } from '../ui/card'

const OrderDashboard = async ({ userid }) => {

    async function fetchOrders() {
        const ordersCollection = collection(db, 'orders')
        const ordersSnapshot = await getDocs(query(ordersCollection, orderBy('date', 'desc')));
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

    function filterProducts(ordersList, userid) {
        return ordersList.filter(order => order.userid === userid)
    }
    const allOrders = await fetchOrders();
    const allProducts = filterProducts(allOrders, userid);
    const [pendingProducts, completedProducts, cancelledProducts] = await Promise.all([
        filterOrders(allProducts, 'Pending'),
        filterOrders(allProducts, 'Completed'),
        filterOrders(allProducts, 'Cancelled')
    ]);

    const isAllEmpty = allProducts.length === 0;
    const isPendingEmpty = pendingProducts.length === 0;
    const isCompletedEmpty = completedProducts.length === 0;
    const isCancelledEmpty = cancelledProducts.length === 0;

    return (
        <div>
            <div className='text-6xl font-bold text-left mb-8 mt-4 text-pri'>Requests</div>
            <Tabs defaultValue="All">
                <TabsList className="grid w-full grid-cols-4 bg-white text-black shadow border-b-2">
                    <TabsTrigger value="All" className="data-[state=active]:bg-slate-500 rounded-md data-[state=active]:text-white transition">All</TabsTrigger>
                    <TabsTrigger value="Pending" className="data-[state=active]:bg-slate-500 rounded-md data-[state=active]:text-white transition">Pending</TabsTrigger>
                    <TabsTrigger value="Completed" className="data-[state=active]:bg-slate-500 rounded-md data-[state=active]:text-white transition">Completed</TabsTrigger>
                    <TabsTrigger value="Cancelled" className="data-[state=active]:bg-slate-500 rounded-md data-[state=active]:text-white transition">Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="All">{isAllEmpty ? <Card className><span className='m-5 mt-5 mb-5 text-lg'>No requests currently.</span></Card> : <OrderCardList orderList={allProducts} />}</TabsContent>
                <TabsContent value="Pending">{isPendingEmpty ? <Card className><span className='m-5 mt-5 mb-5 text-lg'>No pending requests currently.</span></Card> : <OrderCardList orderList={pendingProducts} />}</TabsContent>
                <TabsContent value="Completed">{isCompletedEmpty ? <Card className><span className='m-5 mt-5 mb-5 text-lg'>No completed requests currently.</span></Card> : <OrderCardList orderList={completedProducts} />}</TabsContent>
                <TabsContent value="Cancelled">{isCancelledEmpty ? <Card className><span className='m-5 mt-5 mb-5 text-lg'>No cancelled requests currently.</span></Card> : <OrderCardList orderList={cancelledProducts} />}</TabsContent>
            </Tabs>
        </div>
    )
}

export default OrderDashboard