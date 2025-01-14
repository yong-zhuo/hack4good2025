'use client'

import { useAuthContext } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { redirect } from 'next/navigation'
import React from 'react'

const CheckUser = ({userId}) => {

    const { user } = useAuthContext()
    const { toast } = useToast()

    if (!user) {
        redirect('/')
        toast({
            variant: "destructive",
            title: 'Unauthorized',
            message: 'You are not authorized to view this page.',
            type: 'error'
        })
    }

    if (user.uid !== userId) {
        toast({
            variant: "destructive",
            title: 'Unauthorized',
            message: 'You are not authorized to view this page.',
            type: 'error'
        })
        redirect('/')
    }

    return (
        <div></div>
    )
}

export default CheckUser