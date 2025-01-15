import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const EditProductButton = ({ product }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-pri text-sec shadow-md hover:bg-slate-500">Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle className="text-xl">Edit {product.name}</DialogTitle>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default EditProductButton