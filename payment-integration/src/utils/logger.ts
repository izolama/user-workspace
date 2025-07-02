import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

export const logPaymentAttempt = (amount: number, status: string, error?: string) => {
  logger.info('Payment attempt', {
    amount,
    status,
    timestamp: new Date().toISOString(),
    ...(error && { error })
  })
}

export const logRegistration = (phoneNumber: string, status: string, error?: string) => {
  logger.info('Registration attempt', {
    phoneNumber,
    status,
    timestamp: new Date().toISOString(),
    ...(error && { error })
  })
}

export default logger
