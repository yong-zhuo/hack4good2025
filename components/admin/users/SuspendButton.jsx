'use client'

import { Button } from '@/components/ui/button'
import { db } from '@/firebase/firebaseConfig'
import { useToast } from '@/hooks/use-toast'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SuspendButton = ({ user }) => {

  const { toast } = useToast()
  const router = useRouter()
  const [loading, isLoading] = React.useState(false)

  const handleClick = async () => {
    try {
      isLoading(true)
      const userRef = doc(db, 'users', user.id)
        const userDoc = await getDoc(userRef)
      if (user.isSuspended) {
        await setDoc(userRef, { ...userDoc.data(), isSuspended: false }, { merge: true })
        toast({
          variant: 'success',
          title: 'Success',
          description: `${user.name} is no longer suspended`,
        })
      } else {
        await setDoc(userRef, { ...userDoc.data(), isSuspended: true }, { merge: true })
        toast({
          variant: 'success',
          title: 'Success',
          description: `${user.name} is now suspended`,
        })
      }
      isLoading(false)
      router.refresh()
    } catch (e) {
      isLoading(false)
      toast({
        variant: 'destructive',
        title: 'Error changing user suspension status',
        description: e.message,
      })
    }
  }

  return (
    <>
      {!user.isSuspended ? <div className='flex flex-row items-center justify-between gap-2'>Suspend {user.name} <Button onClick={handleClick} className="shadow-md bg-gray-500 hover:bg-gray-400 text-sec rounded-lg w-fit h-3/4">{loading ? <Loader /> : 'Suspend'}</Button></div> : <div className='flex flex-row items-center justify-between gap-2'>Reactivate {user.name} account <Button className="shadow-md bg-red-400 text-sec rounded-lg w-fit h-3/4 hover:bg-red-500" onClick={handleClick}>{loading ? <Loader /> : 'Reactivate'}</Button></div>}
    </>
  )
}

export default SuspendButton