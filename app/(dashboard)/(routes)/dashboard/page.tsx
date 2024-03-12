"use client "

import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
  return (
    <section className='mb-8 space-y-4'>
      <div>
        <h2 className='text-2xl md:text-4xl font-bold text-center mb-4'>
          Explore the power of AI
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Render with the smartest AI
        </p>

      </div>

    </section>
  )
    
}

export default DashboardPage