'use client'

import { Button } from '@/components/ui/button'
import { db } from '@/firebase/firebaseConfig'
import { useToast } from '@/hooks/use-toast'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminButton = ({ user }) => {

  const { toast } = useToast()
  const router = useRouter()
  const [loading, isLoading] = React.useState(false)

  const handleClick = async () => {
    try {
      isLoading(true)
      const userRef = doc(db, 'users', user.id)
        const userDoc = await getDoc(userRef)
      if (user.isAdmin) {
        await setDoc(userRef, { ...userDoc.data(), isAdmin: false }, { merge: true })
        toast({
          variant: 'success',
          title: 'Success',
          description: `${user.name} is no longer an admin`,
        })
      } else {
        await setDoc(userRef, { ...userDoc.data(), isAdmin: true }, { merge: true })
        toast({
          variant: 'success',
          title: 'Success',
          description: `${user.name} is now an admin`,
        })
      }
      isLoading(false)
      router.refresh()
    } catch (e) {
      isLoading(false)
      toast({
        variant: 'destructive',
        title: 'Error changing admin permissions',
        description: e.message,
      })
    }

  }

  return (
    <>
      {!user.isAdmin ? <div className='flex flex-row items-center justify-between gap-2'>Make {user.name} an admin <Button onClick={handleClick} className="bg-green-400 hover:bg-green-300 text-sec rounded-lg w-fit h-3/4 shadow-md">{loading ? <Loader /> : 'Make Admin'}</Button></div> : <div className='flex flex-row items-center justify-between gap-2'>Revoke {user.name} admin permissions <Button className="bg-red-400 shadow-md text-sec rounded-lg w-fit h-3/4 hover:bg-red-500" onClick={handleClick}>{loading ? <Loader /> : 'Revoke Admin'}</Button></div>}
    </>
  )
}

export default AdminButton