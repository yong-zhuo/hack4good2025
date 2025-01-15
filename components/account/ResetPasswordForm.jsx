'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import { CircleAlert, Loader2 } from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { toast, useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { updatePassword } from 'firebase/auth'

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
            await updatePassword(user, data.password);
            toast({
                variant: "success",
                title: "Password updated",
                description: "Your password has been updated successfully"
            })
            setButtonLoading(false);
            router.refresh();
        } catch (e) {
            toast({
                variant: "Error",
                title: "Error updating password",
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
                    <CardDescription className="text-slate-500">Reset your password here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleReset)} className='flex flex-col justify-end items-end'>
                        <div className="flex items-center justify-between w-full"><Label >New Password</Label>{errors.password && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.password.message}</span>}</div>
                        <Input className="border-pri mt-1" id="password"
                            {...register("password")}
                            type="password"
                            onChange={(e) => {
                                setButtonDisabled(false);
                            }} />
                        <div className='mt-4 flex items-center justify-between w-full' 
                            ><Label>Confirm Password</Label>{errors.confirmPassword && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.confirmPassword.message}</span>}</div>
                        <Input className="border-pri mt-1" id="confirmPassword" type="password" {...register("confirmPassword")} onChange={(e) => {
                            setButtonDisabled(false);
                            
                        }} />
                        <Button type="submit" disabled={buttonLoading || buttonDisabled} className="bg-pri hover:bg-slate-500 shadow-md mt-4">{buttonLoading ? <Loader2 className="animate-spin" /> : null} Update</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPasswordForm