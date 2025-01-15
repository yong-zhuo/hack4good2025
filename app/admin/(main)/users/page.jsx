'use server'

import UserList from '@/components/admin/users/UserList'
import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'

const page = async () => {

    async function fetchUsers() {
        const usersCollection = collection(db, 'users')
        const usersSnapshot = await getDocs(usersCollection)
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return usersList
    }

    const users = await fetchUsers()

    return (
        <div>
            <div className='text-3xl font-bold text-left mb-8 mt-4 text-pri'>
                Users
            </div>
            <div className='flex flex-col gap-y-4'>
                <UserList users={users}/>
            </div>
        </div>
    )
}

export default page