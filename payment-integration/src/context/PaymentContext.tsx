'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import CryptoJS from 'crypto-js'

interface PaymentContextType {
  paymentStatus: string | null
  setPaymentStatus: (status: string | null) => void
  encryptPin: (pin: string) => string
  processPayment: (amount: number, pin: string) => Promise<boolean>
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-encryption-key'

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)

  const encryptPin = (pin: string): string => {
    return CryptoJS.AES.encrypt(pin, ENCRYPTION_KEY).toString()
  }

  const processPayment = async (amount: number, pin: string): Promise<boolean> => {
    try {
      const encryptedPin = encryptPin(pin)
      
      // Here you would typically make an API call to process the payment
      // For demo purposes, we're simulating a successful payment
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setPaymentStatus('Payment processed successfully')
      return true
    } catch (error) {
      setPaymentStatus('Payment failed. Please try again.')
      return false
    }
  }

  return (
    <PaymentContext.Provider 
      value={{ 
        paymentStatus, 
        setPaymentStatus,
        encryptPin,
        processPayment
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}
