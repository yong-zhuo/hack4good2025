import React from 'react'

const OrderCard = ({ date, price, quantity, status, name, productid, image }) => {
    const productUrl = `/product/${productid}`

    return (

        <div className="grid grid-cols-4 sm:flex-row justify-between items-center border-b-2 border-gray-200 py-4">
            <div className="flex items-center justify-center gap-10">
                <img src={image} alt={name} className="w-20 h-20 object-cover" />
                <div>
                    <div className="text-lg font-bold text-black hover:underline">{name}</div>
                    <p className="text-sm text-gray-500 hidden sm:flex">Order Date: {date}</p>
                </div>
            </div>
            <div className="text-lg font-bold text-black">
                Price: <br />${price}
            </div>
            <div className="text-lg font-bold text-black">
                Qty: <br />{quantity}
            </div>
            <div className="text-lg font-bold text-black">
                Status: <br />{status}
            </div>
        </div>

    )
}

export default OrderCard