import Header from '@/components/shared/Header'
import Transformation from '@/components/shared/Transformation'
import { Bolt } from 'lucide-react'
import React from 'react'
import { auth } from '@clerk/nextjs'

const page = async () => {
    const { userId } = auth()
    //const user = await getUserById(userId)

  return (
    <>
    
    <Header
        title='Interior Render'
        description="Render beautiful interiors with the smartest AI."
        icon={Bolt}
        iconColor='text-pink-600'
        bgColor='bg-slate-200'
        />
    <div className='px-4 lg:px-8 w-full gap-x-3 mb-8'>
        <Transformation />
    </div>
    </>
  )
}

export default page