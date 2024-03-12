import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <p>Landing Page</p>
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>

    </div>
  )
}

export default LandingPage