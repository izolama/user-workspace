'use client'

import { useState } from 'react'

export default function TopUp() {
  const [step, setStep] = useState(1) // 1-4 for top-up flow
  const [selectedMethod, setSelectedMethod] = useState('')
  const [amount, setAmount] = useState(0)
  const [customAmount, setCustomAmount] = useState('')

  const topUpMethods = [
    {
      id: 'jakone',
      name: 'JakOne Mobile',
      description: 'No administration fees via the JakOne Mobile Mobile App',
      icon: 'fas fa-mobile-alt',
      bgColor: 'bg-orange-100',
      iconBg: 'bg-orange-600',
      textColor: 'text-white'
    },
    {
      id: 'atm',
      name: 'ATM Bank DKI',
      description: 'Top up Martapay from nearest Bank DKI ATM',
      icon: 'fas fa-university',
      bgColor: 'bg-red-100',
      iconBg: 'bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'bank',
      name: 'Other Bank',
      description: 'Transfer anytime from your favourite Indonesia bank',
      icon: 'fas fa-building-columns',
      bgColor: 'bg-orange-100',
      iconBg: 'bg-orange-600',
      textColor: 'text-white'
    },
    {
      id: 'debit',
      name: 'Debit Card',
      description: 'Top up online using your debit card',
      icon: 'fas fa-credit-card',
      bgColor: 'bg-orange-100',
      iconBg: 'bg-orange-600',
      textColor: 'text-white'
    }
  ]

  const predefinedAmounts = [
    { value: 50000, label: 'Rp50.000' },
    { value: 100000, label: 'Rp100.000' },
    { value: 150000, label: 'Rp150.000' },
    { value: 200000, label: 'Rp200.000' },
    { value: 250000, label: 'Rp250.000' },
    { value: 300000, label: 'Rp300.000' }
  ]

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
    setStep(2)
  }

  const handleAmountSelect = (amount: number) => {
    setAmount(amount)
    setStep(3)
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setAmount(Number(value))
  }

  const handleNext = () => {
    if (amount >= 20000) {
      setStep(4)
    }
  }

  const isNextEnabled = amount >= 20000

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center p-4">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="mr-3">
              <i className="fas fa-arrow-left text-xl text-gray-700"></i>
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-800">Top Up LRTPay</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Step 1: Payment Method Selection */}
        {step === 1 && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Top Up Methods</h2>
            </div>
            
            <div className="space-y-3">
              {topUpMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleMethodSelect(method.id)}
                  className="w-full bg-white p-4 rounded-lg shadow-sm flex items-center border border-gray-200 hover:border-red-300 hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 ${method.iconBg} rounded-lg flex items-center justify-center mr-4`}>
                    <i className={`${method.icon} ${method.textColor} text-lg`}></i>
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-gray-800 text-base">{method.name}</h3>
                    <p className="text-sm text-gray-500 leading-tight">{method.description}</p>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </button>
              ))}
            </div>

            {/* Bottom Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Step 2: Amount Selection */}
        {step === 2 && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Via Debit/Credit Card</h2>
            </div>

            {/* Top Up Information */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-red-500 mt-1 mr-2"></i>
                <div>
                  <h3 className="font-semibold text-red-800 text-sm">Top Up Information</h3>
                  <p className="text-red-700 text-sm">
                    You can save up to Rp 2.000.000 with maximum transactions of Rp 20.000.000 per month
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {predefinedAmounts.map((amt) => (
                <button
                  key={amt.value}
                  onClick={() => handleAmountSelect(amt.value)}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    amount === amt.value 
                      ? 'border-red-500 bg-red-50 text-red-600' 
                      : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-2 flex items-center justify-center ${
                      amount === amt.value ? 'border-red-500 bg-red-500' : 'border-gray-300'
                    }`}>
                      {amount === amt.value && <i className="fas fa-check text-white text-xs"></i>}
                    </div>
                    <span className="font-semibold text-gray-800">{amt.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Another Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-lg">Rp</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <i className="fas fa-info-circle mr-1"></i>
                Minimum top up amount Rp 20.000
              </p>
            </div>

            <button
              onClick={() => setStep(3)}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isNextEnabled 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isNextEnabled}
            >
              Next
            </button>

            {/* Bottom Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Step 3: Amount Confirmation */}
        {step === 3 && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Via Debit/Credit Card</h2>
            </div>

            {/* Top Up Information */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-red-500 mt-1 mr-2"></i>
                <div>
                  <h3 className="font-semibold text-red-800 text-sm">Top Up Information</h3>
                  <p className="text-red-700 text-sm">
                    You can save up to Rp 2.000.000 with maximum transactions of Rp 20.000.000 per month
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {predefinedAmounts.map((amt) => (
                <button
                  key={amt.value}
                  onClick={() => setAmount(amt.value)}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    amount === amt.value 
                      ? 'border-red-500 bg-red-50 text-red-600' 
                      : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-2 flex items-center justify-center ${
                      amount === amt.value ? 'border-red-500 bg-red-500' : 'border-gray-300'
                    }`}>
                      {amount === amt.value && <i className="fas fa-check text-white text-xs"></i>}
                    </div>
                    <span className="font-semibold text-gray-800">{amt.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Another Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-lg">Rp</span>
                <input
                  type="text"
                  value={amount.toLocaleString()}
                  readOnly
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 border border-gray-300 rounded-lg text-lg font-semibold text-gray-800"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <i className="fas fa-info-circle mr-1"></i>
                Minimum top up amount Rp 20.000
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Next
            </button>

            {/* Bottom Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Via Debit/Credit Card</h2>
            </div>

            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-green-600 text-3xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Top Up Berhasil!</h2>
              <p className="text-gray-600 mb-4">
                Saldo Anda telah berhasil ditambahkan
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nominal Top Up</span>
                    <span className="font-semibold">Rp {amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metode Pembayaran</span>
                    <span className="font-semibold">
                      {topUpMethods.find(m => m.id === selectedMethod)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waktu Transaksi</span>
                    <span className="font-semibold">{new Date().toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold mb-4"
            >
              Kembali ke Beranda
            </button>

            {/* Bottom Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
