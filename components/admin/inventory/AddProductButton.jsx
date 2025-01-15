'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { set, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { CircleAlert, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { addDoc, collection } from 'firebase/firestore'
import cloudinaryUpload from '@/lib/cloudinaryUpload'
import { db } from '@/firebase/firebaseConfig'
import { useToast } from '@/hooks/use-toast'

const AddProductButton = () => {

  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const AddSchema = z.object({
    name: z.string().min(1, {
      message: "Name cannot be empty"
    }),
    description: z.string().min(1, {
      message: "Description cannot be empty"
    }),
    stockQuantity: z.coerce.number().min(0, {
      message: "Quantity cannot be less than 0"
    }),
    price: z.coerce.number().min(0, {
      message: "Price cannot be less than 0"
    }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(AddSchema),
  })

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast()

  const handleUpdate = async (data) => {

    try {
      setLoading(true)

      if (data.hasOwnProperty("image")) {
        console.log(data.image)
        const imageUrl = await cloudinaryUpload(data.image, data, data.name)
        set(data, { image: imageUrl })
      }
      await addDoc(collection(db, 'products'), data)

      toast({
        variant: "success",
        title: "Product Added",
        description: "Your product has been successfully added"
      })
      setLoading(false)
      setOpen(false)

    } catch (e) {
      toast({
        variant: "error",
        title: "Error adding product",
        description: e.message
      })
      setButtonLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-pri text-sec rounded-2xl flex flex-row items-center justify-center shadow-md hover:bg-slate-500"><Plus />Add New Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-2xl text-[#3E5879]">Add New Product</DialogTitle>
          <form onSubmit={handleSubmit(handleUpdate)} className='flex flex-col'>

            <div className='flex flex-col items-start col-span-4 gap-y-2 mb-2'>
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

            <div className='flex flex-col items-start col-span-4 gap-y-2 mb-2'>
              <div className='flex items-center justify-between w-full'>
                <Label htmlFor="description" className="text-right text-[#3E5879]">
                  Description
                </Label>
                {errors.description && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.description.message}</span>}
              </div>
              <Input
                id="description"
                className="col-span-3 "
                {...register("description")}
              />
            </div>

            <div className='flex flex-col items-start col-span-4 gap-y-2 mb-2'>
              <div className='flex items-center justify-between w-full'>
                <Label htmlFor="stockQuantity" className="text-right text-[#3E5879]">
                  Quantity
                </Label>
                {errors.stockQuantity && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.stockQuantity.message}</span>}
              </div>
              <Input
                id="stockQuantity"
                className="col-span-3 "
                {...register("stockQuantity")}
                type="number"
              />
            </div>

            <div className='flex flex-col items-start col-span-4 gap-y-2 mb-2'>
              <div className='flex items-center justify-between w-full'>
                <Label htmlFor="price" className="text-right text-[#3E5879]">
                  Price (Voucher Points)
                </Label>
                {errors.quantity && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.price.message}</span>}
              </div>
              <Input
                id="price"
                className="col-span-3 "
                {...register("price")}
                type="number"
              />
            </div>

            <div className='flex flex-col items-start col-span-4 gap-y-2 mb-2'>
              <div className='flex items-center justify-between w-full'>
                <Label htmlFor="image" className="text-right text-[#3E5879]">
                  Product Image
                </Label>
                {errors.image && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.image.message}</span>}
              </div>
              <Input
                id="image"
                className="col-span-3"
                {...register("image")}
                type="file"
              />
            </div>
            <div className="flex justify-center mt-2">
              <DialogFooter>
                <Button type="submit" disabled={loading} className="bg-[#3E5879]">{loading ? <Loader2 className="animate-spin" /> : null} Submit</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div >
  )
}

export default AddProductButton