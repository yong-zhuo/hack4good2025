'use client'

import { useAuthContext } from '@/context/AuthContext'
import React from 'react'

const EditProfileForm = () => {

    const { user } = useAuthContext()


    return (
        <div>
            EditProfileForm
        </div>
    )
}

export default EditProfileForm