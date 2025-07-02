'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePayment } from '@/context/PaymentContext'
import PinInput from '@/components/PinInput'
import LoadingSpinner from '@/components/LoadingSpinner'
import Alert from '@/components/Alert'

const AMOUNT_OPTIONS = [
  50000, 75000, 100000, 150000, 200000, 250000
]

export default function PaymentPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [step, setStep] = useState(1) // 1: Select Amount, 2: Enter PIN, 3: Processing, 4: Success
  const [pin, setPin] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { processPayment } = usePayment()

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setCustomAmount(value)
      setSelectedAmount(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleConfirm = async () => {
    if (pin.length !== 6) {
      setError('Please enter a valid 6-digit PIN')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const amount = selectedAmount || parseInt(customAmount)
      const success = await processPayment(amount, pin)
      
      if (success) {
        setStep(4)
      } else {
        setError('Payment failed. Please try again.')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => window.history.back()} className="text-gray-600">
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali
          </button>
          <Image
            src="/LRT-jakarta.png"
            alt="LRT Jakarta Logo"
            width={100}
            height={40}
            className="h-8 w-auto"
          />
        </div>

        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Top Up Methods</h2>
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                {AMOUNT_OPTIONS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-3 border rounded-lg text-center ${
                      selectedAmount === amount
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:border-red-500'
                    }`}
                  >
                    Rp {amount.toLocaleString('id-ID')}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Another Amount
                </label>
                <input
                  type="text"
                  id="custom-amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="input-field"
                  placeholder="Rp 0"
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={!selectedAmount && !customAmount}
              >
                Next
              </button>
            </form>
          </div>
        )}

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Enter PIN</h2>
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-2xl font-semibold">
                  Rp {(selectedAmount || parseInt(customAmount)).toLocaleString('id-ID')}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your 6-digit PIN
                </label>
                <PinInput
                  length={6}
                  onChange={setPin}
                  disabled={isProcessing}
                />
              </div>
            </div>
            <button
              onClick={handleConfirm}
              disabled={pin.length !== 6 || isProcessing}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? <LoadingSpinner /> : 'Confirm Payment'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Confirm Payment</h2>
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-2xl font-semibold">
                  Rp {(selectedAmount || parseInt(customAmount)).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-2xl font-semibold">
                  Rp {(selectedAmount || parseInt(customAmount)).toLocaleString('id-ID')}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your 6-digit PIN
                </label>
                <PinInput
                  length={6}
                  onChange={setPin}
                  disabled={isProcessing}
                />
              </div>
            </div>
            <button
              onClick={handleConfirm}
              disabled={pin.length !== 6 || isProcessing}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? <LoadingSpinner /> : 'Confirm Payment'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mb-4">
              <i className="fas fa-check-circle text-6xl text-green-500"></i>
            </div>
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your top-up has been processed successfully.
            </p>
            <button
              onClick={() => setStep(1)}
              className="text-red-600 hover:text-red-700"
            >
              Make Another Payment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
