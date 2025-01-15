'use client'

import { useAuthContext } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { set, z } from 'zod'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { CircleAlert, Loader2 } from 'lucide-react'
import { db } from '@/firebase/firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { updateEmail } from 'firebase/auth'




const EditProfileForm = ({user, userData}) => {

    const EditSchema = z.object({
        email: z.string().email({
            message: "Invalid email format"
        }).default(userData.email),
        name: z.string().min(1, {
            message: "Name cannot be empty"
        }).default(userData.name),
    })

    const router = useRouter()
    
    const { toast } = useToast()

    const handleUpdate = async (data) => {
        try {
            setButtonLoading(true);
            const userRef = doc(db, 'users', userData.id);
            await Promise.all([
                setDoc(userRef, {
                    email: data.email,
                    name: data.name
                }),
                updateEmail(user, data.email)
            ]);
        
            toast({
                variant: "success",
                title: "Profile updated",
                description: "Your profile has been updated successfully"
            })
            setButtonLoading(false);
            router.refresh();
        } catch (e) {
            toast({
                variant: "error",
                title: "Error updating profile",
                description: e.message
            })
            setButtonLoading(false);
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(EditSchema),
        defaultValues: {
            email: userData.email,
            name: userData.name
        }
    })

    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    return (
        <>
            <Card className="w-[60vh]">
                <CardHeader>
                    <CardTitle className="text-pri font-semibold">Edit Profile</CardTitle>
                    <CardDescription className="text-slate-500">Edit your profile details here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div >
                        <form onSubmit={handleSubmit(handleUpdate)} className='flex flex-col justify-end items-end'>
                            <div className='flex items-center justify-between w-full'><Label>Email</Label>{errors.email && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.email.message}</span>}</div>
                            <Input className="border-pri" {...register("email")}
                                type="email"
                                onChange={(e) => {
                                    setButtonDisabled(false);
                                }} />
                            <div className='mt-4 flex items-center justify-between w-full'><Label>Name</Label>{errors.name && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.name.message}</span>}</div>
                            <Input className="border-pri" {...register("name")}
                                onChange={(e) => {
                                    setButtonDisabled(false);
                                }}
                            />
                            <Button type="submit" disabled={buttonLoading || buttonDisabled} className="bg-pri hover:bg-slate-500 shadow-md mt-4">{buttonLoading ? <Loader2 className="animate-spin" /> : null}Update</Button>
                        </form>
                    </div>
                </CardContent>
            </Card></>
    )
}

export default EditProfileForm