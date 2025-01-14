import React from 'react'
import { Card } from '../ui/card'
import Link from 'next/link'

const OrderCard = ({ date, price, quantity, status, name, productid, image }) => {
    const productUrl = `/product/${productid}`

    return (

        <div className="flex sm:flex-row justify-between items-center border-b-2 border-gray-200 pb-4 px-5 m-5">
            <div className="flex items-center justify-center gap-6">
                <img src={image} alt={name} className="w-24 h-24 object-cover border-pri border rounded-lg" />
                <div>
                    <Link href={productUrl} className="font-bold text-3xl hover:underline">
                        {name}
                    </Link>
                    <p className="text-sm text-gray-500 hidden sm:flex">Order Date: {date}</p>
                </div>
            </div>
            <div className="text-md text-black flex flex-row gap-1">
                <p className='font-bold'>Price: </p> {price} vouchers
            </div>
            <div className="text-md  text-black flex flex-row gap-1">
                <p className='font-bold'>Qty:</p> {quantity}
            </div>
            <div className="text-md flex flex-row gap-1  text-black">
                <p className='font-bold'>Status:</p> {status}
            </div>
        </div>

    )
}

export default OrderCard