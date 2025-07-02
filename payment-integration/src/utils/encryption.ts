import CryptoJS from 'crypto-js'
import logger from './logger'

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-encryption-key'

export const encryptPin = (pin: string): string => {
  try {
    return CryptoJS.AES.encrypt(pin, ENCRYPTION_KEY).toString()
  } catch (error) {
    logger.error('Error encrypting PIN:', error)
    throw new Error('Failed to encrypt PIN')
  }
}

export const decryptPin = (encryptedPin: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPin, ENCRYPTION_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    logger.error('Error decrypting PIN:', error)
    throw new Error('Failed to decrypt PIN')
  }
}

// Validate PIN format (e.g., must be 6 digits)
export const validatePin = (pin: string): boolean => {
  return /^\d{6}$/.test(pin)
}
