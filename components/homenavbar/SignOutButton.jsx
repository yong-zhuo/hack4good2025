'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { logOut } from '@/firebase/auth/signout'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

const SignOutButton = () => {

  const router = useRouter();
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleForm = async () => {

    const { result, error } = await logOut();

    if (error) {
      toast({
        variant: "destructive",
        title: "Unable to sign out!",
        description: "Something went wrong, please try again!"
      })
      return
    }

    if (result.response === "ok") {
      return router.push("/")
    }

  }

  return (
    <div><Button variant="outline" className="text-slate-500 font-bold shadow-lg hover:-translate-y-1 transition bg-[#FBF5E5] hover:bg-[#FBF5E4]" onClick={handleForm} disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : null} Sign Out</Button></div>
  )
}

export default SignOutButton