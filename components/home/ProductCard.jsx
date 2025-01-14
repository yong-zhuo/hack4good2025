import { Search } from 'lucide-react'
import React from 'react'

const ProductCard = ({ name, price, productid, image }) => {
    const productUrl = `/product/${productid}`
    return (
        <div className="relative m-10 flex w-72 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href={productUrl}>
                <img className="object-cover w-full" src={image} alt={name} />
            </a>
            <a className="mt-4 px-5 pb-3" href={productUrl}>
                <div className='flex flex-row justify-between items-center mb-2'>
                    <h5 className="text-xl tracking-tight text-slate-900">{name}</h5>
                    <p>
                        <span className="text-2xl font-bold text-slate-900 flex flex-row items-center gap-1">{price} <span className='text-xs pt-2'>vouchers</span></span>
                    </p>
                </div>
            </a>
        </div>

    )
}

export default ProductCard