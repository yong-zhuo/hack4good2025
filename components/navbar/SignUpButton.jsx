'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import signUp from '@/firebase/auth/signup'
import { CircleAlert, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import addData from '@/firebase/firestore/addData'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import firebase_app, { db } from '@/firebase/firebaseConfig'

const SignUpSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required"
  }),
  email: z.string().email({
    message: "Invalid email"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters"
  })
})
  .refine((data) => data.password === data.confirmPassword, { message: "Password does not match", path: ["confirmPassword"] })

const SignUpButton = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(SignUpSchema)
  })

  const { toast } = useToast()
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleForm = async (data) => {
    setLoading(true)

    const { result, error } = await signUp(data.email, data.password);

    if (error) {
      switch (error.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          toast({
            variant: "destructive",
            title: "Email already in use",
            description: "The email you entered is already in use. Please use another email to sign up.",
          })
          break;
        default:
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          })
          break;
      }
      setLoading(false)
      setOpen(false)
      return;
    }

    const name = data.name

    if (result.user) {
      const userDocRef = doc(db, 'users', result.user.uid);
      await setDoc(userDocRef, {
        name: name,
        email: data.email,
        balance: 0,
        isAdmin: false,
        isSuspended: false
      })
      setLoading(false)
      return router.push("/home")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-[#FBF5E5]">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#3E5879]">Sign Up</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className='flex flex-col items-start col-span-4 gap-y-2'>
                <div className='flex items-center justify-between w-full'>
                  <Label htmlFor="name" className="text-right text-[#3E5879]">
                    Name
                  </Label>
                  {errors.name && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.name.message}</span>}
                </div>
                <Input
                  id="name"
                  className="col-span-3"
                  {...register("name")}
                />
              </div>

              <div className='flex flex-col items-start col-span-4 gap-y-2'>
                <div className='flex items-center justify-between w-full'>
                  <Label htmlFor="email" className="text-right text-[#3E5879]">
                    Email
                  </Label>
                  {errors.email && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.email.message}</span>}
                </div>
                <Input
                  id="email"
                  className="col-span-3 "
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
              <div className='flex flex-col items-start col-span-4 gap-y-2'>
                <div className='flex items-center justify-between w-full'>
                  <Label htmlFor="confirmPassword" className="text-left text-[#3E5879]">
                    Confirm Password
                  </Label>
                  {errors.confirmPassword && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.confirmPassword.message}</span>}
                </div>
                <Input
                  id="confirmPassword"
                  className="col-span-3"
                  {...register("confirmPassword")}
                  type="password"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="bg-[#3E5879]">{loading ? <Loader2 className="animate-spin" /> : null} Sign Up</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}



export default SignUpButton