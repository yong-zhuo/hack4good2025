import React from 'react'
import SignOutButton from '../homenavbar/SignOutButton'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const AdminNavBar = () => {
    return (
        <div className="fixed inset-x-0 top-0 z-[15] h-[75px] bg-[#3E5879] py-2">
            <div className="mx-auto flex h-full items-center justify-between gap-2 px-8 sm:max-w-7xl md:max-w-full ">
                <div className='flex flex-row gap-1 items-center font-sans text-xl font-bold text-orange-500'><Link href="/admin/inventory" className='text-orange-400 flex items-center justify-center gap-1 font-sans font-extrabold text-xl'><ShoppingCart className='text-orange-400' />Minimart@MWH <span className='font-bold text-xl text-orange-500'>for admins</span></Link> </div>
                <div className='flex flex-row gap-4 justify-center items-center'>
                    <Link href="/admin/inventory" className='text-sec hover:underline'>Inventory</Link>
                    <Link href="/admin/requests" className='text-sec hover:underline'>Requests</Link>
                    <Link href="/admin/users" className='text-sec hover:underline'>Users</Link>
                    <Link href="/admin/vouchers" className='text-sec hover:underline'>Vouchers</Link>
                    <SignOutButton />
                </div>
            </div>
        </div>
    )
}

export default AdminNavBar