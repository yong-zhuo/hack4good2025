import AdminNavBar from '@/components/admin/AdminNavBar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div>
            <AdminNavBar />
            {children}
        </div>
    )
}

export default layout