'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import signUp from '@/firebase/auth/signup'

const SignUpButton = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleForm = async (e) => {
        e.preventDefault()
        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        if (result.user) {
            
        }

        console.log(result)
        return router.push("/home")
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Sign Up</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>
            Click 'Sign Up' when you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleForm}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              className="col-span-3"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Sign Up</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SignUpButton