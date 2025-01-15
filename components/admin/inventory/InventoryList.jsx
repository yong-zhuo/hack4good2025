'use server'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditProductButton from './EditProductButton';
import DeleteProductButton from './DeleteProductButton';

const InventoryList = ({ products }) => {

    return (
        <div>
            <Table className="bg-white rounded-lg shadow-md">
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">
                            Image
                        </TableHead>
                        <TableHead className="font-bold">
                            Name
                        </TableHead>
                        <TableHead className="font-bold">
                            Description
                        </TableHead>
                        <TableHead className="font-bold" >
                            Price
                        </TableHead>
                        <TableHead className="font-bold">
                            Quantity
                        </TableHead>
                        <TableHead className="font-bold">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell><img src={product.image} className='sm:h-20 sm:w-20 border border-pri rounded-lg' /></TableCell>
                            <TableCell className="font-bold">{product.name}</TableCell>
                            <TableCell className="text-gray-500 truncate">{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.stockQuantity}</TableCell>
                            <TableCell className="flex flex-row gap-2 items-center sm:mt-4">
                                <EditProductButton product={product} />
                                <DeleteProductButton productId={product.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default InventoryList