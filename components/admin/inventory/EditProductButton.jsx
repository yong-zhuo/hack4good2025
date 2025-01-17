'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { set, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { CircleAlert, Loader2 } from 'lucide-react'
import { db } from '@/firebase/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

const EditProductButton = ({ product }) => {

    const EditSchema = z.object({
        stockQuantity: z.coerce.number().min(0, {
            message: "Quantity cannot be less than 0"
        }),
        price: z.coerce.number().min(0, {
            message: "Price cannot be less than 0"
        })
    })

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(EditSchema),
        defaultValues: {
            stockQuantity: product.stockQuantity,
            price: product.price
        }
    })

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleUpdate = async (data) => {
        try {
            setLoading(true);
            const productRef = doc(db, 'products', product.id);
            await setDoc(productRef, {
                stockQuantity: data.stockQuantity,
                price: data.price
            }, { merge: true });
            setLoading(false);
            setOpen(false);
            router.refresh();
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-pri text-sec shadow-md hover:bg-slate-500">Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle className="text-xl">Edit {product.name}</DialogTitle>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <div className='flex flex-col items-start gap-y-2 mb-2'>
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
                        <div className='flex flex-col items-start gap-y-2 mb-2'>
                            <div className='flex items-center justify-between w-full'>
                                <Label htmlFor="stockQuantity" className="text-right text-[#3E5879]">
                                    price
                                </Label>
                                {errors.stockQuantity && <span className="text-red-500 text-xs flex items-center justify-center"><CircleAlert height={12} />{errors.stockQuantity.message}</span>}
                            </div>
                            <Input
                                id="Price"
                                className="col-span-3 "
                                {...register("price")}
                                type="number"
                            />
                        </div>
                        <div className="flex justify-center mt-2">
                            <DialogFooter>
                                <Button type="submit" disabled={loading} className="bg-[#3E5879]">{loading ? <Loader2 className="animate-spin" /> : null} Submit</Button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogContent>
            </Dialog >

        </>
    )
}

export default EditProductButton