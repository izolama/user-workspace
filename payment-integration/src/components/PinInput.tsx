'use client'

import { useState, useCallback } from 'react'

interface PinInputProps {
  length?: number
  onChange: (value: string) => void
  disabled?: boolean
}

export default function PinInput({ length = 6, onChange, disabled = false }: PinInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const [activeInput, setActiveInput] = useState(0)

  const focusInput = useCallback((index: number) => {
    const input = document.getElementById(`pin-${index}`)
    input?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newValues = [...values]
      newValues[index] = value
      setValues(newValues)
      onChange(newValues.join(''))

      // Auto-focus next input
      if (value && index < length - 1) {
        setActiveInput(index + 1)
        focusInput(index + 1)
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      setActiveInput(index - 1)
      focusInput(index - 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    if (/^\d*$/.test(pastedData)) {
      const digits = pastedData.slice(0, length).split('')
      const newValues = [...values]
      digits.forEach((digit, index) => {
        if (index < length) {
          newValues[index] = digit
        }
      })
      setValues(newValues)
      onChange(newValues.join(''))
      
      // Focus the next empty input or the last input
      const nextEmptyIndex = newValues.findIndex(val => !val)
      if (nextEmptyIndex !== -1) {
        setActiveInput(nextEmptyIndex)
        focusInput(nextEmptyIndex)
      } else {
        setActiveInput(length - 1)
        focusInput(length - 1)
      }
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {values.map((value, index) => (
        <input
          key={index}
          id={`pin-${index}`}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setActiveInput(index)}
          disabled={disabled}
          className={`pin-input ${
            activeInput === index ? 'ring-2 ring-red-500' : ''
          }`}
          aria-label={`PIN digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
