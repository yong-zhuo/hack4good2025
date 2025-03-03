'use server'

import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import OrderCard from './OrderCard'
import { Card } from '../ui/card'

const OrderCardList = async ({ orderList }) => {
    return (
        <Card className='mx-auto grid grid-cols-1 mt-10 mb-5 items-center justify-center '>
            {orderList.map(order => (
                <div key={order.id}>
                    <OrderCard
                        name={order.name}
                        image={order.image}
                        price={order.price}
                        productid={order.productid}
                        date={order.date}
                        quantity={order.quantity}
                        status={order.status}
                    />
                </div>
            ))}
        </Card>
    )
}

export default OrderCardList