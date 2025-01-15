import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React from 'react'

const AddProductButton = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-pri text-sec rounded-2xl flex flex-row items-center justify-center shadow-md hover:bg-slate-500"><Plus/>Add New Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle></DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddProductButton