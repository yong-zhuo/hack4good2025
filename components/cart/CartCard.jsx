'use client'

import { useAuthContext } from '@/context/AuthContext'
import { setProductQuantity } from '@/firebase/firestore/modifyProduct'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import RemoveItemButton from './RemoveItemButton'

const CartCard = ({ product, userId}) => {
  const [isPending, startTransition] = useTransition();
  
  const router = useRouter()

  const quantityOptions = [];
  for (let i = 1; i <= product.stockQuantity; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <img
          src={product.image}
          alt={product.name}
          width={140}
          height={120}
          className="rounded-lg border border-pri "
        />
        <div className='flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:w-full'>
          <div className='flex flex-col sm:text-start text-center'>
            <Link href={"/product/" + product.id} className="font-bold text-3xl">
              {product.name}
            </Link>
            <div className='text-gray-600'>{product.description}</div>
          </div>
          <div className='flex flex-row gap-1'><p className='font-bold'>Price: </p> {product.price} points</div>
          <div className="my-1 flex items-center gap-2">
            <p className='font-bold'>Quantity:</p>
            <select
              className="w-full max-w-[80px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            defaultValue={product.selectedQuantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(userId, product.id, newQuantity);
                  router.refresh();
                });
              }}
            >
    
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <p className='font-bold'>Total:</p> 
            {isPending ?(
              <Loader2 className='text-gray-500 animate-spin' height={16}  />
            ) : `${product.price * product.selectedQuantity} points`}
          </div>
          <RemoveItemButton/>
        </div>
      </div>
      <div className="border-b border-gray-300 my-4"/>
    </div>
  )
}

export default CartCard