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

const SignInSchema = z.object({
  email: z.string().email({
    message: "Invalid email"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  })
})

const SignInButton = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(SignInSchema)
  })
  const router = useRouter();


  const { user, authLoading } = useAuthContext();

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/home');
    }
  }, [user, authLoading]);

  const { toast } = useToast()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

    if (result.user) {
      setLoading(false)
      return router.push("/home")
    }

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-slate-500 font-bold shadow-lg hover:-translate-y-1 transition bg-[#FBF5E5] hover:bg-[#FBF5E4]">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#3E5879]">Sign In</DialogTitle>
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
          <DialogFooter>
            <Button type="submit" disabled={loading} className="bg-[#3E5879]">{loading ? <Loader2 className="animate-spin" /> : null} Sign In</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SignInButton