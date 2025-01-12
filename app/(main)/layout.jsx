import { HomeNavbar } from '@/components/homenavbar/HomeNavbar';
import React  from 'react'

const layout = ({ children }) => {

  return (
    <div className='min-h-screen bg-[#FBF5E5]'><HomeNavbar/>{children}</div>
  )
}

export default layout