'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useAuthContext } from '@/context/AuthContext'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { signOut } from 'firebase/auth'
import logOut from '@/firebase/auth/signout'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CircleAlert, Loader2 } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'
import signIn from '@/firebase/auth/signin'
import { useRouter } from 'next/navigation'


const SignInSchema = z.object({
    email: z.string().email({
        message: "Invalid email"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    })
})

const AdminLogin = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(SignInSchema)
    })

    const { user } = useAuthContext();

    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleForm = async (data) => {
        setLoading(true)
        const { result, error } = await signIn(data.email, data.password);

        if (error) {
            toast({
                variant: "destructive",
                title: "Invalid email or password",
                description: "Please check your email and password"
            })
            setLoading(false)
            setOpen(false)
            return
        }

        const userDocRef = doc(db, 'users', result.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.data().isAdmin) {
            toast({
                variant: "destructive",
                title: "Invalid email or password",
                description: "You do not have permission to access this page"
            })
            setLoading(false)
            await logOut();
            return
        }

        if (result.user) {
            setLoading(false)
            return router.push("/admin/dashboard")
        }

    }

    return (
        <div>
            <Card className="mt-12">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-pri">Admin Sign-In</CardTitle>
                    <CardDescription className="text-pri">Only admin accounts are permitted to sign in.</CardDescription>
                </CardHeader>

                <CardContent>
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
                                <div className='flex flex-col items-start col-span-4 gap-y-2'>
                                    <div className='flex items-center justify-between w-full'>
                                        <Label htmlFor="password" className="text-right text-[#3E5879]">
                                            Password
                                        </Label>
                                        {errors.password && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.password.message}</span>}
                                    </div>
                                    <Input
                                        id="password"
                                        className="col-span-3"
                                        {...register("password")}
                                        type="password"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-end justify-end mt-3'><Button type="submit" disabled={loading} className="bg-[#3E5879]">{loading ? <Loader2 className="animate-spin" /> : null} Sign In</Button></div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminLogin