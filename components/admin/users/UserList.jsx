'use server'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Setting from './Setting';

const UserList = ({ users }) => {



    return (
        <div>
            <Table className="bg-white rounded-lg shadow-md">
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">
                            Email
                        </TableHead>
                        <TableHead className="font-bold">
                            Name
                        </TableHead>
                        <TableHead className="font-bold">
                            Suspended
                        </TableHead>
                        <TableHead className="font-bold" >
                            Admin
                        </TableHead>
                        <TableHead className="font-bold" >
                            Last Sign-In
                        </TableHead>
                        <TableHead className="font-bold" >
                            Manage User
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="font-bold truncate">{user.name}</TableCell>
                            <TableCell className="text-gray-500 truncate">{user.isSuspended ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell className="flex flex-row items-center">
                                <Setting otherUser={user}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default UserList