'use client'

import { useEffect, useState } from 'react'

interface AlertProps {
  type: 'success' | 'error' | 'info'
  message: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

export default function Alert({ 
  type, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, isVisible, onClose])

  if (!isVisible) return null

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-500',
    error: 'bg-red-50 text-red-800 border-red-500',
    info: 'bg-blue-50 text-blue-800 border-blue-500'
  }

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle'
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border ${styles[type]} shadow-lg max-w-md animate-fade-in`}
      role="alert"
    >
      <i className={`${icons[type]} text-xl mr-3`} aria-hidden="true"></i>
      <div className="flex-1">{message}</div>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false)
            onClose()
          }}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close alert"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  )
}

// Add this to your globals.css or create a new styles file
const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
`
