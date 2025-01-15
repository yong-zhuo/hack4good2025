'use client'

import React, { useEffect } from 'react'
import EditProfileForm from './EditProfileForm'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'
import { useAuthContext } from '@/context/AuthContext'
import { Skeleton } from '../ui/skeleton'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import ResetPasswordForm from './ResetPasswordForm'

const AccountForm = () => {

    const { user, loading } = useAuthContext()

    const [userData, setUserData] = React.useState(null)
    useEffect(() => {

        const fetchUserDoc = async () => {
            const userId = localStorage.getItem('userId')

            if (user) {
                try {
                    const userRef = doc(db, 'users', userId);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        const newUserData = {
                            id: userDoc.id,
                            ...userDoc.data()
                        }

                        setUserData(newUserData)
                    } else {
                        console.error('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching user document:', error);
                }
            }

        }
        if (user) {
            fetchUserDoc();
        }
    }, [user, loading])


    if (loading || userData === null) {
        return <div>
            <Skeleton className="w-fit h-fit" >
                <Card className="w-[60vh]  h-[32vh]">
                    <CardHeader>
                        <CardTitle className="text-pri font-semibold">Edit Profile</CardTitle>
                        <CardDescription className="text-slate-500">Edit your profile here.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center mt-8">
                        <Loader2 className='text-pri animate-spin h-12 w-12' />
                    </CardContent>
                </Card>
            </Skeleton>
            <Skeleton className="w-fit h-fit mt-8" >
                <Card className="w-[60vh]  h-[32vh]">
                    <CardHeader>
                        <CardTitle className="text-pri font-semibold">Reset Password</CardTitle>
                        <CardDescription className="text-slate-500">Reset your password here.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center mt-8">
                        <Loader2 className='text-pri animate-spin h-12 w-12' />
                    </CardContent>
                </Card>
            </Skeleton>

        </div>
    }

    return (


        <div>
            <EditProfileForm userData={userData} user={user} />
            <ResetPasswordForm user={user} />
        </div>
    )
}

export default AccountForm