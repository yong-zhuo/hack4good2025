'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import { CircleAlert, Loader2, Mail } from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { toast, useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { sendPasswordResetEmail, updatePassword } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'

const ResetSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters"
    })
}).refine((data) => data.password === data.confirmPassword, { message: "Password does not match", path: ["confirmPassword"] })


const ResetPasswordForm = ({ user }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(ResetSchema)
    })

    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const { toast } = useToast();
    const router = useRouter();

    const handleReset = async (data) => {
        try {
            setButtonLoading(true);
            await sendPasswordResetEmail(auth, user.email)
            toast({
                variant: "success",
                title: "Email sent",
                description: "An email containing a password reset link has been sent to your email."
            })
            setButtonLoading(false);
            router.refresh();
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Error sending email",
                description: e.message
            })
            setButtonLoading(false);
        }
    }

    return (
        <div >
            <Card className='mt-8 w-[60vh]'>
                <CardHeader>
                    <CardTitle className="text-pri font-semibold">Reset Password</CardTitle>
                    <CardDescription className="text-slate-500">Send an email to reset your password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col justify-center items-center border-t-2 border-pri'>
                        <Button  onClick={handleReset} disabled={buttonLoading} className="bg-pri hover:bg-slate-500 shadow-md mt-4">{buttonLoading ? <Loader2 className="animate-spin" /> : null} Send Email </Button>
                   </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPasswordForm