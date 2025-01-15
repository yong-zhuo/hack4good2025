'use client'

import AdminNavBar from '@/components/admin/AdminNavBar'
import { useAuthContext } from '@/context/AuthContext';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const layout = ({ children }) => {
    const { user, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (!userDoc.exists() || !userDoc.data().isAdmin) {
                    router.push('/admin');
                }
            } else {
                router.push('/admin');
            }
        };

        
        if (!loading) {
            checkAdminStatus();
        }
    }, [user, loading, router]);

    return (
        <div>
            <AdminNavBar />
            {children}
        </div>
    )
}

export default layout