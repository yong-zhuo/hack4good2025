'use client'

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const layout = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push('/')
    }
  }, [user])

  return (
    <div>layout</div>
  )
}

export default layout