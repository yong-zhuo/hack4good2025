import AccountForm from '@/components/account/AccountForm'
import EditProfileForm from '@/components/account/EditProfileForm'
import ResetPasswordForm from '@/components/account/ResetPasswordForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/firebase/firebaseConfig'
import React from 'react'

const page = async () => {

    return (
        <div>
            <div className='text-6xl font-bold text-left mb-8 mt-4 text-pri'>
                Account
            </div>
            <div className='flex flex-col justify-center items-center'>
                <AccountForm />
                
            </div>
        </div>
    )
}

export default page