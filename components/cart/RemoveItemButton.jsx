'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

const RemoveItemButton = () => {
  return (
    <Button className='bg-red-400 text-sec hover:bg-red-500 flex flex-row items-center justify-center shadow-md hover:scale-x-100 duration-500 hover:shadow-lg'><Trash/> Remove Item</Button>
  )
}

export default RemoveItemButton