'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthContext } from '@/context/AuthContext'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Settings } from 'lucide-react'
import React from 'react'
import AdminButton from './AdminButton'

const Setting = ({ otherUser }) => {

  const { user, loading } = useAuthContext();

  if (loading || user == null) {
    return <Button variant="ghost" className="hover:bg-gray-200 rounded-3xl flex items-center justify-center">
      <Settings className='text-gray-500 hover:text-gray-600' />
    </Button>
  } else if (user.uid === otherUser.id) {
    return null;
  }

  

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="hover:bg-gray-200 rounded-3xl flex items-center justify-center">
            <Settings className='text-gray-500 hover:text-gray-600' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage <span className='font-semibold'>{otherUser.name}'s account</span></DialogTitle>
          </DialogHeader>
          <div className='w-full flex flex-col '>
            <Label className="font-bold border-b border-gray-500">
              Admin Permissions
            </Label>
            <AdminButton user={otherUser}/>
          </div>
          <div className='w-full flex flex-col '>
            <Label className="font-bold border-b border-gray-500">
              Suspend User
            </Label>
          </div>
          <div className='w-full flex flex-col '>
            <Label className="font-bold border-b border-gray-500">
              Reset Password
            </Label>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Setting