'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import signIn from '@/firebase/auth/signin'
import { z } from 'zod'
import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { CircleAlert, Loader2 } from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import logOut from '@/firebase/auth/signout'
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'

const ForgetPasswordSchema = z.object({
    email: z.string().email({
        message: "Invalid email format"
    })
})

const ForgetPassword = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(ForgetPasswordSchema)
    })
    const router = useRouter();

    const { toast } = useToast()

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleForm = async (data) => {
        setLoading(true)
        try {
            await sendPasswordResetEmail(auth, data.email)
            toast({
                variant: "success",
                title: "Email sent",
                description: "An email containing a password reset link has been sent to your email address."
            })
            setLoading(false);
            setOpen(false);
        } catch (e) {
            setLoading(false);
            setOpen(false);
            toast({
                variant: "destructive",
                title: "Error sending email",
                description: e.message
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="text-sec ">Forget Password</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] ">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#3E5879]">Forget Password</DialogTitle>
                    <DialogDescription className="text-[#3E5879]">Enter your email to receive a password reset link</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleForm)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className='flex flex-col items-start col-span-4 gap-y-2'>
                                <div className='flex items-center justify-between w-full'>
                                    <Label htmlFor="email" className="text-right text-[#3E5879]">
                                        Email
                                    </Label>
                                    {errors.email && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.email.message}</span>}
                                </div>
                                <Input
                                    id="email"
                                    className="col-span-3"
                                    {...register("email")}
                                    type="email"
                                />
                            </div>

                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="bg-[#3E5879]">{loading ? <Loader2 className="animate-spin" /> : null} Send Email</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ForgetPassword