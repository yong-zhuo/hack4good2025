import OrderDashboard from '@/components/order/OrderDashboard'
import React from 'react'

const page = async ({ params }) => {
    const { slug } = await params
    return (
        <OrderDashboard
            userid={slug}
        />
    )
}

export default page