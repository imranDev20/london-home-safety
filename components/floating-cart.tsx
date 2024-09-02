import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'


export default function FloatingCartButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
        <Link href="/cart">
        <Button className='px-2 py-2' type='button' size="sm"><ShoppingCart /></Button>
        </Link>
    </div>
  )
}
