'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

const AdminButton = () => {

    const router = useRouter();

    const handleClick = () => {
        router.push('/admin')
    }

    return (
        <Button onClick={handleClick} className='bg-pri text-white hover:bg-pri hover:underline'>Admin</Button>
    )
}

export default AdminButton