'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const router = useRouter()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 text-gray-600 hover:text-gray-900"
              aria-label="Go back"
            >
              <i className="fas fa-arrow-left text-lg"></i>
            </button>
            <div className="flex-shrink-0">
              <Image
                src="https://placehold.co/120x40?text=LRT+Jakarta"
                alt="LRT Jakarta Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </div>
          </div>
          <nav className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/payment')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Top Up
            </button>
            <button 
              onClick={() => router.push('/history')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              History
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
