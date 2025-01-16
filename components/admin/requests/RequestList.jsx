'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

const RequestList = ({ products }) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const handleApprove = async (data) => {
        try {
            setLoading(true);
            const orderID = data.target.value
            console.log(orderID)
            const orderRef = doc(db, 'orders', `${orderID}`)
            await setDoc(orderRef, {
                status: 'Completed'
            }, { merge: true })

            toast({
                variant: "success",
                title: "Product Added",
                description: "Your product has been successfully added"
            })
            setLoading(false);
            router.refresh()
        } catch (e) {
            toast({
                variant: "error",
                title: "Error adding product",
                description: e.message
            })
            setLoading(false);
        }
    }

    const handleReject = (data) => {
        const orderID = data.target.value
        const orderRef = doc(db, 'orders', orderID)
        setDoc(orderRef, {
            status: 'Cancelled'
        }, { merge: true })

        router.refresh()
    }
    return (
        <div>
            <Table className="bg-white rounded-lg shadow-md">
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">
                            Product Name
                        </TableHead>
                        <TableHead className="font-bold">
                            User Name
                        </TableHead>
                        <TableHead className="font-bold">
                            User ID
                        </TableHead>
                        <TableHead className="font-bold" >
                            Order Date
                        </TableHead>
                        <TableHead className="font-bold" >
                            Price
                        </TableHead>
                        <TableHead className="font-bold" >
                            Quantity
                        </TableHead>
                        <TableHead className="font-bold" >
                            Approve/Reject
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="text-gray-500 truncate">{product.name}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className="font-bold truncate">{product.userid}</TableCell>
                            <TableCell>{product.date}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell className="flex flex-row items-center gap-x-2">
                                <Button variant="ghost" value={product.id} onClick={handleApprove} className="hover:text-white shadow-md hover:bg-green-500 rounded-lg flex items-center justify-center bg-green-400 max-w-20 text-sec">Approve</Button>
                                <Button variant="ghost" value={product.id} onClick={handleReject} className="hover:text-white shadow-md hover:bg-red-500 rounded-lg flex items-center justify-center bg-red-400 min-w-20  text-sec">Reject</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default RequestList